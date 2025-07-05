import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MediaStep = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const [dragActive, setDragActive] = useState(false);
  const logoInputRef = useRef(null);
  const screenshotInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleFileUpload = (type, files) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = type === 'logo' ? 2 * 1024 * 1024 : 5 * 1024 * 1024; // 2MB for logo, 5MB for screenshots
    
    if (file.size > maxSize) {
      alert(`File size too large. Maximum ${type === 'logo' ? '2MB' : '5MB'} allowed.`);
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG, and WebP images are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'logo') {
        updateFormData({ logoFile: file, logoPreview: e.target.result });
      } else {
        const currentScreenshots = formData.screenshots || [];
        updateFormData({ 
          screenshots: [...currentScreenshots, { file, preview: e.target.result, id: Date.now() }]
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(type, e.dataTransfer.files);
    }
  };

  const removeScreenshot = (id) => {
    const currentScreenshots = formData.screenshots || [];
    const updatedScreenshots = currentScreenshots.filter(screenshot => screenshot.id !== id);
    updateFormData({ screenshots: updatedScreenshots });
  };

  const isFormValid = () => {
    return formData.logoFile || formData.logoPreview;
  };

  return (
    <div className="space-y-6">
      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Image" size={20} className="mr-2 text-primary" />
          Media & Assets
        </h3>
        
        {/* Logo Upload */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Tool Logo * (Max 2MB)
          </label>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center smooth-transition cursor-pointer ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-border-hover'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, 'logo')}
                onClick={() => logoInputRef.current?.click()}
              >
                <Icon name="Upload" size={48} className="mx-auto mb-3 text-text-muted" />
                <p className="text-text-primary font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-text-secondary">
                  PNG, JPG, WebP up to 2MB
                </p>
                <p className="text-xs text-text-muted mt-2">
                  Recommended: 512x512px square format
                </p>
              </div>
              
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('logo', e.target.files)}
                className="hidden"
              />
            </div>
            
            {formData.logoPreview && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-text-primary">
                  Logo Preview
                </label>
                <div className="relative bg-surface border border-border rounded-lg p-4">
                  <Image
                    src={formData.logoPreview}
                    alt="Logo preview"
                    className="w-32 h-32 object-contain mx-auto rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => updateFormData({ logoFile: null, logoPreview: null })}
                    iconName="X"
                    className="absolute top-2 right-2 text-error hover:text-error"
                  />
                </div>
              </div>
            )}
          </div>
          
          {errors.logo && (
            <p className="text-error text-xs mt-2">{errors.logo}</p>
          )}
        </div>

        {/* Screenshots Upload */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Screenshots (Optional, Max 5MB each)
          </label>
          
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center smooth-transition cursor-pointer mb-4 ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-border-hover'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, 'screenshot')}
            onClick={() => screenshotInputRef.current?.click()}
          >
            <Icon name="ImagePlus" size={48} className="mx-auto mb-3 text-text-muted" />
            <p className="text-text-primary font-medium mb-1">
              Add screenshots of your tool
            </p>
            <p className="text-sm text-text-secondary">
              PNG, JPG, WebP up to 5MB each
            </p>
            <p className="text-xs text-text-muted mt-2">
              Show your tool in action (max 6 images)
            </p>
          </div>
          
          <input
            ref={screenshotInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileUpload('screenshot', e.target.files)}
            className="hidden"
          />
          
          {/* Screenshots Preview */}
          {formData.screenshots && formData.screenshots.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {formData.screenshots.map((screenshot) => (
                <div key={screenshot.id} className="relative bg-surface border border-border rounded-lg p-2">
                  <Image
                    src={screenshot.preview}
                    alt="Screenshot preview"
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => removeScreenshot(screenshot.id)}
                    iconName="X"
                    className="absolute top-1 right-1 text-error hover:text-error bg-background/80 backdrop-blur-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Media URLs */}
        <div className="mt-8 space-y-4">
          <h4 className="font-medium text-text-primary">Additional Media (Optional)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Demo Video URL
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.demoVideoUrl || ''}
                onChange={(e) => handleInputChange('demoVideoUrl', e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition text-text-primary placeholder-text-muted"
              />
              <p className="text-xs text-text-muted mt-1">
                YouTube, Vimeo, or direct video link
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                placeholder="https://demo.yoursite.com"
                value={formData.liveDemoUrl || ''}
                onChange={(e) => handleInputChange('liveDemoUrl', e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition text-text-primary placeholder-text-muted"
              />
              <p className="text-xs text-text-muted mt-1">
                Link to interactive demo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={onPrev}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!isFormValid()}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default MediaStep;
import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BasicInfoStep = ({ formData, updateFormData, errors, onNext }) => {
  const categories = [
    "AI Writing", "AI Art & Design", "AI Video", "AI Audio", "AI Coding",
    "AI Business", "AI Marketing", "AI Analytics", "AI Productivity", "AI Research",
    "Machine Learning", "Natural Language Processing", "Computer Vision", "Chatbots",
    "AI Tools", "Data Science", "Automation", "AI Education", "AI Healthcare"
  ];

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleCategoryToggle = (category) => {
    const currentCategories = formData.categories || [];
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(cat => cat !== category)
      : [...currentCategories, category];
    
    updateFormData({ categories: updatedCategories });
  };

  const isFormValid = () => {
    return formData.toolName && 
           formData.shortDescription && 
           formData.websiteUrl && 
           formData.categories && 
           formData.categories.length > 0;
  };

  return (
    <div className="space-y-6">
      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Info" size={20} className="mr-2 text-primary" />
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tool Name *
            </label>
            <Input
              type="text"
              placeholder="Enter your AI tool name"
              value={formData.toolName || ''}
              onChange={(e) => handleInputChange('toolName', e.target.value)}
              className={errors.toolName ? 'border-error' : ''}
            />
            {errors.toolName && (
              <p className="text-error text-xs mt-1">{errors.toolName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Website URL *
            </label>
            <Input
              type="url"
              placeholder="https://your-tool-website.com"
              value={formData.websiteUrl || ''}
              onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
              className={errors.websiteUrl ? 'border-error' : ''}
            />
            {errors.websiteUrl && (
              <p className="text-error text-xs mt-1">{errors.websiteUrl}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Short Description *
          </label>
          <textarea
            placeholder="Brief description of your AI tool (max 200 characters)"
            value={formData.shortDescription || ''}
            onChange={(e) => handleInputChange('shortDescription', e.target.value)}
            maxLength={200}
            rows={3}
            className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition text-text-primary placeholder-text-muted ${
              errors.shortDescription ? 'border-error' : 'border-border'
            }`}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.shortDescription && (
              <p className="text-error text-xs">{errors.shortDescription}</p>
            )}
            <span className="text-xs text-text-muted ml-auto">
              {(formData.shortDescription || '').length}/200
            </span>
          </div>
        </div>
      </div>

      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Grid3X3" size={20} className="mr-2 text-primary" />
          Categories *
        </h3>
        
        <p className="text-sm text-text-secondary mb-4">
          Select all categories that best describe your AI tool (minimum 1, maximum 5)
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((category) => {
            const isSelected = (formData.categories || []).includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryToggle(category)}
                disabled={(formData.categories || []).length >= 5 && !isSelected}
                className={`p-3 rounded-lg border smooth-transition text-sm font-medium ${
                  isSelected
                    ? 'bg-primary/10 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
                } ${
                  (formData.categories || []).length >= 5 && !isSelected
                    ? 'opacity-50 cursor-not-allowed' :'cursor-pointer'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        
        {errors.categories && (
          <p className="text-error text-xs mt-2">{errors.categories}</p>
        )}
        
        <div className="mt-3 text-xs text-text-muted">
          Selected: {(formData.categories || []).length}/5
        </div>
      </div>

      <div className="flex justify-end">
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

export default BasicInfoStep;
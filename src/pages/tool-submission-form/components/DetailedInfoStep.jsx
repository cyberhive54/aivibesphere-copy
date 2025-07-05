import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DetailedInfoStep = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const [activeTab, setActiveTab] = useState('description');

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleFeatureAdd = () => {
    const currentFeatures = formData.features || [];
    updateFormData({ features: [...currentFeatures, ''] });
  };

  const handleFeatureUpdate = (index, value) => {
    const currentFeatures = formData.features || [];
    const updatedFeatures = [...currentFeatures];
    updatedFeatures[index] = value;
    updateFormData({ features: updatedFeatures });
  };

  const handleFeatureRemove = (index) => {
    const currentFeatures = formData.features || [];
    const updatedFeatures = currentFeatures.filter((_, i) => i !== index);
    updateFormData({ features: updatedFeatures });
  };

  const isFormValid = () => {
    return formData.detailedDescription && 
           formData.features && 
           formData.features.length > 0 &&
           formData.features.every(feature => feature.trim() !== '');
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'features', label: 'Features', icon: 'List' },
    { id: 'additional', label: 'Additional Info', icon: 'Plus' }
  ];

  return (
    <div className="space-y-6">
      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2 text-primary" />
          Detailed Information
        </h3>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-surface p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md smooth-transition text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Detailed Description *
              </label>
              <textarea
                placeholder={`Provide a comprehensive description of your AI tool. Include:\n• What problem it solves\n• Key capabilities and use cases\n• Target audience\n• Unique selling points\n• How it works (brief technical overview)`}
                value={formData.detailedDescription || ''}
                onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                rows={8}
                className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition text-text-primary placeholder-text-muted resize-none ${
                  errors.detailedDescription ? 'border-error' : 'border-border'
                }`}
              />
              {errors.detailedDescription && (
                <p className="text-error text-xs mt-1">{errors.detailedDescription}</p>
              )}
              <p className="text-xs text-text-muted mt-1">
                Minimum 100 characters recommended for better visibility
              </p>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-text-primary">
                Key Features *
              </label>
              <Button
                variant="ghost"
                onClick={handleFeatureAdd}
                iconName="Plus"
                className="text-primary hover:text-primary"
              >
                Add Feature
              </Button>
            </div>
            
            <div className="space-y-3">
              {(formData.features || []).map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={`Feature ${index + 1} (e.g., "Real-time AI text generation")`}
                      value={feature}
                      onChange={(e) => handleFeatureUpdate(index, e.target.value)}
                      className={errors.features ? 'border-error' : ''}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => handleFeatureRemove(index)}
                    iconName="X"
                    className="text-error hover:text-error flex-shrink-0"
                  />
                </div>
              ))}
            </div>
            
            {(formData.features || []).length === 0 && (
              <div className="text-center py-8 text-text-muted">
                <Icon name="List" size={48} className="mx-auto mb-3 opacity-50" />
                <p>No features added yet</p>
                <p className="text-sm">Click "Add Feature" to get started</p>
              </div>
            )}
            
            {errors.features && (
              <p className="text-error text-xs">{errors.features}</p>
            )}
          </div>
        )}

        {/* Additional Info Tab */}
        {activeTab === 'additional' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Company/Developer Name
                </label>
                <Input
                  type="text"
                  placeholder="Your company or developer name"
                  value={formData.companyName || ''}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Contact Email
                </label>
                <Input
                  type="email"
                  placeholder="contact@yourcompany.com"
                  value={formData.contactEmail || ''}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Documentation URL
                </label>
                <Input
                  type="url"
                  placeholder="https://docs.yoursite.com"
                  value={formData.documentationUrl || ''}
                  onChange={(e) => handleInputChange('documentationUrl', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Support URL
                </label>
                <Input
                  type="url"
                  placeholder="https://support.yoursite.com"
                  value={formData.supportUrl || ''}
                  onChange={(e) => handleInputChange('supportUrl', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tags (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="AI, machine learning, automation, productivity"
                value={formData.tags || ''}
                onChange={(e) => handleInputChange('tags', e.target.value)}
              />
              <p className="text-xs text-text-muted mt-1">
                Add relevant tags to help users discover your tool
              </p>
            </div>
          </div>
        )}
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

export default DetailedInfoStep;
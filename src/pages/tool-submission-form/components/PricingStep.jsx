import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingStep = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const [pricingType, setPricingType] = useState(formData.pricingType || 'free');

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handlePricingTypeChange = (type) => {
    setPricingType(type);
    updateFormData({ pricingType: type });
    
    // Clear pricing data when switching types
    if (type === 'free') {
      updateFormData({ 
        pricingPlans: [],
        oneTimePrice: '',
        subscriptionPrice: '',
        subscriptionPeriod: ''
      });
    }
  };

  const handlePlanAdd = () => {
    const currentPlans = formData.pricingPlans || [];
    updateFormData({ 
      pricingPlans: [...currentPlans, { 
        name: '', 
        price: '', 
        period: 'monthly', 
        features: [''] 
      }] 
    });
  };

  const handlePlanUpdate = (index, field, value) => {
    const currentPlans = formData.pricingPlans || [];
    const updatedPlans = [...currentPlans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    updateFormData({ pricingPlans: updatedPlans });
  };

  const handlePlanRemove = (index) => {
    const currentPlans = formData.pricingPlans || [];
    const updatedPlans = currentPlans.filter((_, i) => i !== index);
    updateFormData({ pricingPlans: updatedPlans });
  };

  const handlePlanFeatureAdd = (planIndex) => {
    const currentPlans = formData.pricingPlans || [];
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].features.push('');
    updateFormData({ pricingPlans: updatedPlans });
  };

  const handlePlanFeatureUpdate = (planIndex, featureIndex, value) => {
    const currentPlans = formData.pricingPlans || [];
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].features[featureIndex] = value;
    updateFormData({ pricingPlans: updatedPlans });
  };

  const handlePlanFeatureRemove = (planIndex, featureIndex) => {
    const currentPlans = formData.pricingPlans || [];
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].features = updatedPlans[planIndex].features.filter((_, i) => i !== featureIndex);
    updateFormData({ pricingPlans: updatedPlans });
  };

  const isFormValid = () => {
    if (pricingType === 'free') return true;
    if (pricingType === 'paid' && formData.pricingPlans && formData.pricingPlans.length > 0) {
      return formData.pricingPlans.every(plan => 
        plan.name && plan.price && plan.features.every(feature => feature.trim() !== '')
      );
    }
    return false;
  };

  const pricingOptions = [
    { id: 'free', label: 'Free', icon: 'Gift', description: 'Completely free to use' },
    { id: 'freemium', label: 'Freemium', icon: 'Zap', description: 'Free with premium features' },
    { id: 'paid', label: 'Paid', icon: 'CreditCard', description: 'Paid subscription or one-time' },
    { id: 'enterprise', label: 'Enterprise', icon: 'Building', description: 'Custom enterprise pricing' }
  ];

  return (
    <div className="space-y-6">
      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="DollarSign" size={20} className="mr-2 text-primary" />
          Pricing Information
        </h3>
        
        {/* Pricing Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Pricing Model *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handlePricingTypeChange(option.id)}
                className={`p-4 rounded-lg border smooth-transition text-left ${
                  pricingType === option.id
                    ? 'bg-primary/10 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={option.icon} size={20} />
                  <span className="font-medium">{option.label}</span>
                </div>
                <p className="text-xs opacity-80">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Free Pricing */}
        {pricingType === 'free' && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Check" size={20} />
              <span className="font-medium">Free Tool</span>
            </div>
            <p className="text-sm text-text-secondary mt-1">
              Your tool will be listed as completely free to use.
            </p>
          </div>
        )}

        {/* Freemium Pricing */}
        {pricingType === 'freemium' && (
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="Zap" size={20} />
                <span className="font-medium">Freemium Model</span>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                Free basic features with premium upgrades available.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Free Plan Description
              </label>
              <textarea
                placeholder="Describe what's included in the free plan"
                value={formData.freePlanDescription || ''}
                onChange={(e) => handleInputChange('freePlanDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition text-text-primary placeholder-text-muted"
              />
            </div>
          </div>
        )}

        {/* Paid Pricing */}
        {pricingType === 'paid' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-text-primary">
                Pricing Plans *
              </label>
              <Button
                variant="ghost"
                onClick={handlePlanAdd}
                iconName="Plus"
                className="text-primary hover:text-primary"
              >
                Add Plan
              </Button>
            </div>
            
            <div className="space-y-4">
              {(formData.pricingPlans || []).map((plan, planIndex) => (
                <div key={planIndex} className="bg-surface border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-text-primary">Plan {planIndex + 1}</h4>
                    <Button
                      variant="ghost"
                      onClick={() => handlePlanRemove(planIndex)}
                      iconName="X"
                      className="text-error hover:text-error"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1">
                        Plan Name
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., Basic, Pro, Enterprise"
                        value={plan.name}
                        onChange={(e) => handlePlanUpdate(planIndex, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1">
                        Price (USD)
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={plan.price}
                        onChange={(e) => handlePlanUpdate(planIndex, 'price', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1">
                        Billing Period
                      </label>
                      <select
                        value={plan.period}
                        onChange={(e) => handlePlanUpdate(planIndex, 'period', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition text-text-primary"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="one-time">One-time</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-text-secondary">
                        Plan Features
                      </label>
                      <Button
                        variant="ghost"
                        onClick={() => handlePlanFeatureAdd(planIndex)}
                        iconName="Plus"
                        className="text-primary hover:text-primary text-xs"
                      >
                        Add Feature
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <Input
                            type="text"
                            placeholder="Feature description"
                            value={feature}
                            onChange={(e) => handlePlanFeatureUpdate(planIndex, featureIndex, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            onClick={() => handlePlanFeatureRemove(planIndex, featureIndex)}
                            iconName="X"
                            className="text-error hover:text-error flex-shrink-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {(formData.pricingPlans || []).length === 0 && (
              <div className="text-center py-8 text-text-muted">
                <Icon name="CreditCard" size={48} className="mx-auto mb-3 opacity-50" />
                <p>No pricing plans added yet</p>
                <p className="text-sm">Click "Add Plan" to get started</p>
              </div>
            )}
          </div>
        )}

        {/* Enterprise Pricing */}
        {pricingType === 'enterprise' && (
          <div className="space-y-4">
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-secondary">
                <Icon name="Building" size={20} />
                <span className="font-medium">Enterprise Pricing</span>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                Custom pricing for enterprise customers.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Enterprise Contact Information
              </label>
              <Input
                type="email"
                placeholder="sales@yourcompany.com"
                value={formData.enterpriseContact || ''}
                onChange={(e) => handleInputChange('enterpriseContact', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Enterprise Features Description
              </label>
              <textarea
                placeholder="Describe enterprise features and benefits"
                value={formData.enterpriseDescription || ''}
                onChange={(e) => handleInputChange('enterpriseDescription', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition text-text-primary placeholder-text-muted"
              />
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

export default PricingStep;
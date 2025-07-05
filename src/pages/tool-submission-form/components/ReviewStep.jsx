import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewStep = ({ formData, onSubmit, onPrev, isSubmitting }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleSubmit = () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    if (!captchaVerified) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
    onSubmit();
  };

  const handleCaptchaVerify = () => {
    // Mock CAPTCHA verification
    setCaptchaVerified(true);
  };

  const formatPrice = (price, period) => {
    if (!price) return 'Free';
    return `$${price}${period ? `/${period}` : ''}`;
  };

  return (
    <div className="space-y-6">
      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Eye" size={20} className="mr-2 text-primary" />
          Review Your Submission
        </h3>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="border-b border-border pb-6">
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-primary" />
              Basic Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Tool Name:</span>
                <p className="text-text-primary font-medium">{formData.toolName || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-text-secondary">Website:</span>
                <p className="text-text-primary font-medium break-all">{formData.websiteUrl || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-text-secondary">Short Description:</span>
                <p className="text-text-primary">{formData.shortDescription || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-text-secondary">Categories:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(formData.categories || []).map((category) => (
                    <span key={category} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="border-b border-border pb-6">
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="FileText" size={16} className="mr-2 text-primary" />
              Detailed Information
            </h4>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-text-secondary">Detailed Description:</span>
                <p className="text-text-primary mt-1 whitespace-pre-wrap">
                  {formData.detailedDescription || 'Not provided'}
                </p>
              </div>
              
              <div>
                <span className="text-text-secondary">Key Features:</span>
                <ul className="list-disc list-inside text-text-primary mt-1 space-y-1">
                  {(formData.features || []).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {formData.companyName && (
                <div>
                  <span className="text-text-secondary">Company:</span>
                  <p className="text-text-primary">{formData.companyName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Information */}
          <div className="border-b border-border pb-6">
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2 text-primary" />
              Pricing Information
            </h4>
            
            <div className="text-sm">
              <div className="mb-2">
                <span className="text-text-secondary">Pricing Model:</span>
                <span className="text-text-primary font-medium ml-2 capitalize">
                  {formData.pricingType || 'Not specified'}
                </span>
              </div>
              
              {formData.pricingType === 'paid' && formData.pricingPlans && (
                <div className="space-y-3">
                  <span className="text-text-secondary">Pricing Plans:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formData.pricingPlans.map((plan, index) => (
                      <div key={index} className="bg-surface border border-border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-text-primary">{plan.name}</span>
                          <span className="text-primary font-bold">
                            {formatPrice(plan.price, plan.period)}
                          </span>
                        </div>
                        <ul className="text-xs text-text-secondary space-y-1">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center">
                              <Icon name="Check" size={12} className="mr-1 text-success" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Media */}
          <div>
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Image" size={16} className="mr-2 text-primary" />
              Media & Assets
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.logoPreview && (
                <div>
                  <span className="text-text-secondary text-sm">Logo:</span>
                  <div className="mt-2 bg-surface border border-border rounded-lg p-4 w-fit">
                    <Image
                      src={formData.logoPreview}
                      alt="Tool logo"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
              )}
              
              {formData.screenshots && formData.screenshots.length > 0 && (
                <div>
                  <span className="text-text-secondary text-sm">
                    Screenshots ({formData.screenshots.length}):
                  </span>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {formData.screenshots.slice(0, 3).map((screenshot) => (
                      <Image
                        key={screenshot.id}
                        src={screenshot.preview}
                        alt="Screenshot"
                        className="w-full h-16 object-cover rounded border border-border"
                      />
                    ))}
                    {formData.screenshots.length > 3 && (
                      <div className="w-full h-16 bg-surface border border-border rounded flex items-center justify-center text-text-muted text-xs">
                        +{formData.screenshots.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Terms and CAPTCHA */}
      <div className="neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Final Steps
        </h3>
        
        <div className="space-y-4">
          {/* CAPTCHA */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-border rounded flex items-center justify-center">
                  {captchaVerified && <Icon name="Check" size={16} className="text-success" />}
                </div>
                <span className="text-text-primary">I'm not a robot</span>
              </div>
              
              {!captchaVerified ? (
                <Button
                  variant="ghost"
                  onClick={handleCaptchaVerify}
                  className="text-primary hover:text-primary"
                >
                  Verify
                </Button>
              ) : (
                <Icon name="Shield" size={20} className="text-success" />
              )}
            </div>
          </div>
          
          {/* Terms Agreement */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="terms" className="text-sm text-text-primary">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . I confirm that all information provided is accurate and that I have the right to submit this tool for listing.
            </label>
          </div>
        </div>
      </div>

      {/* Submission Info */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-text-primary font-medium mb-1">What happens next?</p>
            <ul className="text-text-secondary space-y-1">
              <li>• Your submission will be reviewed by our team within 2-3 business days</li>
              <li>• You'll receive an email notification about the approval status</li>
              <li>• Once approved, your tool will be live on AIVibeSphere</li>
              <li>• You can track your submission status in your dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={onPrev}
          disabled={isSubmitting}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!agreedToTerms || !captchaVerified || isSubmitting}
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Tool'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
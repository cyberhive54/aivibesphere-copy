import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComparisonCart from '../../components/ui/ComparisonCart';
import FormProgress from './components/FormProgress';
import BasicInfoStep from './components/BasicInfoStep';
import DetailedInfoStep from './components/DetailedInfoStep';
import PricingStep from './components/PricingStep';
import MediaStep from './components/MediaStep';
import ReviewStep from './components/ReviewStep';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';

const ToolSubmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [savedDraft, setSavedDraft] = useState(false);

  const totalSteps = 5;
  const STORAGE_KEY = 'aivibesphere-tool-submission-draft';

  const steps = [
    { id: 1, title: 'Basic Info', component: BasicInfoStep },
    { id: 2, title: 'Details', component: DetailedInfoStep },
    { id: 3, title: 'Pricing', component: PricingStep },
    { id: 4, title: 'Media', component: MediaStep },
    { id: 5, title: 'Review', component: ReviewStep }
  ];

  // Load draft on component mount
  useEffect(() => {
    const savedDraftData = localStorage.getItem(STORAGE_KEY);
    if (savedDraftData) {
      try {
        const parsedData = JSON.parse(savedDraftData);
        setFormData(parsedData);
        setSavedDraft(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        setSavedDraft(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [formData]);

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setSavedDraft(false);
    setErrors(prev => {
      const updatedErrors = { ...prev };
      Object.keys(newData).forEach(key => {
        delete updatedErrors[key];
      });
      return updatedErrors;
    });
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.toolName) newErrors.toolName = 'Tool name is required';
        if (!formData.shortDescription) newErrors.shortDescription = 'Short description is required';
        if (!formData.websiteUrl) newErrors.websiteUrl = 'Website URL is required';
        if (!formData.categories || formData.categories.length === 0) {
          newErrors.categories = 'At least one category is required';
        }
        break;
      case 2:
        if (!formData.detailedDescription) newErrors.detailedDescription = 'Detailed description is required';
        if (!formData.features || formData.features.length === 0) {
          newErrors.features = 'At least one feature is required';
        }
        break;
      case 4:
        if (!formData.logoFile && !formData.logoPreview) {
          newErrors.logo = 'Tool logo is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate submission ID
      const id = `SUB-${Date.now().toString(36).toUpperCase()}`;
      setSubmissionId(id);
      
      // Clear draft
      localStorage.removeItem(STORAGE_KEY);
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({});
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your tool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({});
    setCurrentStep(1);
    setSavedDraft(false);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Submit Tool', path: '/tool-submission-form', icon: 'Plus', isLast: true }
  ];

  return (
    <>
      <Helmet>
        <title>Submit Your AI Tool - AIVibeSphere</title>
        <meta name="description" content="Submit your AI tool to AIVibeSphere directory. Share your innovative AI solution with thousands of users looking for the perfect AI tools." />
        <meta name="keywords" content="submit AI tool, AI tool directory, AI marketplace, tool submission, AI software listing" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb customItems={breadcrumbItems} />
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Submit Your AI Tool
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Share your innovative AI solution with thousands of users. Get discovered by the right audience and grow your user base.
              </p>
            </div>

            {/* Draft Status */}
            {savedDraft && Object.keys(formData).length > 0 && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Save" size={20} className="text-accent" />
                    <span className="text-text-primary font-medium">Draft saved automatically</span>
                  </div>
                  <button
                    onClick={clearDraft}
                    className="text-text-secondary hover:text-error smooth-transition text-sm"
                  >
                    Clear Draft
                  </button>
                </div>
              </div>
            )}

            {/* Progress */}
            <FormProgress 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
              steps={steps} 
            />

            {/* Form Content */}
            <div className="mb-8">
              <CurrentStepComponent
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
                onNext={handleNext}
                onPrev={handlePrev}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Help Section */}
            <div className="neumorphic-card p-6 mt-8">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
                Need Help?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Submission Guidelines</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Provide accurate and complete information</li>
                    <li>• Use high-quality images and screenshots</li>
                    <li>• Write clear, compelling descriptions</li>
                    <li>• Include all relevant features and pricing</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Review Process</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Review typically takes 2-3 business days</li>
                    <li>• We check for quality and accuracy</li>
                    <li>• You'll receive email notifications</li>
                    <li>• Approved tools go live immediately</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-text-secondary">
                  Questions? Contact us at{' '}
                  <a href="mailto:support@aivibesphere.com" className="text-primary hover:underline">
                    support@aivibesphere.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>

        <ComparisonCart />
        
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          submissionId={submissionId}
        />
      </div>
    </>
  );
};

export default ToolSubmissionForm;
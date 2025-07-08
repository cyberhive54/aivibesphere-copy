import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import featureRequestsService from '../../utils/featureRequestsService';

const RequestFeaturePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await featureRequestsService.submitFeatureRequest({
        user_id: user?.id || null,
        title: formData.title.trim(),
        description: formData.description.trim()
      });

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ title: '', description: '' });
      } else {
        setError(result.error || 'Failed to submit feature request');
      }
    } catch (err) {
      setError('Failed to submit feature request');
      console.error('Error submitting feature request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Request Feature', path: '/request-feature-page', icon: 'Lightbulb', isLast: true }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} className="text-success" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Feature Request Submitted!
              </h2>
              <p className="text-text-secondary mb-8">
                Thank you for your suggestion! We'll review your feature request and consider it for future updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => setIsSubmitted(false)}
                  iconName="Plus"
                >
                  Submit Another Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/homepage'}
                  iconName="Home"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Icon name="Lightbulb" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">💡 Request a Feature</h1>
                <p className="text-text-secondary">
                  Help us improve AIVibeSphere by suggesting new features
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="neumorphic-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-error text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Feature Title *
                </label>
                <Input
                  type="text"
                  placeholder="Brief title for your feature request"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  disabled={isSubmitting}
                  maxLength={100}
                />
                <p className="text-text-muted text-sm mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Feature Description *
                </label>
                <textarea
                  placeholder="Describe your feature request in detail. Include:&#10;• What problem would this solve?&#10;• How would it work?&#10;• Who would benefit from this feature?&#10;• Any additional context or examples"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={isSubmitting}
                  rows={8}
                  maxLength={1000}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition text-text-primary placeholder-text-muted resize-none"
                />
                <p className="text-text-muted text-sm mt-1">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              {!user && (
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-text-primary font-medium mb-1">Anonymous Submission</p>
                      <p className="text-text-secondary">
                        You're submitting this request anonymously. Consider signing in to track the status of your request and receive updates.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  className="flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feature Request'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.href = '/homepage'}
                  disabled={isSubmitting}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Guidelines */}
          <div className="mt-8 neumorphic-card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
              Feature Request Guidelines
            </h3>
            
            <div className="space-y-4 text-sm text-text-secondary">
              <div>
                <h4 className="font-medium text-text-primary mb-2">What makes a good feature request?</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Clear problem statement and proposed solution</li>
                  <li>Specific use cases and examples</li>
                  <li>Consideration of how it fits with existing features</li>
                  <li>Realistic scope and implementation feasibility</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-text-primary mb-2">What happens next?</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Our team reviews all feature requests</li>
                  <li>Popular requests may be prioritized for development</li>
                  <li>You'll receive updates on the status of your request</li>
                  <li>Implementation timeline depends on complexity and resources</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RequestFeaturePage;
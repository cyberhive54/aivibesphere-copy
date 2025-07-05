import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, submissionId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-1000 p-4">
      <div className="neumorphic-card bg-surface max-w-md w-full p-6 animate-scale-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Submission Successful!
          </h3>
          
          <p className="text-text-secondary mb-4">
            Thank you for submitting your AI tool to AIVibeSphere. Your submission has been received and is now under review.
          </p>
          
          <div className="bg-surface border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Submission ID:</span>
              <span className="text-text-primary font-mono font-medium">
                {submissionId}
              </span>
            </div>
          </div>
          
          <div className="space-y-3 text-sm text-text-secondary mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span>Review typically takes 2-3 business days</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-accent" />
              <span>You'll receive email updates on approval status</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-accent" />
              <span>Track your submission in the admin dashboard</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/homepage" className="flex-1">
              <Button variant="ghost" fullWidth>
                Back to Home
              </Button>
            </Link>
            <Link to="/tool-submission-form" className="flex-1">
              <Button 
                variant="primary" 
                fullWidth
                onClick={onClose}
              >
                Submit Another Tool
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Step {currentStep} of {totalSteps}
        </h2>
        <span className="text-sm text-text-secondary">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 smooth-transition ${
                    isCompleted
                      ? 'bg-success border-success text-success-foreground'
                      : isActive
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-surface border-border text-text-secondary'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                
                <span
                  className={`text-xs mt-2 text-center max-w-20 ${
                    isActive ? 'text-text-primary font-medium' : 'text-text-secondary'
                  }`}
                >
                  {step.title}
                </span>
                
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-10 w-full h-0.5 smooth-transition ${
                      isCompleted ? 'bg-success' : 'bg-border'
                    }`}
                    style={{ width: 'calc(100vw / 4 - 2.5rem)' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormProgress;
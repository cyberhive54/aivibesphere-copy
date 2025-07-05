import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyComparisonState = () => {
  const suggestedTools = [
    {
      id: 'chatgpt-4',
      name: 'ChatGPT-4',
      category: 'Conversational AI',
      rating: 4.8,
      description: 'Advanced conversational AI with multimodal capabilities'
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      category: 'Image Generation',
      rating: 4.7,
      description: 'AI-powered image generation and artistic creation'
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      category: 'Conversational AI',
      rating: 4.6,
      description: 'Constitutional AI assistant for safe interactions'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < Math.floor(rating) ? 'text-warning' : 'text-text-muted'}
      />
    ));
  };

  return (
    <div className="text-center py-16 bg-surface rounded-lg neumorphic-card">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="GitCompare" size={40} color="white" />
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Start Comparing AI Tools
        </h2>
        
        <p className="text-text-secondary mb-8 leading-relaxed">
          Compare up to 4 AI tools side by side to find the perfect solution for your needs. 
          Analyze features, pricing, ratings, and more to make informed decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link to="/category-listing-page">
            <Button
              variant="primary"
              iconName="Search"
              className="w-full sm:w-auto"
            >
              Browse All Tools
            </Button>
          </Link>
          
          <Link to="/homepage">
            <Button
              variant="outline"
              iconName="Home"
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Suggested Tools */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
            Popular Tools to Compare
          </h3>
          
          <div className="space-y-3">
            {suggestedTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center space-x-3 p-3 bg-background rounded-lg hover:bg-surface-hover smooth-transition cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-text-primary">
                      {tool.name}
                    </h4>
                    <span className="text-xs bg-surface px-2 py-1 rounded text-text-secondary">
                      {tool.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary truncate">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(tool.rating)}
                    <span className="text-xs text-text-secondary ml-1">
                      {tool.rating}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  iconName="Plus"
                  className="text-text-secondary hover:text-primary flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Comparison Features
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Side-by-side Analysis
                </p>
                <p className="text-xs text-text-secondary">
                  Compare features, pricing, and ratings
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Export to PDF
                </p>
                <p className="text-xs text-text-secondary">
                  Save comparisons for offline review
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Detailed Insights
                </p>
                <p className="text-xs text-text-secondary">
                  Technical specs and user reviews
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Save Comparisons
                </p>
                <p className="text-xs text-text-secondary">
                  Bookmark for future reference
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyComparisonState;
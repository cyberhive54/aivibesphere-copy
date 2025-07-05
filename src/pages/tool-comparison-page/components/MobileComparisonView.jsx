import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MobileComparisonView = ({ comparisonItems, onRemoveTool }) => {
  const [selectedTool, setSelectedTool] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    features: false,
    pricing: false,
    reviews: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const getToolData = (toolId) => {
    const mockData = {
      'chatgpt-4': {
        category: 'Conversational AI',
        company: 'OpenAI',
        launchDate: 'March 2023',
        pricing: 'Freemium',
        startingPrice: '$20/month',
        freeTier: true,
        apiAccess: true,
        multiLanguage: true,
        customTraining: false,
        totalReviews: '15,420',
        avgRating: 4.8,
        easeOfUse: 4.9,
        valueForMoney: 4.6,
        keyFeatures: [
          'Advanced reasoning capabilities',
          'Multimodal input support',
          'Code generation and debugging',
          'Creative writing assistance',
          'Mathematical problem solving'
        ],
        pros: [
          'Excellent reasoning abilities',
          'Handles complex queries well',
          'Regular updates and improvements',
          'Strong safety measures'
        ],
        cons: [
          'Usage limits on free tier',
          'Can be expensive for heavy use',
          'Occasional hallucinations'
        ]
      },
      'midjourney': {
        category: 'Image Generation',
        company: 'Midjourney Inc.',
        launchDate: 'July 2022',
        pricing: 'Paid',
        startingPrice: '$10/month',
        freeTier: false,
        apiAccess: false,
        multiLanguage: true,
        customTraining: true,
        totalReviews: '8,750',
        avgRating: 4.7,
        easeOfUse: 4.5,
        valueForMoney: 4.8,
        keyFeatures: [
          'High-quality image generation',
          'Artistic style variations',
          'Upscaling capabilities',
          'Community gallery',
          'Style references'
        ],
        pros: [
          'Exceptional image quality',
          'Great for artistic creations',
          'Active community',
          'Regular model updates'
        ],
        cons: [
          'Discord-only interface',
          'No free tier',
          'Limited control over output'
        ]
      }
    };

    return mockData[toolId] || {};
  };

  if (comparisonItems.length === 0) {
    return (
      <div className="text-center py-16 bg-surface rounded-lg neumorphic-card">
        <Icon name="GitCompare" size={48} className="mx-auto mb-4 text-text-muted" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No Tools Selected
        </h3>
        <p className="text-text-secondary text-sm">
          Add tools to start comparing
        </p>
      </div>
    );
  }

  const currentTool = comparisonItems[selectedTool];
  const toolData = getToolData(currentTool.id);

  return (
    <div className="space-y-4">
      {/* Tool Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {comparisonItems.map((tool, index) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(index)}
            className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg smooth-transition ${
              selectedTool === index
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            <Image
              src={tool.logo || `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=32&h=32&fit=crop&crop=center`}
              alt={tool.name}
              className="w-6 h-6 rounded object-cover"
            />
            <span className="text-sm font-medium whitespace-nowrap">
              {tool.name}
            </span>
          </button>
        ))}
      </div>

      {/* Tool Details */}
      <div className="bg-surface rounded-lg neumorphic-card overflow-hidden">
        {/* Tool Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start justify-between mb-3">
            <Image
              src={currentTool.logo || `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop&crop=center`}
              alt={currentTool.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <Button
              variant="ghost"
              onClick={() => onRemoveTool(currentTool.id)}
              iconName="Trash2"
              className="text-text-secondary hover:text-error"
            />
          </div>
          
          <h2 className="text-xl font-bold text-text-primary mb-1">
            {currentTool.name}
          </h2>
          <p className="text-text-secondary text-sm mb-3">
            {currentTool.description}
          </p>
          
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(currentTool.rating || 4.5)}
            <span className="text-sm text-text-secondary ml-2">
              {currentTool.rating || 4.5} ({toolData.totalReviews || 'N/A'} reviews)
            </span>
          </div>
        </div>

        {/* Overview Section */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('overview')}
            className="w-full flex items-center justify-between p-4 hover:bg-surface-hover smooth-transition"
          >
            <h3 className="font-semibold text-text-primary">Overview</h3>
            <Icon
              name={expandedSections.overview ? "ChevronUp" : "ChevronDown"}
              size={20}
              className="text-text-secondary"
            />
          </button>
          
          {expandedSections.overview && (
            <div className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Category:</span>
                  <p className="text-text-primary font-medium">{toolData.category}</p>
                </div>
                <div>
                  <span className="text-text-secondary">Company:</span>
                  <p className="text-text-primary font-medium">{toolData.company}</p>
                </div>
                <div>
                  <span className="text-text-secondary">Launch Date:</span>
                  <p className="text-text-primary font-medium">{toolData.launchDate}</p>
                </div>
                <div>
                  <span className="text-text-secondary">Pricing:</span>
                  <p className="text-text-primary font-medium">{toolData.pricing}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('features')}
            className="w-full flex items-center justify-between p-4 hover:bg-surface-hover smooth-transition"
          >
            <h3 className="font-semibold text-text-primary">Key Features</h3>
            <Icon
              name={expandedSections.features ? "ChevronUp" : "ChevronDown"}
              size={20}
              className="text-text-secondary"
            />
          </button>
          
          {expandedSections.features && (
            <div className="px-4 pb-4">
              <div className="space-y-2">
                {toolData.keyFeatures?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <Icon
                    name={toolData.apiAccess ? "Check" : "X"}
                    size={20}
                    className={toolData.apiAccess ? 'text-success' : 'text-error'}
                  />
                  <p className="text-xs text-text-secondary mt-1">API Access</p>
                </div>
                <div className="text-center">
                  <Icon
                    name={toolData.multiLanguage ? "Check" : "X"}
                    size={20}
                    className={toolData.multiLanguage ? 'text-success' : 'text-error'}
                  />
                  <p className="text-xs text-text-secondary mt-1">Multi-language</p>
                </div>
                <div className="text-center">
                  <Icon
                    name={toolData.freeTier ? "Check" : "X"}
                    size={20}
                    className={toolData.freeTier ? 'text-success' : 'text-error'}
                  />
                  <p className="text-xs text-text-secondary mt-1">Free Tier</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('pricing')}
            className="w-full flex items-center justify-between p-4 hover:bg-surface-hover smooth-transition"
          >
            <h3 className="font-semibold text-text-primary">Pricing</h3>
            <Icon
              name={expandedSections.pricing ? "ChevronUp" : "ChevronDown"}
              size={20}
              className="text-text-secondary"
            />
          </button>
          
          {expandedSections.pricing && (
            <div className="px-4 pb-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  {toolData.startingPrice}
                </div>
                <p className="text-sm text-text-secondary">Starting price</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Free Tier:</span>
                  <Icon
                    name={toolData.freeTier ? "Check" : "X"}
                    size={16}
                    className={toolData.freeTier ? 'text-success' : 'text-error'}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Model:</span>
                  <span className="text-text-primary">{toolData.pricing}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div>
          <button
            onClick={() => toggleSection('reviews')}
            className="w-full flex items-center justify-between p-4 hover:bg-surface-hover smooth-transition"
          >
            <h3 className="font-semibold text-text-primary">User Reviews</h3>
            <Icon
              name={expandedSections.reviews ? "ChevronUp" : "ChevronDown"}
              size={20}
              className="text-text-secondary"
            />
          </button>
          
          {expandedSections.reviews && (
            <div className="px-4 pb-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">
                    {toolData.avgRating}
                  </div>
                  <div className="flex justify-center space-x-1 mb-1">
                    {renderStars(toolData.avgRating)}
                  </div>
                  <p className="text-xs text-text-secondary">Overall Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">
                    {toolData.totalReviews}
                  </div>
                  <p className="text-xs text-text-secondary">Total Reviews</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">Ease of Use:</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(toolData.easeOfUse)}
                    <span className="text-sm text-text-primary ml-1">
                      {toolData.easeOfUse}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">Value for Money:</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(toolData.valueForMoney)}
                    <span className="text-sm text-text-primary ml-1">
                      {toolData.valueForMoney}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pros and Cons */}
              {(toolData.pros || toolData.cons) && (
                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-border">
                  {toolData.pros && (
                    <div>
                      <h4 className="font-medium text-success mb-2 flex items-center">
                        <Icon name="ThumbsUp" size={16} className="mr-1" />
                        Pros
                      </h4>
                      <ul className="space-y-1">
                        {toolData.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-text-secondary flex items-start">
                            <Icon name="Plus" size={12} className="text-success mr-2 mt-1 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {toolData.cons && (
                    <div>
                      <h4 className="font-medium text-error mb-2 flex items-center">
                        <Icon name="ThumbsDown" size={16} className="mr-1" />
                        Cons
                      </h4>
                      <ul className="space-y-1">
                        {toolData.cons.map((con, index) => (
                          <li key={index} className="text-sm text-text-secondary flex items-start">
                            <Icon name="Minus" size={12} className="text-error mr-2 mt-1 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileComparisonView;
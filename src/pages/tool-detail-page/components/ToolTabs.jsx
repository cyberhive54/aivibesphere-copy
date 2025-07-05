import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ToolTabs = ({ tool }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'features', label: 'Features', icon: 'List' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' }
  ];

  const renderPricingTier = (tier, index) => (
    <div key={index} className="neumorphic-card p-6 relative">
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">{tier.name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-text-primary">${tier.price}</span>
          {tier.period && <span className="text-text-secondary">/{tier.period}</span>}
        </div>
        <p className="text-text-secondary text-sm">{tier.description}</p>
      </div>

      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <span className="text-text-secondary text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={tier.popular ? "primary" : "outline"}
        fullWidth
        iconName="ExternalLink"
        iconPosition="right"
      >
        {tier.cta}
      </Button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">About {tool.name}</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary leading-relaxed mb-4">
                  {tool.fullDescription}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {tool.additionalInfo}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.useCases.map((useCase, index) => (
                  <div key={index} className="bg-surface p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Target" size={16} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary mb-1">{useCase.title}</h4>
                        <p className="text-text-secondary text-sm">{useCase.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.features.map((feature, index) => (
                  <div key={index} className="bg-surface p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Zap" size={16} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary mb-1">{feature.name}</h4>
                        <p className="text-text-secondary text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Technical Specifications</h3>
              <div className="neumorphic-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Supported Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.platforms.map((platform, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-surface text-text-secondary text-sm rounded-full border border-border"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.integrations.map((integration, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-surface text-text-secondary text-sm rounded-full border border-border"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Pricing Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tool.pricing.tiers.map((tier, index) => renderPricingTier(tier, index))}
              </div>
            </div>

            {tool.pricing.notes && (
              <div className="neumorphic-card p-6">
                <h4 className="font-medium text-text-primary mb-3">Pricing Notes</h4>
                <ul className="space-y-2">
                  {tool.pricing.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="neumorphic-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">User Reviews</h3>
              
              {/* Rating Summary */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-text-primary mb-1">
                    {tool.rating.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < Math.floor(tool.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}
                      />
                    ))}
                  </div>
                  <div className="text-text-secondary text-sm">
                    {tool.reviewCount} reviews
                  </div>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2 mb-1">
                      <span className="text-text-secondary text-sm w-8">{stars}★</span>
                      <div className="flex-1 bg-surface rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${(tool.ratingDistribution[stars] / tool.reviewCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-text-secondary text-sm w-8">
                        {tool.ratingDistribution[stars]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {tool.reviews.map((review, index) => (
                  <div key={index} className="bg-surface p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{review.userName}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  size={12}
                                  className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-600"}
                                />
                              ))}
                            </div>
                            <span className="text-text-secondary text-sm">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">
                      {review.comment}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-text-secondary hover:text-accent text-sm smooth-transition">
                        <Icon name="ThumbsUp" size={14} />
                        <span>Helpful ({review.helpfulCount})</span>
                      </button>
                      <button className="flex items-center gap-1 text-text-secondary hover:text-error text-sm smooth-transition">
                        <Icon name="ThumbsDown" size={14} />
                        <span>Not Helpful</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="neumorphic-card">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap smooth-transition border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name={tab.icon} size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ToolTabs;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ComparisonTable = ({ comparisonItems, onRemoveTool, onReplaceTools }) => {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    features: false,
    pricing: false,
    reviews: false,
    technical: false
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
        size={16}
        className={i < Math.floor(rating) ? 'text-warning' : 'text-text-muted'}
      />
    ));
  };

  const comparisonData = {
    overview: [
      { label: 'Category', key: 'category' },
      { label: 'Rating', key: 'rating', type: 'rating' },
      { label: 'Pricing Model', key: 'pricing' },
      { label: 'Launch Date', key: 'launchDate' },
      { label: 'Company', key: 'company' }
    ],
    features: [
      { label: 'API Access', key: 'apiAccess', type: 'boolean' },
      { label: 'Multi-language Support', key: 'multiLanguage', type: 'boolean' },
      { label: 'Custom Training', key: 'customTraining', type: 'boolean' },
      { label: 'Integration Options', key: 'integrations', type: 'list' },
      { label: 'Output Formats', key: 'outputFormats', type: 'list' }
    ],
    pricing: [
      { label: 'Free Tier', key: 'freeTier', type: 'boolean' },
      { label: 'Starting Price', key: 'startingPrice' },
      { label: 'Enterprise Plan', key: 'enterprisePlan' },
      { label: 'Usage Limits', key: 'usageLimits' },
      { label: 'Billing Cycle', key: 'billingCycle' }
    ],
    reviews: [
      { label: 'Total Reviews', key: 'totalReviews' },
      { label: 'Avg Rating', key: 'avgRating', type: 'rating' },
      { label: 'Ease of Use', key: 'easeOfUse', type: 'rating' },
      { label: 'Value for Money', key: 'valueForMoney', type: 'rating' },
      { label: 'Customer Support', key: 'customerSupport', type: 'rating' }
    ],
    technical: [
      { label: 'Model Architecture', key: 'modelArchitecture' },
      { label: 'Training Data', key: 'trainingData' },
      { label: 'Response Time', key: 'responseTime' },
      { label: 'Uptime SLA', key: 'uptimeSLA' },
      { label: 'Data Privacy', key: 'dataPrivacy' }
    ]
  };

  // Mock detailed data for comparison tools
  const getToolData = (toolId) => {
    const mockData = {
      'chatgpt-4': {
        category: 'Conversational AI',
        rating: 4.8,
        pricing: 'Freemium',
        launchDate: 'March 2023',
        company: 'OpenAI',
        apiAccess: true,
        multiLanguage: true,
        customTraining: false,
        integrations: ['Slack', 'Discord', 'API'],
        outputFormats: ['Text', 'Code', 'JSON'],
        freeTier: true,
        startingPrice: '$20/month',
        enterprisePlan: 'Custom',
        usageLimits: '25 messages/3 hours',
        billingCycle: 'Monthly',
        totalReviews: '15,420',
        avgRating: 4.8,
        easeOfUse: 4.9,
        valueForMoney: 4.6,
        customerSupport: 4.7,
        modelArchitecture: 'Transformer',
        trainingData: 'Internet + Books',
        responseTime: '< 2 seconds',
        uptimeSLA: '99.9%',
        dataPrivacy: 'High'
      },
      'midjourney': {
        category: 'Image Generation',
        rating: 4.7,
        pricing: 'Paid',
        launchDate: 'July 2022',
        company: 'Midjourney Inc.',
        apiAccess: false,
        multiLanguage: true,
        customTraining: true,
        integrations: ['Discord', 'Web'],
        outputFormats: ['PNG', 'JPG', 'WebP'],
        freeTier: false,
        startingPrice: '$10/month',
        enterprisePlan: '$60/month',
        usageLimits: '200 images/month',
        billingCycle: 'Monthly/Yearly',
        totalReviews: '8,750',
        avgRating: 4.7,
        easeOfUse: 4.5,
        valueForMoney: 4.8,
        customerSupport: 4.3,
        modelArchitecture: 'Diffusion',
        trainingData: 'Art + Images',
        responseTime: '30-60 seconds',
        uptimeSLA: '99.5%',
        dataPrivacy: 'Medium'
      },
      'claude-3': {
        category: 'Conversational AI',
        rating: 4.6,
        pricing: 'Freemium',
        launchDate: 'March 2024',
        company: 'Anthropic',
        apiAccess: true,
        multiLanguage: true,
        customTraining: false,
        integrations: ['API', 'Slack', 'Web'],
        outputFormats: ['Text', 'Code', 'Analysis'],
        freeTier: true,
        startingPrice: '$20/month',
        enterprisePlan: 'Custom',
        usageLimits: '5 messages/hour',
        billingCycle: 'Monthly',
        totalReviews: '3,200',
        avgRating: 4.6,
        easeOfUse: 4.7,
        valueForMoney: 4.5,
        customerSupport: 4.8,
        modelArchitecture: 'Constitutional AI',
        trainingData: 'Curated Dataset',
        responseTime: '< 3 seconds',
        uptimeSLA: '99.8%',
        dataPrivacy: 'Very High'
      },
      'github-copilot': {
        category: 'Code Generation',
        rating: 4.5,
        pricing: 'Paid',
        launchDate: 'June 2022',
        company: 'GitHub/Microsoft',
        apiAccess: true,
        multiLanguage: true,
        customTraining: false,
        integrations: ['VS Code', 'JetBrains', 'Neovim'],
        outputFormats: ['Code', 'Comments', 'Tests'],
        freeTier: false,
        startingPrice: '$10/month',
        enterprisePlan: '$19/user/month',
        usageLimits: 'Unlimited',
        billingCycle: 'Monthly/Yearly',
        totalReviews: '12,500',
        avgRating: 4.5,
        easeOfUse: 4.6,
        valueForMoney: 4.4,
        customerSupport: 4.2,
        modelArchitecture: 'Codex',
        trainingData: 'GitHub Repositories',
        responseTime: '< 1 second',
        uptimeSLA: '99.9%',
        dataPrivacy: 'High'
      }
    };

    return mockData[toolId] || {};
  };

  const renderCellValue = (tool, field) => {
    const data = getToolData(tool.id);
    const value = data[field.key];

    if (field.type === 'rating') {
      return (
        <div className="flex items-center space-x-1">
          {renderStars(value || 0)}
          <span className="text-sm text-text-secondary ml-2">
            {value || 'N/A'}
          </span>
        </div>
      );
    }

    if (field.type === 'boolean') {
      return (
        <div className="flex items-center">
          <Icon
            name={value ? "Check" : "X"}
            size={16}
            className={value ? 'text-success' : 'text-error'}
          />
        </div>
      );
    }

    if (field.type === 'list' && Array.isArray(value)) {
      return (
        <div className="space-y-1">
          {value.map((item, index) => (
            <span
              key={index}
              className="inline-block bg-surface px-2 py-1 rounded text-xs text-text-secondary mr-1 mb-1"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    return (
      <span className="text-text-primary">
        {value || 'N/A'}
      </span>
    );
  };

  if (comparisonItems.length === 0) {
    return (
      <div className="text-center py-16 bg-surface rounded-lg neumorphic-card">
        <Icon name="GitCompare" size={64} className="mx-auto mb-4 text-text-muted" />
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No Tools Selected
        </h3>
        <p className="text-text-secondary mb-6">
          Add tools to start comparing their features and capabilities
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tool Headers */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {comparisonItems.map((tool, index) => (
          <div key={tool.id} className="bg-surface rounded-lg p-4 neumorphic-card">
            <div className="flex items-start justify-between mb-3">
              <Image
                src={tool.logo || `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop&crop=center`}
                alt={tool.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <Button
                variant="ghost"
                onClick={() => onRemoveTool(tool.id)}
                iconName="X"
                className="text-text-secondary hover:text-error p-1"
              />
            </div>
            <h3 className="font-semibold text-text-primary mb-1">
              {tool.name}
            </h3>
            <p className="text-sm text-text-secondary mb-3">
              {tool.description}
            </p>
            <div className="flex items-center space-x-1">
              {renderStars(tool.rating || 4.5)}
              <span className="text-sm text-text-secondary ml-2">
                {tool.rating || 4.5}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Sections */}
      {Object.entries(comparisonData).map(([sectionKey, fields]) => (
        <div key={sectionKey} className="bg-surface rounded-lg neumorphic-card overflow-hidden">
          <button
            onClick={() => toggleSection(sectionKey)}
            className="w-full flex items-center justify-between p-4 hover:bg-surface-hover smooth-transition"
          >
            <h3 className="text-lg font-semibold text-text-primary capitalize">
              {sectionKey} Comparison
            </h3>
            <Icon
              name={expandedSections[sectionKey] ? "ChevronUp" : "ChevronDown"}
              size={20}
              className="text-text-secondary"
            />
          </button>

          {expandedSections[sectionKey] && (
            <div className="border-t border-border">
              {fields.map((field, fieldIndex) => (
                <div
                  key={field.key}
                  className={`grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 ${
                    fieldIndex % 2 === 0 ? 'bg-background/50' : ''
                  }`}
                >
                  <div className="font-medium text-text-primary">
                    {field.label}
                  </div>
                  {comparisonItems.map((tool) => (
                    <div key={`${tool.id}-${field.key}`} className="lg:col-span-1">
                      {renderCellValue(tool, field)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComparisonTable;
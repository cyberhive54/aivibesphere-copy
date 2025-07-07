import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

const ToolHero = ({ tool, onBookmark, isBookmarked, onAddToComparison, isInComparison }) => {
  const { user } = useAuth();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current opacity-50" />
        );
      } else {
        stars.push(
          <Icon key={i} name="Star" size={16} className="text-gray-600" />
        );
      }
    }
    return stars;
  };

  const handleBookmark = () => {
    if (!user) {
      // Show login prompt or redirect to login
      alert('Please sign in to bookmark tools');
      return;
    }
    onBookmark();
  };

  return (
    <div className="neumorphic-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Tool Logo */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden bg-surface border border-border">
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Tool Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                {tool.name}
              </h1>
              
              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {tool.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(tool.rating)}
                </div>
                <span className="text-text-primary font-semibold">
                  {tool.rating.toFixed(1)}
                </span>
                <span className="text-text-secondary text-sm">
                  ({tool.reviewCount} reviews)
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={16} />
                  <span>{tool.viewCount.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  <span>Added {tool.dateAdded}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:flex-shrink-0">
              <Button
                variant="ghost"
                onClick={handleBookmark}
                iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                className={`${isBookmarked ? 'text-accent' : 'text-text-secondary'} hover:text-accent`}
              >
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                onClick={onAddToComparison}
                iconName="GitCompare"
                disabled={isInComparison}
                className="whitespace-nowrap"
              >
                {isInComparison ? 'In Comparison' : 'Compare'}
              </Button>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-text-secondary mb-6 leading-relaxed">
            {tool.shortDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              iconName="ExternalLink"
              iconPosition="right"
              className="flex-1 sm:flex-none"
              onClick={() => window.open(tool.websiteUrl, '_blank')}
            >
              Visit {tool.name}
            </Button>
            
            {tool.pricing.type === 'freemium' && (
              <Button
                variant="success"
                iconName="Download"
                iconPosition="right"
                className="flex-1 sm:flex-none"
                onClick={() => window.open(tool.websiteUrl, '_blank')}
              >
                Try Free
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolHero;
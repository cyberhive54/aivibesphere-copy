import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedTools = ({ tools, currentToolId }) => {
  const filteredTools = tools.filter(tool => tool.id !== currentToolId).slice(0, 6);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={12}
          className={i < fullStars ? "text-yellow-400 fill-current" : "text-gray-600"}
        />
      );
    }
    return stars;
  };

  if (filteredTools.length === 0) {
    return null;
  }

  return (
    <div className="neumorphic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Related Tools</h3>
        <Link to="/category-listing-page">
          <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {filteredTools.map((tool) => (
          <Link
            key={tool.id}
            to={`/tool-detail-page?id=${tool.id}`}
            className="block group"
          >
            <div className="bg-surface p-4 rounded-lg border border-border hover:border-primary/50 smooth-transition">
              <div className="flex items-start gap-3">
                {/* Tool Logo */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-background border border-border flex-shrink-0">
                  <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tool Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary group-hover:text-primary smooth-transition mb-1 truncate">
                    {tool.name}
                  </h4>
                  
                  <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                    {tool.shortDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(tool.rating)}
                      </div>
                      <span className="text-text-secondary text-xs">
                        {tool.rating.toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-text-muted text-xs">
                      <Icon name="Eye" size={12} />
                      <span>{tool.viewCount > 1000 ? `${(tool.viewCount / 1000).toFixed(1)}k` : tool.viewCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-4">Quick Actions</h4>
        <div className="space-y-3">
          <Link to="/tool-comparison-page">
            <Button
              variant="outline"
              fullWidth
              iconName="GitCompare"
              iconPosition="left"
            >
              Compare Tools
            </Button>
          </Link>
          
          <Link to="/tool-submission-form">
            <Button
              variant="ghost"
              fullWidth
              iconName="Plus"
              iconPosition="left"
            >
              Submit a Tool
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTools;
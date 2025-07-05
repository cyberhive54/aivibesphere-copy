import React from 'react';
import { Star, ExternalLink, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolCard = ({ tool }) => {
  if (!tool) return null;

  const handleVisitTool = (e) => {
    e.stopPropagation();
    // Track click for analytics
    if (tool?.referral_url) {
      window.open(tool.referral_url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatRating = (rating) => {
    if (!rating || rating === 0) return '0.0';
    return parseFloat(rating).toFixed(1);
  };

  const getPricingColor = (pricingType) => {
    switch (pricingType) {
      case 'free':
        return 'text-green-400 bg-green-400/10';
      case 'freemium':
        return 'text-blue-400 bg-blue-400/10';
      case 'paid':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'one_time':
        return 'text-purple-400 bg-purple-400/10';
      default:
        return 'text-blue-400 bg-blue-400/10';
    }
  };

  const getPricingLabel = (pricingType) => {
    switch (pricingType) {
      case 'free':
        return 'Free';
      case 'freemium':
        return 'Freemium';
      case 'paid':
        return 'Paid';
      case 'one_time':
        return 'One-time';
      default:
        return 'Freemium';
    }
  };

  return (
    <div className="group bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl smooth-transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            {tool?.logo_url ? (
              <img
                src={tool.logo_url}
                alt={`${tool?.name || 'Tool'} logo`}
                className="w-12 h-12 rounded-xl object-cover bg-surface-hover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold ${tool?.logo_url ? 'hidden' : 'flex'}`}
            >
              {tool?.name?.charAt(0)?.toUpperCase() || 'T'}
            </div>
          </div>

          {/* Tool Info */}
          <div className="flex-1 min-w-0">
            <Link
              to={`/tool-detail-page?tool=${tool?.slug || tool?.id}`}
              className="block"
            >
              <h3 className="font-semibold text-text-primary text-lg group-hover:text-primary smooth-transition truncate">
                {tool?.name || 'Untitled Tool'}
              </h3>
            </Link>
            <p className="text-sm text-text-secondary capitalize">
              {tool?.category || 'General'}
            </p>
          </div>
        </div>

        {/* Pricing Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPricingColor(tool?.pricing_type)}`}>
          {getPricingLabel(tool?.pricing_type)}
        </span>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
        {tool?.description || 'No description available.'}
      </p>

      {/* Features */}
      {tool?.features && tool.features.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tool.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-surface-hover text-text-secondary text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {tool.features.length > 3 && (
              <span className="px-2 py-1 bg-surface-hover text-text-secondary text-xs rounded-md">
                +{tool.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mb-6 text-sm">
        <div className="flex items-center space-x-4">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-text-primary font-medium">
              {formatRating(tool?.average_rating)}
            </span>
            <span className="text-text-secondary">
              ({tool?.rating_count || 0})
            </span>
          </div>

          {/* Views */}
          <div className="flex items-center space-x-1 text-text-secondary">
            <Eye className="w-4 h-4" />
            <span>{formatViews(tool?.view_count)}</span>
          </div>
        </div>

        {/* Featured Badge */}
        {tool?.is_featured && (
          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md font-medium">
            Featured
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Link
          to={`/tool-detail-page?tool=${tool?.slug || tool?.id}`}
          className="flex-1 bg-surface-hover hover:bg-border text-text-primary text-center py-3 px-4 rounded-xl font-medium smooth-transition"
        >
          View Details
        </Link>
        <button
          onClick={handleVisitTool}
          className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:scale-105 smooth-transition group"
        >
          <span className="mr-2">Visit</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 smooth-transition" />
        </button>
      </div>
    </div>
  );
};

export default ToolCard;
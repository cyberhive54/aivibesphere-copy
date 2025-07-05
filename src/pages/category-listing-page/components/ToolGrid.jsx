import React from 'react';
import ToolCard from './ToolCard';
import SkeletonCard from './SkeletonCard';
import BannerAd from './BannerAd';

const ToolGrid = ({ tools, isLoading, onViewTool, hasMore, onLoadMore }) => {
  if (isLoading && tools.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!isLoading && tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-12 h-12 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">No tools found</h3>
        <p className="text-text-secondary mb-4">
          Try adjusting your filters or search terms to find more tools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <React.Fragment key={tool.id}>
            <ToolCard tool={tool} onViewTool={onViewTool} />
            
            {/* Insert banner ad every 6 tools */}
            {(index + 1) % 6 === 0 && index < tools.length - 1 && (
              <div className="md:col-span-2 lg:col-span-3">
                <BannerAd 
                  size="large"
                  className="my-4"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Loading More Indicator */}
      {isLoading && tools.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={`loading-${index}`} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!isLoading && hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={onLoadMore}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 smooth-transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Load More Tools
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolGrid;
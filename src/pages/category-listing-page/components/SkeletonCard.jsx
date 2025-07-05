import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="neumorphic-card bg-surface animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-background rounded-t-lg"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        {/* Title and Description */}
        <div className="space-y-2">
          <div className="h-5 bg-background rounded w-3/4"></div>
          <div className="h-4 bg-background rounded w-full"></div>
          <div className="h-4 bg-background rounded w-2/3"></div>
        </div>

        {/* Rating and Views */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-3 h-3 bg-background rounded"></div>
              ))}
            </div>
            <div className="h-4 bg-background rounded w-8"></div>
          </div>
          <div className="h-4 bg-background rounded w-12"></div>
        </div>

        {/* Pricing */}
        <div className="h-4 bg-background rounded w-20"></div>

        {/* Features */}
        <div className="flex space-x-2">
          <div className="h-6 bg-background rounded w-16"></div>
          <div className="h-6 bg-background rounded w-20"></div>
          <div className="h-6 bg-background rounded w-12"></div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <div className="h-9 bg-background rounded flex-1"></div>
          <div className="h-9 w-9 bg-background rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
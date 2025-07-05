import React from 'react';

import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll, categories }) => {
  const getActiveFilters = () => {
    const active = [];

    if (filters.category) {
      const category = categories.find(cat => cat.slug === filters.category);
      active.push({
        key: 'category',
        label: `Category: ${category?.name || filters.category}`,
        value: filters.category
      });
    }

    if (filters.minRating > 0) {
      active.push({
        key: 'minRating',
        label: `Rating: ${filters.minRating}+ stars`,
        value: filters.minRating
      });
    }

    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      const min = filters.priceRange.min || 0;
      const max = filters.priceRange.max || '∞';
      active.push({
        key: 'priceRange',
        label: `Price: $${min} - $${max}`,
        value: filters.priceRange
      });
    }

    if (filters.pricingType) {
      const typeLabels = {
        free: 'Free',
        freemium: 'Freemium',
        paid: 'Paid',
        subscription: 'Subscription'
      };
      active.push({
        key: 'pricingType',
        label: `Type: ${typeLabels[filters.pricingType]}`,
        value: filters.pricingType
      });
    }

    if (filters.mostViewed) {
      active.push({
        key: 'mostViewed',
        label: 'Most Viewed',
        value: true
      });
    }

    if (filters.minReviews > 0) {
      active.push({
        key: 'minReviews',
        label: `Reviews: ${filters.minReviews}+`,
        value: filters.minReviews
      });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-text-secondary font-medium">Active filters:</span>
        
        {activeFilters.map((filter) => (
          <div
            key={filter.key}
            className="flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm"
          >
            <span>{filter.label}</span>
            <Button
              variant="ghost"
              onClick={() => onRemoveFilter(filter.key)}
              iconName="X"
              className="p-0 w-4 h-4 text-primary hover:text-primary/80"
            />
          </div>
        ))}

        {activeFilters.length > 1 && (
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-text-secondary hover:text-text-primary text-sm"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
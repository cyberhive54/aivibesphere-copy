import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  categories,
  activeFiltersCount 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceRangeChange = (type, value) => {
    const updatedPriceRange = { 
      ...localFilters.priceRange, 
      [type]: value === '' ? null : parseFloat(value) 
    };
    handleFilterChange('priceRange', updatedPriceRange);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: '',
      minRating: 0,
      priceRange: { min: null, max: null },
      mostViewed: false,
      minReviews: 0,
      pricingType: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const pricingTypes = [
    { value: '', label: 'All Pricing' },
    { value: 'free', label: 'Free' },
    { value: 'freemium', label: 'Freemium' },
    { value: 'paid', label: 'Paid' },
    { value: 'subscription', label: 'Subscription' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-1000 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full lg:h-auto w-full lg:w-80 
        bg-surface lg:bg-transparent border-l lg:border-l-0 border-border
        transform transition-transform duration-300 ease-in-out z-1010 lg:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        lg:block
      `}>
        <div className="h-full lg:h-auto overflow-y-auto scrollbar-thin">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="text-text-secondary hover:text-text-primary"
            />
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={20} className="text-primary" />
                <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="text-text-secondary hover:text-text-primary text-sm"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>

          <div className="p-4 lg:p-0 space-y-6">
            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary flex items-center space-x-2">
                <Icon name="Grid3X3" size={16} />
                <span>Category</span>
              </h3>
              <select
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:border-primary focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary flex items-center space-x-2">
                <Icon name="Star" size={16} />
                <span>Minimum Rating</span>
              </h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={localFilters.minRating}
                  onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>0 stars</span>
                  <span className="text-text-primary font-medium">
                    {localFilters.minRating}+ stars
                  </span>
                  <span>5 stars</span>
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary flex items-center space-x-2">
                <Icon name="DollarSign" size={16} />
                <span>Price Range</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Min Price</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={localFilters.priceRange.min || ''}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Max Price</label>
                  <Input
                    type="number"
                    placeholder="∞"
                    value={localFilters.priceRange.max || ''}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Type Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary flex items-center space-x-2">
                <Icon name="CreditCard" size={16} />
                <span>Pricing Type</span>
              </h3>
              <select
                value={localFilters.pricingType}
                onChange={(e) => handleFilterChange('pricingType', e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:border-primary focus:outline-none"
              >
                {pricingTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Most Viewed Filter */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.mostViewed}
                  onChange={(e) => handleFilterChange('mostViewed', e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <div className="flex items-center space-x-2">
                  <Icon name="Eye" size={16} />
                  <span className="font-medium text-text-primary">Most Viewed</span>
                </div>
              </label>
            </div>

            {/* Minimum Reviews Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary flex items-center space-x-2">
                <Icon name="MessageSquare" size={16} />
                <span>Minimum Reviews</span>
              </h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={localFilters.minReviews}
                  onChange={(e) => handleFilterChange('minReviews', parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>0 reviews</span>
                  <span className="text-text-primary font-medium">
                    {localFilters.minReviews}+ reviews
                  </span>
                  <span>100+ reviews</span>
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden pt-6 border-t border-border">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  fullWidth
                  disabled={activeFiltersCount === 0}
                >
                  Clear All
                </Button>
                <Button
                  variant="primary"
                  onClick={onClose}
                  fullWidth
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
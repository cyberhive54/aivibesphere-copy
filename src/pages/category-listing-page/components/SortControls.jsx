import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, onSortChange, resultsCount, isLoading }) => {
  const sortOptions = [
    { value: 'name-asc', label: 'Name A-Z', icon: 'ArrowUp' },
    { value: 'name-desc', label: 'Name Z-A', icon: 'ArrowDown' },
    { value: 'recent', label: 'Recently Added', icon: 'Clock' },
    { value: 'rating-desc', label: 'Highest Rated', icon: 'Star' },
    { value: 'rating-asc', label: 'Lowest Rated', icon: 'Star' },
    { value: 'views-desc', label: 'Most Viewed', icon: 'Eye' },
    { value: 'reviews-desc', label: 'Most Reviewed', icon: 'MessageSquare' }
  ];

  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <Icon name="Search" size={16} className="text-text-secondary" />
        <span className="text-text-secondary">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <>
              {resultsCount.toLocaleString()} tool{resultsCount !== 1 ? 's' : ''} found
            </>
          )}
        </span>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-text-secondary hidden sm:block">Sort by:</span>
        
        {/* Desktop Tabs */}
        <div className="hidden lg:flex items-center space-x-1 bg-surface rounded-lg p-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium smooth-transition ${
                sortBy === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile/Tablet Dropdown */}
        <div className="lg:hidden relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-surface border border-border rounded-lg px-4 py-2 pr-10 text-text-primary focus:border-primary focus:outline-none min-w-[180px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
          />
        </div>

        {/* View Toggle (Future Enhancement) */}
        <div className="hidden sm:flex items-center space-x-1 bg-surface rounded-lg p-1">
          <Button
            variant="ghost"
            iconName="Grid3X3"
            className="text-text-secondary hover:text-text-primary p-2"
            title="Grid View"
          />
          <Button
            variant="ghost"
            iconName="List"
            className="text-text-secondary hover:text-text-primary p-2"
            title="List View"
          />
        </div>
      </div>
    </div>
  );
};

export default SortControls;
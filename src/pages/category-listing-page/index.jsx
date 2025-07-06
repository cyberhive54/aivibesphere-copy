import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComparisonCart from '../../components/ui/ComparisonCart';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ActiveFilters from './components/ActiveFilters';
import ToolGrid from './components/ToolGrid';
import BannerAd from './components/BannerAd';
import Button from '../../components/ui/Button';
import toolsService from '../../utils/toolsService';
import { ALL_CATEGORIES, findCategoryBySlug, getCategoryDisplayName } from '../../utils/categories';

const CategoryListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and sort state - use slug for category filter
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minRating: parseFloat(searchParams.get('minRating')) || 0,
    priceRange: {
      min: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')) : null,
      max: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')) : null
    },
    mostViewed: searchParams.get('mostViewed') === 'true',
    minReviews: parseInt(searchParams.get('minReviews')) || 0,
    pricingType: searchParams.get('pricingType') || ''
  });
  
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recent');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Load tools from database
  useEffect(() => {
    let isMounted = true;

    const loadTools = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Build filters for API call
        const apiFilters = {};
        
        if (filters.category) {
          // Ensure we're using the correct database enum value
          const categoryObj = findCategoryBySlug(filters.category);
          if (categoryObj) {
            apiFilters.category = categoryObj.slug;
          } else {
            // If category not found in our mapping, try to use it as-is
            apiFilters.category = filters.category;
          }
        }
        
        if (searchQuery) {
          apiFilters.search = searchQuery;
        }
        
        if (filters.minRating > 0) {
          apiFilters.minRating = filters.minRating;
        }

        // Set sorting
        let sortKey = 'created_at';
        switch (sortBy) {
          case 'name-asc':
          case 'name-desc':
            sortKey = 'name';
            break;
          case 'rating-desc':
          case 'rating-asc':
            sortKey = 'rating';
            break;
          case 'views-desc':
            sortKey = 'views';
            break;
          case 'reviews-desc':
            sortKey = 'reviews';
            break;
          default:
            sortKey = 'newest';
        }
        
        apiFilters.sortBy = sortKey;
        apiFilters.limit = 50; // Load more tools

        const result = await toolsService.getTools(apiFilters);

        if (result.success && isMounted) {
          setTools(result.data || []);
        } else if (isMounted) {
          setError(result.error || 'Failed to load tools');
          setTools([]);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load tools');
          setTools([]);
          console.error('Error loading tools:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTools();

    return () => {
      isMounted = false;
    };
  }, [filters.category, searchQuery, filters.minRating, sortBy]);

  // Apply client-side filtering (for filters not supported by API)
  useEffect(() => {
    let filtered = [...tools];

    // Apply price range filter
    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      filtered = filtered.filter(tool => {
        // Extract price from price_info string or assume 0 for free
        let price = 0;
        if (tool.price_info && tool.pricing_type !== 'free') {
          const priceMatch = tool.price_info.match(/\$(\d+)/);
          if (priceMatch) {
            price = parseInt(priceMatch[1]);
          }
        }
        
        const min = filters.priceRange.min || 0;
        const max = filters.priceRange.max || Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply pricing type filter
    if (filters.pricingType) {
      filtered = filtered.filter(tool => tool.pricing_type === filters.pricingType);
    }

    // Apply most viewed filter
    if (filters.mostViewed) {
      filtered = filtered.filter(tool => (tool.view_count || 0) > 50000);
    }

    // Apply minimum reviews filter
    if (filters.minReviews > 0) {
      filtered = filtered.filter(tool => (tool.rating_count || 0) >= filters.minReviews);
    }

    // Apply client-side sorting for cases not handled by API
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-asc':
        filtered.sort((a, b) => (a.average_rating || 0) - (b.average_rating || 0));
        break;
      case 'reviews-desc':
        filtered.sort((a, b) => (b.rating_count || 0) - (a.rating_count || 0));
        break;
      case 'views-desc':
        filtered.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        break;
      // API handles: recent, rating-desc by default
    }

    setFilteredTools(filtered);
    setHasMore(false); // Disable pagination for now since we load all tools
  }, [tools, filters, sortBy]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (filters.category) params.set('category', filters.category);
    if (filters.minRating > 0) params.set('minRating', filters.minRating.toString());
    if (filters.priceRange.min !== null) params.set('minPrice', filters.priceRange.min.toString());
    if (filters.priceRange.max !== null) params.set('maxPrice', filters.priceRange.max.toString());
    if (filters.pricingType) params.set('pricingType', filters.pricingType);
    if (filters.mostViewed) params.set('mostViewed', 'true');
    if (filters.minReviews > 0) params.set('minReviews', filters.minReviews.toString());
    if (sortBy !== 'recent') params.set('sort', sortBy);

    setSearchParams(params);
  }, [filters, sortBy, searchQuery, setSearchParams]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  }, []);

  const handleRemoveFilter = useCallback((filterKey) => {
    const newFilters = { ...filters };
    
    switch (filterKey) {
      case 'category':
        newFilters.category = '';
        break;
      case 'minRating':
        newFilters.minRating = 0;
        break;
      case 'priceRange':
        newFilters.priceRange = { min: null, max: null };
        break;
      case 'pricingType':
        newFilters.pricingType = '';
        break;
      case 'mostViewed':
        newFilters.mostViewed = false;
        break;
      case 'minReviews':
        newFilters.minReviews = 0;
        break;
      default:
        break;
    }
    
    setFilters(newFilters);
  }, [filters]);

  const handleClearAllFilters = useCallback(() => {
    setFilters({
      category: '',
      minRating: 0,
      priceRange: { min: null, max: null },
      mostViewed: false,
      minReviews: 0,
      pricingType: ''
    });
    setSearchQuery('');
  }, []);

  const handleViewTool = useCallback((toolId) => {
    // Increment view count
    toolsService.incrementViewCount(toolId);
    
    // Update local state optimistically
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === toolId
          ? { ...tool, view_count: (tool.view_count || 0) + 1 }
          : tool
      )
    );
  }, []);

  const handleLoadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1);
    // In a real app with pagination, this would load more data
    setHasMore(false);
  }, []);

  // Calculate active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.minRating > 0) count++;
    if (filters.priceRange.min !== null || filters.priceRange.max !== null) count++;
    if (filters.pricingType) count++;
    if (filters.mostViewed) count++;
    if (filters.minReviews > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Categories', path: '/category-listing-page', icon: 'Grid3X3', isLast: true }
  ];

  // Error state
  if (error && !isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Failed to Load Tools</h3>
              <p className="text-text-secondary mb-4">{error}</p>
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb customItems={breadcrumbItems} />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  AI Tools Directory
                </h1>
                <p className="text-text-secondary">
                  Discover and compare the best AI tools for your needs
                </p>
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterPanelOpen(true)}
                  iconName="Filter"
                  className="w-full sm:w-auto"
                >
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Banner Ad */}
          <div className="mb-8">
            <BannerAd size="large" />
          </div>

          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  categories={ALL_CATEGORIES}
                  activeFiltersCount={activeFiltersCount}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Active Filters */}
              <ActiveFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
                categories={ALL_CATEGORIES}
              />

              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={handleSortChange}
                resultsCount={filteredTools.length}
                isLoading={isLoading}
              />

              {/* Tools Grid */}
              <ToolGrid
                tools={filteredTools}
                isLoading={isLoading}
                onViewTool={handleViewTool}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        categories={ALL_CATEGORIES}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Comparison Cart */}
      <ComparisonCart />
    </div>
  );
};

export default CategoryListingPage;
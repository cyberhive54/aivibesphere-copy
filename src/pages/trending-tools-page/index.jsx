import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComparisonCart from '../../components/ui/ComparisonCart';
import ToolGrid from '../category-listing-page/components/ToolGrid';
import SortControls from '../category-listing-page/components/SortControls';
import Icon from '../../components/AppIcon';
import toolsService from '../../utils/toolsService';

const TrendingToolsPage = () => {
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('views-desc');

  useEffect(() => {
    loadTrendingTools();
  }, [sortBy]);

  const loadTrendingTools = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await toolsService.getTrendingTools(50);
      
      if (result.success) {
        let sortedTools = result.data || [];
        
        // Apply client-side sorting
        switch (sortBy) {
          case 'name-asc':
            sortedTools.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-desc':
            sortedTools.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'rating-desc':
            sortedTools.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
            break;
          case 'rating-asc':
            sortedTools.sort((a, b) => (a.average_rating || 0) - (b.average_rating || 0));
            break;
          case 'recent':
            sortedTools.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
          default: // views-desc
            sortedTools.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        }
        
        setTools(sortedTools);
      } else {
        setError(result.error || 'Failed to load trending tools');
      }
    } catch (err) {
      setError('Failed to load trending tools');
      console.error('Error loading trending tools:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewTool = (toolId) => {
    toolsService.incrementViewCount(toolId);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Trending Tools', path: '/trending-tools-page', icon: 'TrendingUp', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">🔥 Trending AI Tools</h1>
                <p className="text-text-secondary">
                  Discover the hottest AI tools that are making waves in the community
                </p>
              </div>
            </div>
          </div>

          {/* Sort Controls */}
          <SortControls
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultsCount={tools.length}
            isLoading={isLoading}
          />

          {/* Tools Grid */}
          <ToolGrid
            tools={tools}
            isLoading={isLoading}
            onViewTool={handleViewTool}
            hasMore={false}
            onLoadMore={() => {}}
          />

          {error && (
            <div className="text-center py-16">
              <Icon name="AlertCircle" size={64} className="text-error mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Error Loading Trending Tools
              </h3>
              <p className="text-text-secondary mb-6">{error}</p>
              <button
                onClick={loadTrendingTools}
                className="text-primary hover:text-primary/80 smooth-transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>

      <ComparisonCart />
    </div>
  );
};

export default TrendingToolsPage;
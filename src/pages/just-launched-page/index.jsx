import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComparisonCart from '../../components/ui/ComparisonCart';
import ToolGrid from '../category-listing-page/components/ToolGrid';
import SortControls from '../category-listing-page/components/SortControls';
import Icon from '../../components/AppIcon';
import toolsService from '../../utils/toolsService';

const JustLaunchedPage = () => {
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    loadJustLaunchedTools();
  }, [sortBy]);

  const loadJustLaunchedTools = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await toolsService.getJustLaunchedTools(50);
      
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
          case 'views-desc':
            sortedTools.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
            break;
          default: // recent
            sortedTools.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
        
        setTools(sortedTools);
      } else {
        setError(result.error || 'Failed to load just launched tools');
      }
    } catch (err) {
      setError('Failed to load just launched tools');
      console.error('Error loading just launched tools:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewTool = (toolId) => {
    toolsService.incrementViewCount(toolId);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Just Launched', path: '/just-launched-page', icon: 'Rocket', isLast: true }
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
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Icon name="Rocket" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">🚀 Just Launched</h1>
                <p className="text-text-secondary">
                  Fresh AI tools that just hit the market - be among the first to try them
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
                Error Loading Just Launched Tools
              </h3>
              <p className="text-text-secondary mb-6">{error}</p>
              <button
                onClick={loadJustLaunchedTools}
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

export default JustLaunchedPage;
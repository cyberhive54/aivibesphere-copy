import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComparisonCart from '../../components/ui/ComparisonCart';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';
import BannerAd from '../category-listing-page/components/BannerAd';
import toolsService from '../../utils/toolsService';
import { ALL_CATEGORIES, getCategoryDisplayName } from '../../utils/categories';

const ToolDirectoryPage = () => {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const TOOLS_PER_PAGE = 50;

  useEffect(() => {
    loadTools();
  }, []);

  useEffect(() => {
    filterTools();
  }, [tools, searchQuery]);

  const loadTools = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await toolsService.getTools({ 
        limit: 500, // Load more tools for directory
        sortBy: 'name'
      });
      
      if (result.success) {
        setTools(result.data || []);
        setHasMore(false); // For now, load all at once
      } else {
        setError(result.error || 'Failed to load tools');
      }
    } catch (err) {
      setError('Failed to load tools');
      console.error('Error loading tools:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTools = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredTools(tools);
      return;
    }

    const filtered = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredTools(filtered);
    setCurrentPage(1);
  }, [tools, searchQuery]);

  const handleViewTool = (toolId) => {
    toolsService.incrementViewCount(toolId);
  };

  const getCurrentPageTools = () => {
    const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
    const endIndex = startIndex + TOOLS_PER_PAGE;
    return filteredTools.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE);

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Tool Directory', path: '/tool-directory-page', icon: 'Book', isLast: true }
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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Icon name="Book" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">📚 AI Tools Directory</h1>
                <p className="text-text-secondary">
                  Complete directory of all AI tools with infinite scrolling
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Input
                type="search"
                placeholder="Search tools by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
            </div>
            {searchQuery && (
              <p className="text-text-secondary text-sm mt-2">
                {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Banner Ad */}
          <div className="mb-8">
            <BannerAd size="large" />
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="neumorphic-card p-4 animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-surface rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-surface rounded mb-2"></div>
                      <div className="h-3 bg-surface rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <Icon name="AlertCircle" size={64} className="text-error mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Error Loading Directory
              </h3>
              <p className="text-text-secondary mb-6">{error}</p>
              <Button
                variant="primary"
                onClick={loadTools}
                iconName="RefreshCw"
              >
                Try Again
              </Button>
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Search" size={48} className="text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No Tools Found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search terms or browse all categories.
              </p>
              <Button
                variant="primary"
                onClick={() => setSearchQuery('')}
                iconName="RotateCcw"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <>
              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {getCurrentPageTools().map((tool, index) => (
                  <React.Fragment key={tool.id}>
                    <div 
                      className="neumorphic-card p-4 hover:shadow-elevated smooth-transition cursor-pointer group"
                      onClick={() => {
                        handleViewTool(tool.id);
                        window.location.href = `/tool-detail-page?id=${tool.id}`;
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                          <Image
                            src={tool.logo_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=48&h=48&fit=crop'}
                            alt={`${tool.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-text-primary group-hover:text-primary smooth-transition truncate">
                            {tool.name}
                          </h3>
                          <p className="text-text-secondary text-sm truncate">
                            {getCategoryDisplayName(tool.category)}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={12} className="text-yellow-400" />
                              <span className="text-xs text-text-secondary">
                                {tool.average_rating ? tool.average_rating.toFixed(1) : '0.0'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Eye" size={12} className="text-text-secondary" />
                              <span className="text-xs text-text-secondary">
                                {tool.view_count || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insert banner ad every 30 tools */}
                    {(index + 1) % 30 === 0 && index < getCurrentPageTools().length - 1 && (
                      <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 my-4">
                        <BannerAd size="medium" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    iconName="ChevronLeft"
                  >
                    Previous
                  </Button>
                  
                  <span className="text-text-secondary">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <ComparisonCart />
    </div>
  );
};

export default ToolDirectoryPage;
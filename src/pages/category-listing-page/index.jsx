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
  
  // Filter and sort state
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

  // Mock data
  const categories = [
    { id: 1, name: 'Content Creation', slug: 'content-creation' },
    { id: 2, name: 'Data Analysis', slug: 'data-analysis' },
    { id: 3, name: 'Image Generation', slug: 'image-generation' },
    { id: 4, name: 'Code Assistant', slug: 'code-assistant' },
    { id: 5, name: 'Marketing', slug: 'marketing' },
    { id: 6, name: 'Customer Service', slug: 'customer-service' },
    { id: 7, name: 'Productivity', slug: 'productivity' },
    { id: 8, name: 'Design', slug: 'design' },
    { id: 9, name: 'Video Editing', slug: 'video-editing' },
    { id: 10, name: 'Voice & Audio', slug: 'voice-audio' }
  ];

  const mockTools = [
    {
      id: 1,
      name: "GPT-4 Turbo",
      description: "Advanced language model for content creation, coding, and complex reasoning tasks with improved accuracy and speed.",
      category: "Content Creation",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 2847,
      viewCount: 125430,
      pricing: { type: 'paid', startingPrice: 20, billingCycle: 'month' },
      features: ["Natural Language Processing", "Code Generation", "Multi-language Support", "API Integration"],
      websiteUrl: "https://openai.com/gpt-4",
      isNew: true,
      dateAdded: new Date('2024-01-15')
    },
    {
      id: 2,
      name: "Midjourney",
      description: "AI-powered image generation tool that creates stunning artwork and designs from text prompts with artistic flair.",
      category: "Image Generation",
      logo: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 1923,
      viewCount: 98765,
      pricing: { type: 'subscription', startingPrice: 10, billingCycle: 'month' },
      features: ["Text-to-Image", "Style Transfer", "High Resolution", "Commercial License"],
      websiteUrl: "https://midjourney.com",
      isNew: false,
      dateAdded: new Date('2023-12-20')
    },
    {
      id: 3,
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write code faster with intelligent suggestions and auto-completion.",
      category: "Code Assistant",
      logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 3456,
      viewCount: 156789,
      pricing: { type: 'subscription', startingPrice: 10, billingCycle: 'month' },
      features: ["Code Completion", "Multi-language Support", "IDE Integration", "Context Awareness"],
      websiteUrl: "https://github.com/features/copilot",
      isNew: false,
      dateAdded: new Date('2023-11-10')
    },
    {
      id: 4,
      name: "Tableau AI",
      description: "Advanced data visualization and analytics platform with AI-powered insights and automated chart generation.",
      category: "Data Analysis",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 1567,
      viewCount: 87432,
      pricing: { type: 'subscription', startingPrice: 75, billingCycle: 'month' },
      features: ["Data Visualization", "Predictive Analytics", "Dashboard Creation", "Real-time Updates"],
      websiteUrl: "https://tableau.com",
      isNew: false,
      dateAdded: new Date('2023-10-25')
    },
    {
      id: 5,
      name: "Jasper AI",
      description: "AI writing assistant that helps create high-quality content for blogs, ads, emails, and social media posts.",
      category: "Content Creation",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 2134,
      viewCount: 76543,
      pricing: { type: 'subscription', startingPrice: 29, billingCycle: 'month' },
      features: ["Content Generation", "SEO Optimization", "Brand Voice", "Plagiarism Checker"],
      websiteUrl: "https://jasper.ai",
      isNew: false,
      dateAdded: new Date('2023-09-15')
    },
    {
      id: 6,
      name: "Canva AI",
      description: "Design platform with AI-powered features for creating professional graphics, presentations, and marketing materials.",
      category: "Design",
      logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 4321,
      viewCount: 234567,
      pricing: { type: 'freemium', startingPrice: 15, billingCycle: 'month' },
      features: ["Template Library", "AI Design Assistant", "Brand Kit", "Collaboration Tools"],
      websiteUrl: "https://canva.com",
      isNew: false,
      dateAdded: new Date('2023-08-30')
    },
    {
      id: 7,
      name: "HubSpot AI",
      description: "Marketing automation platform with AI-powered lead scoring, email optimization, and customer insights.",
      category: "Marketing",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.2,
      reviewCount: 1876,
      viewCount: 65432,
      pricing: { type: 'freemium', startingPrice: 50, billingCycle: 'month' },
      features: ["Lead Scoring", "Email Automation", "CRM Integration", "Analytics Dashboard"],
      websiteUrl: "https://hubspot.com",
      isNew: false,
      dateAdded: new Date('2023-07-20')
    },
    {
      id: 8,
      name: "Zendesk AI",
      description: "Customer service platform with AI chatbots, sentiment analysis, and automated ticket routing.",
      category: "Customer Service",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      rating: 4.1,
      reviewCount: 987,
      viewCount: 45678,
      pricing: { type: 'subscription', startingPrice: 19, billingCycle: 'month' },
      features: ["AI Chatbots", "Sentiment Analysis", "Ticket Routing", "Knowledge Base"],
      websiteUrl: "https://zendesk.com",
      isNew: false,
      dateAdded: new Date('2023-06-10')
    },
    {
      id: 9,
      name: "Notion AI",
      description: "All-in-one workspace with AI writing assistant, content generation, and intelligent organization features.",
      category: "Productivity",
      logo: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 3210,
      viewCount: 123456,
      pricing: { type: 'freemium', startingPrice: 8, billingCycle: 'month' },
      features: ["AI Writing", "Database Management", "Template Library", "Team Collaboration"],
      websiteUrl: "https://notion.so",
      isNew: true,
      dateAdded: new Date('2024-01-05')
    },
    {
      id: 10,
      name: "RunwayML",
      description: "AI-powered video editing platform with advanced effects, background removal, and content generation.",
      category: "Video Editing",
      logo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 1543,
      viewCount: 67890,
      pricing: { type: 'subscription', startingPrice: 15, billingCycle: 'month' },
      features: ["AI Video Effects", "Background Removal", "Motion Tracking", "Real-time Processing"],
      websiteUrl: "https://runwayml.com",
      isNew: false,
      dateAdded: new Date('2023-05-15')
    },
    {
      id: 11,
      name: "ElevenLabs",
      description: "Advanced AI voice synthesis and cloning platform for creating realistic speech from text input.",
      category: "Voice & Audio",
      logo: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 876,
      viewCount: 54321,
      pricing: { type: 'freemium', startingPrice: 5, billingCycle: 'month' },
      features: ["Voice Cloning", "Text-to-Speech", "Multi-language", "API Access"],
      websiteUrl: "https://elevenlabs.io",
      isNew: true,
      dateAdded: new Date('2024-01-20')
    },
    {
      id: 12,
      name: "Grammarly AI",
      description: "Writing assistant with advanced grammar checking, style suggestions, and tone detection powered by AI.",
      category: "Content Creation",
      logo: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 5432,
      viewCount: 198765,
      pricing: { type: 'freemium', startingPrice: 12, billingCycle: 'month' },
      features: ["Grammar Check", "Style Suggestions", "Tone Detection", "Plagiarism Detection"],
      websiteUrl: "https://grammarly.com",
      isNew: false,
      dateAdded: new Date('2023-04-10')
    }
  ];

  // Initialize tools data
  useEffect(() => {
    const loadTools = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTools(mockTools);
      setIsLoading(false);
    };

    loadTools();
  }, []);

  // Filter and sort tools
  useEffect(() => {
    let filtered = [...tools];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(tool =>
        tool.category.toLowerCase().replace(/\s+/g, '-') === filters.category
      );
    }

    // Apply rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(tool => tool.rating >= filters.minRating);
    }

    // Apply price range filter
    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      filtered = filtered.filter(tool => {
        const price = tool.pricing?.startingPrice || 0;
        const min = filters.priceRange.min || 0;
        const max = filters.priceRange.max || Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply pricing type filter
    if (filters.pricingType) {
      filtered = filtered.filter(tool => tool.pricing?.type === filters.pricingType);
    }

    // Apply most viewed filter
    if (filters.mostViewed) {
      filtered = filtered.filter(tool => tool.viewCount > 50000);
    }

    // Apply minimum reviews filter
    if (filters.minReviews > 0) {
      filtered = filtered.filter(tool => tool.reviewCount >= filters.minReviews);
    }

    // Apply sorting
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-asc':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'views-desc':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'reviews-desc':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
    }

    setFilteredTools(filtered);
  }, [tools, filters, sortBy, searchQuery]);

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
    // Simulate view count increment
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === toolId
          ? { ...tool, viewCount: tool.viewCount + 1 }
          : tool
      )
    );
  }, []);

  const handleLoadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1);
    // In a real app, this would load more data
    // For now, we'll just simulate it
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
                  categories={categories}
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
                categories={categories}
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
        categories={categories}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Comparison Cart */}
      <ComparisonCart />
    </div>
  );
};

export default CategoryListingPage;
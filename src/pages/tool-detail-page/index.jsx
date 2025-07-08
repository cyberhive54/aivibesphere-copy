import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComparisonCart, { useComparison } from '../../components/ui/ComparisonCart';
import ToolHero from './components/ToolHero';
import ToolTabs from './components/ToolTabs';
import RatingSystem from './components/RatingSystem';
import RelatedTools from './components/RelatedTools';
import AdBanner from './components/AdBanner';
import Icon from '../../components/AppIcon';
import toolsService from '../../utils/toolsService';
import ratingsService from '../../utils/ratingsService';
import favoritesService from '../../utils/favoritesService';
import { useAuth } from '../../contexts/AuthContext';

const ToolDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toolId = searchParams.get('id') || searchParams.get('tool') || '1';
  
  const [tool, setTool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);
  const [error, setError] = useState(null);
  
  const { addToComparison, isInComparison } = useComparison();
  const { user, userProfile } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    let isMounted = true;

    const loadToolData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load tool details
        const toolResult = await toolsService.getTool(toolId);
        
        if (!toolResult.success) {
          if (isMounted) {
            setError(toolResult.error || 'Tool not found');
          }
          return;
        }

        if (isMounted) {
          const toolData = toolResult.data;
          setTool(toolData);

          // Load related tools
          if (toolData.category) {
            const relatedResult = await toolsService.getRelatedTools(toolData.id, toolData.category, 4);
            if (relatedResult.success) {
              setRelatedTools(relatedResult.data || []);
            }
          }

          // Load user rating if authenticated
          if (user?.id) {
            const ratingResult = await ratingsService.getUserRating(user.id, toolData.id);
            if (ratingResult.success && ratingResult.data) {
              setUserRating(ratingResult.data.rating);
            }
          }

          // Increment view count with debouncing
          incrementViewCount(toolData.id);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load tool details');
          console.error('Error loading tool:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadToolData();

    return () => {
      isMounted = false;
    };
  }, [toolId, user?.id]);

  useEffect(() => {
    // Check if tool is bookmarked
    if (user?.id && tool?.id) {
      const checkFavoriteStatus = async () => {
        const result = await favoritesService.isToolFavorited(user.id, tool.id);
        if (result.success) {
          setIsBookmarked(result.isFavorited);
        }
      };
      checkFavoriteStatus();
    }
  }, [toolId, user?.id, tool?.id]);

  const incrementViewCount = (id) => {
    // Debounced view count increment
    const viewKey = `viewed-${id}`;
    const lastViewed = localStorage.getItem(viewKey);
    const now = Date.now();
    
    if (!lastViewed || now - parseInt(lastViewed) > 60000) { // 1 minute debounce
      localStorage.setItem(viewKey, now.toString());
      toolsService.incrementViewCount(id);
    }
  };

  const handleBookmark = () => {
    if (!user) {
      alert('Please sign in to save tools');
      return;
    }
    
    const toggleFavorite = async () => {
      try {
        const result = await favoritesService.toggleFavorite(user.id, tool.id);
        if (result.success) {
          setIsBookmarked(!isBookmarked);
        } else {
          console.error('Failed to toggle favorite:', result.error);
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    };
    
    toggleFavorite();
  };

  const handleAddToComparison = () => {
    if (!tool) return;
    
    const result = addToComparison({
      id: tool.id,
      name: tool.name,
      logo: tool.logo_url,
      rating: tool.average_rating,
      category: tool.category,
      description: tool.description
    });
    
    if (result.success) {
      console.log('Added to comparison successfully');
    } else {
      console.log(result.message);
    }
  };

  const handleSubmitRating = async (ratingData) => {
    if (!user?.id || !tool?.id) return;

    try {
      const result = await ratingsService.submitRating(
        user.id,
        tool.id,
        ratingData.rating,
        ratingData.comment
      );

      if (result.success) {
        setUserRating(ratingData.rating);
        
        // Update tool rating optimistically
        setTool(prev => ({
          ...prev,
          average_rating: ((prev.average_rating || 0) * (prev.rating_count || 0) + ratingData.rating) / ((prev.rating_count || 0) + 1),
          rating_count: (prev.rating_count || 0) + 1
        }));
      } else {
        throw new Error(result.error || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  };

  // Transform database tool data to component-expected format
  const getTransformedTool = () => {
    if (!tool) return null;

    return {
      ...tool,
      categories: [tool.category],
      rating: tool.average_rating || 0,
      reviewCount: tool.rating_count || 0,
      viewCount: tool.view_count || 0,
      dateAdded: tool.created_at ? new Date(tool.created_at).toLocaleDateString() : 'Unknown',
      shortDescription: tool.description,
      fullDescription: tool.description,
      additionalInfo: `${tool.name} is a powerful ${tool.category} tool that helps users achieve their goals with advanced features and intuitive design.`,
      logo: tool.logo_url,
      websiteUrl: tool.referral_url,
      useCases: [
        {
          title: 'Professional Use',
          description: `Perfect for professionals working in ${tool.category} who need reliable and efficient tools.`
        },
        {
          title: 'Team Collaboration',
          description: 'Ideal for teams looking to streamline their workflow and improve productivity.'
        },
        {
          title: 'Small Business',
          description: 'Great solution for small businesses seeking cost-effective tools.'
        },
        {
          title: 'Enterprise',
          description: 'Scalable solution suitable for large organizations with complex requirements.'
        }
      ],
      features: (tool.features || []).map(feature => ({
        name: feature,
        description: `Advanced ${feature.toLowerCase()} capabilities`
      })),
      platforms: ['Web Browser', 'API', 'Mobile App'],
      integrations: ['Slack', 'Discord', 'Zapier', 'API'],
      pricing: {
        type: tool.pricing_type || 'freemium',
        tiers: [
          {
            name: 'Free',
            price: 0,
            period: null,
            description: 'Basic features for getting started',
            features: ['Basic functionality', 'Limited usage', 'Community support'],
            cta: 'Get Started Free',
            popular: false
          },
          {
            name: 'Pro',
            price: tool.pricing_type === 'paid' ? 29 : 19,
            period: 'month',
            description: 'Full features for professionals',
            features: ['All features', 'Unlimited usage', 'Priority support', 'Advanced analytics'],
            cta: 'Upgrade to Pro',
            popular: true
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            period: null,
            description: 'Custom solutions for large teams',
            features: ['Custom integrations', 'Dedicated support', 'SLA guarantees', 'Advanced security'],
            cta: 'Contact Sales',
            popular: false
          }
        ],
        notes: [
          'All plans include basic features',
          'No setup fees or hidden costs',
          'Cancel anytime with full refund policy',
          'Volume discounts available for teams'
        ]
      },
      reviews: [
        {
          userName: 'Demo User',
          rating: 5,
          date: '1 week ago',
          comment: `${tool.name} has been incredibly helpful for my ${tool.category} needs. Highly recommended!`,
          helpfulCount: 12
        },
        {
          userName: 'Professional User',
          rating: 4,
          date: '2 weeks ago',
          comment: 'Great tool with excellent features. The interface could be improved but overall very satisfied.',
          helpfulCount: 8
        }
      ],
      ratingDistribution: {
        5: Math.floor((tool.rating_count || 0) * 0.6),
        4: Math.floor((tool.rating_count || 0) * 0.25),
        3: Math.floor((tool.rating_count || 0) * 0.1),
        2: Math.floor((tool.rating_count || 0) * 0.03),
        1: Math.floor((tool.rating_count || 0) * 0.02)
      }
    };
  };

  const transformedTool = getTransformedTool();

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Tools', path: '/category-listing-page', icon: 'Grid3X3' },
    { label: transformedTool?.name || 'Tool Details', path: null, icon: 'Info', isLast: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Loading Skeleton */}
            <div className="animate-pulse">
              <div className="h-4 bg-surface rounded w-64 mb-6"></div>
              <div className="neumorphic-card p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-surface rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-8 bg-surface rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-surface rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-surface rounded w-full mb-4"></div>
                    <div className="h-4 bg-surface rounded w-2/3"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-96 bg-surface rounded-lg"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-64 bg-surface rounded-lg"></div>
                  <div className="h-48 bg-surface rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !transformedTool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <Icon name="AlertCircle" size={64} className="text-text-muted mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-text-primary mb-2">Tool Not Found</h1>
              <p className="text-text-secondary mb-6">
                {error || "The tool you're looking for doesn't exist or has been removed."}
              </p>
              <button
                onClick={() => navigate('/category-listing-page')}
                className="text-primary hover:text-primary/80 smooth-transition"
              >
                Browse All Tools →
              </button>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Banner Ad */}
          <AdBanner placement="banner" className="mb-8" />
          
          {/* Tool Hero Section */}
          <ToolHero
            tool={transformedTool}
            onBookmark={handleBookmark}
            isBookmarked={isBookmarked}
            onAddToComparison={handleAddToComparison}
            isInComparison={isInComparison(transformedTool.id)}
          />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tool Tabs */}
              <ToolTabs tool={transformedTool} />
              
              {/* Rating System */}
              <RatingSystem
                tool={transformedTool}
                onSubmitRating={handleSubmitRating}
                userRating={userRating}
                isAuthenticated={isAuthenticated}
              />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Related Tools */}
              <RelatedTools
                tools={relatedTools.map(relatedTool => ({
                  ...relatedTool,
                  logo: relatedTool.logo_url,
                  shortDescription: relatedTool.description,
                  rating: relatedTool.average_rating || 0,
                  viewCount: relatedTool.view_count || 0
                }))}
                currentToolId={transformedTool.id}
              />
              
              {/* Sidebar Ads */}
              <AdBanner placement="sidebar" />
            </div>
          </div>
        </div>
      </main>
      
      {/* Comparison Cart */}
      <ComparisonCart />
    </div>
  );
};

export default ToolDetailPage;
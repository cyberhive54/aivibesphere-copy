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

const ToolDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toolId = searchParams.get('id') || '1';
  
  const [tool, setTool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [relatedTools, setRelatedTools] = useState([]);
  
  const { addToComparison, isInComparison } = useComparison();

  // Mock data for the tool
  const mockTool = {
    id: toolId,
    name: "ChatGPT",
    shortDescription: "Advanced AI chatbot powered by GPT-4 for natural language conversations, content creation, and problem-solving across multiple domains.",
    fullDescription: `ChatGPT is a state-of-the-art conversational AI developed by OpenAI, built on the GPT-4 architecture. It represents a significant leap forward in natural language processing, offering human-like conversations and comprehensive assistance across a wide range of topics and tasks.

The model has been trained on diverse internet text and fine-tuned through reinforcement learning from human feedback (RLHF), making it remarkably capable of understanding context, maintaining coherent conversations, and providing helpful, accurate responses.`,
    additionalInfo: `What sets ChatGPT apart is its ability to understand nuanced requests, maintain context throughout long conversations, and adapt its communication style to match user preferences. Whether you're a student seeking homework help, a professional drafting emails, or a creative writer looking for inspiration, ChatGPT provides tailored assistance that feels natural and intuitive.

The platform continues to evolve with regular updates, new features, and improved capabilities, making it an indispensable tool for millions of users worldwide.`,
    logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop",
    categories: ["Conversational AI", "Content Creation", "Productivity"],
    rating: 4.7,
    reviewCount: 15420,
    viewCount: 2847392,
    dateAdded: "March 2023",
    ratingDistribution: {
      5: 9250,
      4: 4120,
      3: 1580,
      2: 320,
      1: 150
    },
    features: [
      {
        name: "Natural Language Processing",
        description: "Advanced understanding of human language with context awareness and nuanced responses"
      },
      {
        name: "Multi-Domain Expertise",
        description: "Knowledgeable across various fields including science, technology, arts, and humanities"
      },
      {
        name: "Code Generation",
        description: "Capable of writing, debugging, and explaining code in multiple programming languages"
      },
      {
        name: "Creative Writing",
        description: "Assists with creative tasks like storytelling, poetry, and content ideation"
      },
      {
        name: "Problem Solving",
        description: "Analytical thinking and step-by-step problem breakdown for complex queries"
      },
      {
        name: "Language Translation",
        description: "Supports translation and communication across multiple languages"
      }
    ],
    useCases: [
      {
        title: "Content Creation",
        description: "Generate articles, blog posts, marketing copy, and creative content"
      },
      {
        title: "Education & Learning",
        description: "Tutoring, homework assistance, and concept explanations"
      },
      {
        title: "Programming Help",
        description: "Code writing, debugging, and technical documentation"
      },
      {
        title: "Business Communication",
        description: "Email drafting, meeting summaries, and professional correspondence"
      }
    ],
    platforms: ["Web Browser", "iOS App", "Android App", "API"],
    integrations: ["Microsoft Teams", "Slack", "Discord", "Zapier", "API Integration"],
    pricing: {
      type: "freemium",
      tiers: [
        {
          name: "Free",
          price: 0,
          period: null,
          description: "Basic access to ChatGPT with standard response times",
          features: [
            "Access to GPT-3.5 model",
            "Standard response speed",
            "Basic conversation history",
            "Community support"
          ],
          cta: "Get Started Free",
          popular: false
        },
        {
          name: "ChatGPT Plus",
          price: 20,
          period: "month",
          description: "Enhanced experience with GPT-4 access and priority support",
          features: [
            "Access to GPT-4 model",
            "Faster response times",
            "Priority access during peak times",
            "Extended conversation history",
            "Early access to new features",
            "Premium support"
          ],
          cta: "Upgrade to Plus",
          popular: true
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: null,
          description: "Tailored solutions for large organizations with advanced security",
          features: [
            "Custom model training",
            "Advanced security features",
            "Dedicated support team",
            "API access with higher limits",
            "Custom integrations",
            "SLA guarantees"
          ],
          cta: "Contact Sales",
          popular: false
        }
      ],
      notes: [
        "All plans include basic conversation capabilities",
        "Enterprise pricing varies based on usage and requirements",
        "Educational discounts available for students and teachers",
        "API usage billed separately based on token consumption"
      ]
    },
    reviews: [
      {
        userName: "Sarah Chen",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely game-changing for my content creation workflow. The quality of responses is consistently impressive, and it saves me hours of research and writing time.",
        helpfulCount: 24
      },
      {
        userName: "Michael Rodriguez",
        rating: 4,
        date: "1 week ago",
        comment: "Great tool for coding assistance. It helps me debug issues quickly and explains complex concepts well. Sometimes the responses can be a bit verbose, but overall very helpful.",
        helpfulCount: 18
      },
      {
        userName: "Emily Johnson",
        rating: 5,
        date: "2 weeks ago",
        comment: "As a teacher, this has revolutionized how I create lesson plans and educational materials. The ability to adapt content for different grade levels is fantastic.",
        helpfulCount: 31
      },
      {
        userName: "David Park",
        rating: 4,
        date: "3 weeks ago",
        comment: "Solid AI assistant with impressive capabilities. The free tier is quite generous, and the Plus subscription is worth it for the GPT-4 access.",
        helpfulCount: 12
      }
    ]
  };

  const mockRelatedTools = [
    {
      id: "2",
      name: "Claude",
      shortDescription: "Anthropic's AI assistant focused on helpful, harmless, and honest interactions",
      logo: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?w=100&h=100&fit=crop",
      rating: 4.5,
      viewCount: 1250000
    },
    {
      id: "3",
      name: "Jasper AI",
      shortDescription: "AI writing assistant specialized in marketing copy and content creation",
      logo: "https://images.pixabay.com/photo/2023/04/06/15/50/ai-generated-7904344_1280.jpg?w=100&h=100&fit=crop",
      rating: 4.3,
      viewCount: 890000
    },
    {
      id: "4",
      name: "Copy.ai",
      shortDescription: "AI-powered copywriting tool for marketing and sales content",
      logo: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=100&h=100&fit=crop",
      rating: 4.2,
      viewCount: 650000
    },
    {
      id: "5",
      name: "Writesonic",
      shortDescription: "AI writing platform for articles, ads, and marketing content",
      logo: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?w=100&h=100&fit=crop",
      rating: 4.1,
      viewCount: 520000
    }
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setTool(mockTool);
      setRelatedTools(mockRelatedTools);
      setIsLoading(false);
      
      // Increment view count with debouncing
      incrementViewCount(toolId);
    }, 800);

    return () => clearTimeout(timer);
  }, [toolId]);

  useEffect(() => {
    // Check if tool is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('aivibesphere-bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(toolId));
    
    // Check user authentication status
    const authStatus = localStorage.getItem('aivibesphere-auth');
    setIsAuthenticated(!!authStatus);
    
    // Check if user has rated this tool
    const userRatings = JSON.parse(localStorage.getItem('aivibesphere-ratings') || '{}');
    setUserRating(userRatings[toolId] || null);
  }, [toolId]);

  const incrementViewCount = (id) => {
    // Debounced view count increment
    const viewKey = `viewed-${id}`;
    const lastViewed = localStorage.getItem(viewKey);
    const now = Date.now();
    
    if (!lastViewed || now - parseInt(lastViewed) > 60000) { // 1 minute debounce
      localStorage.setItem(viewKey, now.toString());
      // In real app, this would make an API call
      console.log(`View count incremented for tool ${id}`);
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('aivibesphere-bookmarks') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter(id => id !== toolId);
    } else {
      updatedBookmarks = [...bookmarks, toolId];
    }
    
    localStorage.setItem('aivibesphere-bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleAddToComparison = () => {
    if (!tool) return;
    
    const result = addToComparison({
      id: tool.id,
      name: tool.name,
      logo: tool.logo,
      rating: tool.rating,
      categories: tool.categories
    });
    
    if (result.success) {
      // Show success message or toast
      console.log('Added to comparison successfully');
    } else {
      // Show error message
      console.log(result.message);
    }
  };

  const handleSubmitRating = async (ratingData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save rating to localStorage
    const userRatings = JSON.parse(localStorage.getItem('aivibesphere-ratings') || '{}');
    userRatings[toolId] = ratingData.rating;
    localStorage.setItem('aivibesphere-ratings', JSON.stringify(userRatings));
    
    setUserRating(ratingData.rating);
    
    // Update tool rating (in real app, this would be handled by backend)
    console.log('Rating submitted:', ratingData);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Tools', path: '/category-listing-page', icon: 'Grid3X3' },
    { label: tool?.name || 'Tool Details', path: null, icon: 'Info', isLast: true }
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

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <Icon name="AlertCircle" size={64} className="text-text-muted mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-text-primary mb-2">Tool Not Found</h1>
              <p className="text-text-secondary mb-6">
                The tool you're looking for doesn't exist or has been removed.
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
            tool={tool}
            onBookmark={handleBookmark}
            isBookmarked={isBookmarked}
            onAddToComparison={handleAddToComparison}
            isInComparison={isInComparison(tool.id)}
          />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tool Tabs */}
              <ToolTabs tool={tool} />
              
              {/* Rating System */}
              <RatingSystem
                tool={tool}
                onSubmitRating={handleSubmitRating}
                userRating={userRating}
                isAuthenticated={isAuthenticated}
              />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Related Tools */}
              <RelatedTools
                tools={relatedTools}
                currentToolId={tool.id}
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
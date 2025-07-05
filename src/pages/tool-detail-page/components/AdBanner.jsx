import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AdBanner = ({ placement = 'sidebar', className = '' }) => {
  const sidebarAds = [
    {
      id: 1,
      title: "Boost Your AI Workflow",
      description: "Discover premium AI tools that transform your productivity",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      cta: "Explore Now",
      sponsor: "AI Solutions Pro"
    },
    {
      id: 2,
      title: "Advanced Analytics Platform",
      description: "Turn your data into actionable insights with our AI-powered analytics",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=400&h=300&fit=crop",
      cta: "Start Free Trial",
      sponsor: "DataViz AI"
    }
  ];

  const bannerAds = [
    {
      id: 3,
      title: "Revolutionary AI Assistant",
      description: "Experience the future of AI with our cutting-edge assistant technology",
      image: "https://images.pixabay.com/photo/2023/01/26/22/13/ai-generated-7747171_1280.jpg?w=800&h=200&fit=crop",
      cta: "Try Free",
      sponsor: "NextGen AI"
    }
  ];

  const ads = placement === 'sidebar' ? sidebarAds : bannerAds;
  const currentAd = ads[Math.floor(Math.random() * ads.length)];

  if (placement === 'banner') {
    return (
      <div className={`neumorphic-card overflow-hidden ${className}`}>
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-background/80 text-text-muted text-xs px-2 py-1 rounded">
              Sponsored
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <Image
                src={currentAd.image}
                alt={currentAd.title}
                className="w-full h-32 md:h-full object-cover"
              />
            </div>
            
            <div className="flex-1 p-6 flex items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {currentAd.title}
                </h3>
                <p className="text-text-secondary mb-4">
                  {currentAd.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted text-sm">
                    by {currentAd.sponsor}
                  </span>
                  <Button
                    variant="primary"
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    {currentAd.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {sidebarAds.map((ad) => (
        <div key={ad.id} className="neumorphic-card overflow-hidden">
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-background/80 text-text-muted text-xs px-2 py-1 rounded">
                Ad
              </span>
            </div>
            
            <Image
              src={ad.image}
              alt={ad.title}
              className="w-full h-32 object-cover"
            />
          </div>
          
          <div className="p-4">
            <h4 className="font-medium text-text-primary mb-2 line-clamp-2">
              {ad.title}
            </h4>
            <p className="text-text-secondary text-sm mb-3 line-clamp-3">
              {ad.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-text-muted text-xs">
                {ad.sponsor}
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
              >
                {ad.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Newsletter Signup */}
      <div className="neumorphic-card p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={24} className="text-primary" />
          </div>
          <h4 className="font-semibold text-text-primary mb-2">
            Stay Updated
          </h4>
          <p className="text-text-secondary text-sm mb-4">
            Get the latest AI tools and updates delivered to your inbox
          </p>
          <Button
            variant="primary"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
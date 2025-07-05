import React from 'react';
import Icon from '../../../components/AppIcon';

const BannerAd = ({ size = 'medium', className = '' }) => {
  const bannerAds = [
    {
      id: 1,
      title: "Boost Your AI Workflow",
      description: "Discover premium AI tools that transform your business processes",
      cta: "Explore Now",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=200&fit=crop",
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "AI-Powered Analytics",
      description: "Get insights that matter with advanced AI analytics platforms",
      cta: "Learn More",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=200&fit=crop",
      color: "from-green-600 to-teal-600"
    },
    {
      id: 3,
      title: "Automate Everything",
      description: "Save time and increase productivity with AI automation tools",
      cta: "Get Started",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=200&fit=crop",
      color: "from-orange-600 to-red-600"
    }
  ];

  const randomAd = bannerAds[Math.floor(Math.random() * bannerAds.length)];

  const sizeClasses = {
    small: 'h-24',
    medium: 'h-32',
    large: 'h-40'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full rounded-lg overflow-hidden group cursor-pointer">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${randomAd.image})` }}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${randomAd.color} opacity-90 group-hover:opacity-95 smooth-transition`} />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-between p-4 lg:p-6">
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg lg:text-xl mb-1">
              {randomAd.title}
            </h3>
            <p className="text-white/90 text-sm lg:text-base">
              {randomAd.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-white/30 smooth-transition">
            <span className="font-medium text-sm lg:text-base">{randomAd.cta}</span>
            <Icon name="ArrowRight" size={16} />
          </div>
        </div>

        {/* Ad Label */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Ad
        </div>
      </div>
    </div>
  );
};

export default BannerAd;
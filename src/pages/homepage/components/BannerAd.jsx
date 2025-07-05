import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BannerAd = ({ position = 'top', className = '' }) => {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const mockAds = [
    {
      id: 1,
      title: "Boost Your Productivity with AI",
      description: "Discover premium AI tools that can transform your workflow and save hours every day.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=200&fit=crop&crop=center",
      cta: "Explore Premium Tools",
      url: "/category-listing-page?premium=true",
      backgroundColor: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Submit Your AI Tool",
      description: "Get your AI tool discovered by thousands of users. Join our growing marketplace today.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=200&fit=crop&crop=center",
      cta: "Submit Tool",
      url: "/tool-submission-form",
      backgroundColor: "from-green-600 to-teal-600"
    },
    {
      id: 3,
      title: "Compare AI Tools Side by Side",
      description: "Make informed decisions by comparing features, pricing, and reviews of multiple AI tools.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=200&fit=crop&crop=center",
      cta: "Start Comparing",
      url: "/tool-comparison-page",
      backgroundColor: "from-orange-600 to-red-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % mockAds.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [mockAds.length]);

  const handleAdClick = () => {
    window.open(mockAds[currentAd].url, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`glass-panel rounded-2xl overflow-hidden bg-gradient-to-r ${mockAds[currentAd].backgroundColor}`}>
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full smooth-transition"
          >
            <Icon name="X" size={16} color="white" />
          </button>

          {/* Ad Content */}
          <div className="flex flex-col lg:flex-row items-center">
            {/* Text Content */}
            <div className="flex-1 p-8 lg:p-12">
              <div className="max-w-lg">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {mockAds[currentAd].title}
                </h3>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  {mockAds[currentAd].description}
                </p>
                <Button
                  variant="secondary"
                  onClick={handleAdClick}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  {mockAds[currentAd].cta}
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 lg:max-w-md">
              <div className="aspect-video lg:aspect-square overflow-hidden">
                <Image
                  src={mockAds[currentAd].image}
                  alt={mockAds[currentAd].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Ad Indicators */}
          <div className="absolute bottom-4 left-8 flex space-x-2">
            {mockAds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAd(index)}
                className={`w-2 h-2 rounded-full smooth-transition ${
                  index === currentAd ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Sponsored Label */}
          <div className="absolute top-4 left-4 bg-black/20 text-white text-xs px-2 py-1 rounded-full">
            Sponsored
          </div>
        </div>
      </div>

      {/* Ad Performance Tracking (Hidden) */}
      <div className="sr-only">
        Ad Position: {position}, Ad ID: {mockAds[currentAd].id}
      </div>
    </div>
  );
};

export default BannerAd;
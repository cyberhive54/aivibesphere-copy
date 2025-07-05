import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category-listing-page?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = [
    "AI Writing", "Image Generation", "Chatbots", "Data Analysis", "Video Editing"
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            Discover the Best
            <span className="text-gradient block mt-2">AI Tools</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore thousands of AI-powered tools to supercharge your productivity, creativity, and business growth. Find the perfect solution for your needs.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative glass-panel p-2 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search AI tools, categories, or features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-lg placeholder:text-text-muted focus:ring-0 px-4 py-3"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  iconName="Search"
                  className="px-6 py-3 rounded-xl"
                >
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-text-muted">Popular:</span>
            {popularSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(term);
                  navigate(`/category-listing-page?search=${encodeURIComponent(term)}`);
                }}
                className="text-sm text-text-secondary hover:text-primary smooth-transition px-3 py-1 rounded-full bg-surface/50 hover:bg-surface"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "AI Tools", value: "2,500+", icon: "Zap" },
            { label: "Categories", value: "50+", icon: "Grid3X3" },
            { label: "User Reviews", value: "15K+", icon: "Star" },
            { label: "Active Users", value: "100K+", icon: "Users" }
          ].map((stat, index) => (
            <div key={index} className="neumorphic-card p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name={stat.icon} size={24} color="white" />
              </div>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
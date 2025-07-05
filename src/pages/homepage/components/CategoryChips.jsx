import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryChips = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const categories = [
    { id: 1, name: "AI Writing", icon: "PenTool", count: 245, color: "from-blue-500 to-blue-600" },
    { id: 2, name: "Image Generation", icon: "Image", count: 189, color: "from-purple-500 to-purple-600" },
    { id: 3, name: "Chatbots", icon: "MessageCircle", count: 156, color: "from-green-500 to-green-600" },
    { id: 4, name: "Data Analysis", icon: "BarChart3", count: 134, color: "from-orange-500 to-orange-600" },
    { id: 5, name: "Video Editing", icon: "Video", count: 98, color: "from-red-500 to-red-600" },
    { id: 6, name: "Voice & Audio", icon: "Mic", count: 87, color: "from-pink-500 to-pink-600" },
    { id: 7, name: "Code Assistant", icon: "Code", count: 76, color: "from-indigo-500 to-indigo-600" },
    { id: 8, name: "Marketing", icon: "TrendingUp", count: 65, color: "from-teal-500 to-teal-600" },
    { id: 9, name: "Design Tools", icon: "Palette", count: 54, color: "from-yellow-500 to-yellow-600" },
    { id: 10, name: "Productivity", icon: "Zap", count: 43, color: "from-cyan-500 to-cyan-600" }
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/category-listing-page?category=${encodeURIComponent(categoryName)}`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Browse by Category
            </h2>
            <p className="text-text-secondary">
              Discover AI tools organized by their primary use cases
            </p>
          </div>
          
          {/* Desktop Navigation Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => scroll('left')}
              iconName="ChevronLeft"
              className="text-text-secondary hover:text-text-primary"
            />
            <Button
              variant="ghost"
              onClick={() => scroll('right')}
              iconName="ChevronRight"
              className="text-text-secondary hover:text-text-primary"
            />
          </div>
        </div>

        {/* Categories Scroll Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-thin pb-4 lg:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="flex-shrink-0 group"
              >
                <div className="neumorphic-card p-6 w-48 sm:w-52 hover:scale-105 smooth-transition">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 smooth-transition`}>
                    <Icon name={category.icon} size={28} color="white" />
                  </div>
                  
                  <h3 className="font-semibold text-text-primary text-center mb-2 group-hover:text-primary smooth-transition">
                    {category.name}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-1 text-text-secondary text-sm">
                    <span>{category.count}</span>
                    <span>tools</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Scroll Indicators */}
          <div className="flex justify-center mt-4 lg:hidden">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(categories.length / 2) }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-text-muted rounded-full opacity-30"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/category-listing-page')}
            iconName="ArrowRight"
            iconPosition="right"
            className="px-8 py-3"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryChips;
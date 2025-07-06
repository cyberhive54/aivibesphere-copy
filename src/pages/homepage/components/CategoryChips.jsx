import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { ALL_CATEGORIES } from '../../../utils/categories';

const CategoryChips = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Use the first 10 categories for display
  const categories = ALL_CATEGORIES.slice(0, 10);

  const handleCategoryClick = (category) => {
    // Use the slug (database enum value) for the URL parameter
    navigate(`/category-listing-page?category=${encodeURIComponent(category.slug)}`);
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
                onClick={() => handleCategoryClick(category)}
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
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolCard from './ToolCard';
import toolsService from '../../../utils/toolsService';

const CategorySections = () => {
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const featuredCategories = [
    { key: 'productivity', name: 'Productivity', description: 'Tools to boost your workflow and efficiency' },
    { key: 'design', name: 'Design', description: 'Creative tools for visual content creation' },
    { key: 'writing', name: 'Writing', description: 'AI-powered writing assistants and editors' },
    { key: 'coding', name: 'Development', description: 'Coding assistants and development tools' }
  ];

  useEffect(() => {
    let isMounted = true;

    const loadCategoryTools = async () => {
      try {
        setLoading(true);
        setError(null);

        const categoryPromises = featuredCategories.map(async (category) => {
          const result = await toolsService.getToolsByCategory(category.key, 4);
          return {
            category: category.key,
            data: result.success ? result.data : []
          };
        });

        const results = await Promise.all(categoryPromises);
        
        if (isMounted) {
          const categoriesMap = {};
          results.forEach(({ category, data }) => {
            categoriesMap[category] = data;
          });
          setCategoriesData(categoriesMap);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load category tools');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCategoryTools();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredCategories.map((category) => (
            <div key={category.key} className="mb-16 last:mb-0">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="h-8 w-48 bg-surface rounded-lg mb-2 animate-pulse" />
                  <div className="h-4 w-96 bg-surface rounded-lg animate-pulse" />
                </div>
                <div className="h-10 w-32 bg-surface rounded-lg animate-pulse" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-surface rounded-2xl p-6 animate-pulse">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-surface-hover rounded-xl" />
                      <div className="flex-1">
                        <div className="h-5 w-32 bg-surface-hover rounded mb-2" />
                        <div className="h-3 w-24 bg-surface-hover rounded" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-3 w-full bg-surface-hover rounded" />
                      <div className="h-3 w-3/4 bg-surface-hover rounded" />
                    </div>
                    <div className="h-10 w-full bg-surface-hover rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-primary hover:text-primary-light underline"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featuredCategories.map((category) => {
          const tools = categoriesData[category.key] || [];
          
          if (tools.length === 0) return null;

          return (
            <div key={category.key} className="mb-16 last:mb-0">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                    {category.name}
                  </h3>
                  <p className="text-text-secondary text-lg">
                    {category.description}
                  </p>
                </div>
                <Link
                  to={`/category-listing-page?category=${category.key}`}
                  className="flex items-center text-primary hover:text-primary-light font-medium smooth-transition group"
                >
                  View All
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 smooth-transition" />
                </Link>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}

        {/* No categories message */}
        {Object.keys(categoriesData).length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg mb-4">No tools available in featured categories.</p>
            <Link
              to="/category-listing-page"
              className="text-primary hover:text-primary-light underline"
            >
              Browse all categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySections;
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolCard from './ToolCard';
import toolsService from '../../../utils/toolsService';

const FeaturedTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedTools = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await toolsService.getFeaturedTools(6);
        
        if (result.success && isMounted) {
          setTools(result.data);
        } else if (isMounted) {
          setError(result.error || 'Failed to load featured tools');
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load featured tools');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFeaturedTools();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-surface rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-surface rounded-lg mx-auto animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
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
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
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
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Featured AI Tools
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover our hand-picked selection of the most innovative and powerful AI tools
          </p>
        </div>

        {/* Tools Grid */}
        {tools?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                to="/category-listing-page?featured=true"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-xl hover:scale-105 smooth-transition group"
              >
                View All Featured Tools
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg mb-4">No featured tools available at the moment.</p>
            <Link
              to="/category-listing-page"
              className="text-primary hover:text-primary-light underline"
            >
              Browse all tools
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTools;
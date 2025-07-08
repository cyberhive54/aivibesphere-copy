import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ToolCard from '../category-listing-page/components/ToolCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import favoritesService from '../../utils/favoritesService';

const UserFavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/homepage');
      return;
    }

    loadFavorites();
  }, [user, navigate]);

  const loadFavorites = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const result = await favoritesService.getUserFavorites(user.id);
      
      if (result.success) {
        setFavorites(result.data || []);
      } else {
        setError(result.error || 'Failed to load favorites');
      }
    } catch (err) {
      setError('Failed to load favorites');
      console.error('Error loading favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewTool = (toolId) => {
    // Track view count if needed
    console.log('Viewing tool:', toolId);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'My Favorites', path: '/favorites', icon: 'Heart', isLast: true }
  ];

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">My Favorites</h1>
                <p className="text-text-secondary">
                  {favorites.length} saved tool{favorites.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="neumorphic-card p-6 animate-pulse">
                  <div className="w-full h-48 bg-surface rounded-lg mb-4"></div>
                  <div className="h-6 bg-surface rounded mb-2"></div>
                  <div className="h-4 bg-surface rounded mb-4"></div>
                  <div className="h-10 bg-surface rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <Icon name="AlertCircle" size={64} className="text-error mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Error Loading Favorites
              </h3>
              <p className="text-text-secondary mb-6">{error}</p>
              <Button
                variant="primary"
                onClick={loadFavorites}
                iconName="RefreshCw"
              >
                Try Again
              </Button>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Heart" size={48} className="text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No Favorites Yet
              </h3>
              <p className="text-text-secondary mb-6">
                Start exploring AI tools and save your favorites for easy access later.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/category-listing-page')}
                iconName="Search"
              >
                Discover Tools
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onViewTool={handleViewTool}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserFavoritesPage;
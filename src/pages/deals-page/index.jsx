import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';
import dealsService from '../../utils/dealsService';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await dealsService.getActiveDeals();
      
      if (result.success) {
        setDeals(result.data || []);
      } else {
        setError(result.error || 'Failed to load deals');
      }
    } catch (err) {
      setError('Failed to load deals');
      console.error('Error loading deals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Deals & Offers', path: '/deals-page', icon: 'Tag', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Icon name="Tag" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">💰 Deals & Offers</h1>
                <p className="text-text-secondary">
                  Save money on premium AI tools with exclusive deals and discounts
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
                Error Loading Deals
              </h3>
              <p className="text-text-secondary mb-6">{error}</p>
              <Button
                variant="primary"
                onClick={loadDeals}
                iconName="RefreshCw"
              >
                Try Again
              </Button>
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Tag" size={48} className="text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No Active Deals
              </h3>
              <p className="text-text-secondary mb-6">
                Check back later for new deals and exclusive offers on AI tools.
              </p>
              <Button
                variant="primary"
                onClick={() => window.location.href = '/category-listing-page'}
                iconName="Search"
              >
                Browse All Tools
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => {
                const daysRemaining = getDaysRemaining(deal.end_date);
                
                return (
                  <div key={deal.id} className="neumorphic-card overflow-hidden hover:shadow-elevated smooth-transition">
                    {/* Deal Header */}
                    <div className="relative">
                      {deal.tools?.logo_url && (
                        <div className="h-48 bg-surface flex items-center justify-center">
                          <Image
                            src={deal.tools.logo_url}
                            alt={deal.tools.name}
                            className="w-24 h-24 object-contain"
                          />
                        </div>
                      )}
                      
                      {/* Deal Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Deal
                        </span>
                      </div>
                      
                      {/* Urgency Badge */}
                      {daysRemaining <= 3 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-error text-error-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {daysRemaining === 1 ? 'Last Day!' : `${daysRemaining} Days Left`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Deal Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {deal.title}
                      </h3>
                      
                      <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                        {deal.description}
                      </p>

                      {/* Deal Details */}
                      <div className="space-y-3 mb-6">
                        {deal.discount_code && (
                          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                            <span className="text-text-secondary text-sm">Discount Code:</span>
                            <div className="flex items-center space-x-2">
                              <code className="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-mono">
                                {deal.discount_code}
                              </code>
                              <Button
                                variant="ghost"
                                onClick={() => navigator.clipboard.writeText(deal.discount_code)}
                                iconName="Copy"
                                className="p-1"
                                title="Copy code"
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">Valid until:</span>
                          <span className="text-text-primary font-medium">
                            {formatDate(deal.end_date)}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => window.open(deal.deal_url, '_blank')}
                        iconName="ExternalLink"
                        iconPosition="right"
                      >
                        Get Deal
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DealsPage;
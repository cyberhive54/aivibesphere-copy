import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  const benefits = [
    {
      icon: "Zap",
      title: "Weekly AI Tool Roundup",
      description: "Get the latest and most innovative AI tools delivered to your inbox"
    },
    {
      icon: "TrendingUp",
      title: "Exclusive Deals & Discounts",
      description: "Access special offers and early-bird pricing on premium AI tools"
    },
    {
      icon: "BookOpen",
      title: "AI Industry Insights",
      description: "Stay updated with trends, tutorials, and expert analysis"
    },
    {
      icon: "Users",
      title: "Community Access",
      description: "Join our exclusive community of AI enthusiasts and professionals"
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="neumorphic-card p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={32} color="white" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Welcome to the AI Community!
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Thank you for subscribing! You'll receive your first newsletter within 24 hours with the latest AI tools and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() => setIsSubscribed(false)}
                iconName="Mail"
                iconPosition="left"
              >
                Subscribe Another Email
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/category-listing-page', '_blank')}
                iconName="ExternalLink"
                iconPosition="right"
              >
                Explore AI Tools
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neumorphic-card p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Mail" size={24} color="white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
                    Stay Ahead with AI
                  </h2>
                  <p className="text-text-secondary">
                    Join 50,000+ AI enthusiasts
                  </p>
                </div>
              </div>

              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Get weekly updates on the latest AI tools, exclusive deals, industry insights, and expert tips delivered straight to your inbox. Be the first to discover game-changing AI solutions.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-surface border-border text-lg py-4"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={!email.trim() || isLoading}
                    className="px-8 py-4 text-lg"
                    iconName={isLoading ? undefined : "Send"}
                    iconPosition="right"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-sm text-text-muted mt-3">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </form>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-green-400" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-green-400" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-green-400" />
                  <span>50K+ Subscribers</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                What you'll get:
              </h3>
              
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-surface/50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Social Proof */}
              <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex -space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-background flex items-center justify-center"
                      >
                        <Icon name="User" size={14} color="white" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  "The best AI newsletter I've subscribed to. Always discover amazing tools!" - Sarah K.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
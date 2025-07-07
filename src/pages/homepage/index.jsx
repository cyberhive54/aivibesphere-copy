import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ComparisonCart from '../../components/ui/ComparisonCart';
import ScrollToTopButton from '../../components/ui/ScrollToTopButton';
import HeroSection from './components/HeroSection';
import CategoryChips from './components/CategoryChips';
import FeaturedTools from './components/FeaturedTools';
import TrendingSection from './components/TrendingSection';
import JustLaunchedSection from './components/JustLaunchedSection';
import CategorySections from './components/CategorySections';
import BannerAd from './components/BannerAd';
import NewsletterSection from './components/NewsletterSection';

const Homepage = () => {
  useEffect(() => {
    // Track page view
    const trackPageView = () => {
      // Analytics tracking would go here
      console.log('Homepage viewed');
    };

    trackPageView();

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>AIVibeSphere - Discover the Best AI Tools for Your Business</title>
        <meta 
          name="description" 
          content="Explore thousands of AI-powered tools to supercharge your productivity, creativity, and business growth. Find the perfect AI solution for your needs with ratings, reviews, and comparisons." 
        />
        <meta name="keywords" content="AI tools, artificial intelligence, productivity, business tools, AI software, machine learning, automation" />
        <meta property="og:title" content="AIVibeSphere - Discover the Best AI Tools" />
        <meta property="og:description" content="Explore thousands of AI-powered tools to supercharge your productivity and business growth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aivibesphere.com/homepage" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AIVibeSphere - Discover the Best AI Tools" />
        <meta name="twitter:description" content="Explore thousands of AI-powered tools to supercharge your productivity and business growth." />
        <link rel="canonical" href="https://aivibesphere.com/homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Category Navigation */}
          <CategoryChips />

          {/* Top Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BannerAd position="top" />
          </div>

          {/* Featured Tools */}
          <FeaturedTools />

          {/* Trending Tools */}
          <TrendingSection />

          {/* Middle Banner Ad */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BannerAd position="middle" />
          </div>

          {/* Just Launched */}
          <JustLaunchedSection />

          {/* Category Sections */}
          <CategorySections />

          {/* Newsletter Section */}
          <NewsletterSection />
        </main>

        {/* Floating Elements */}
        <ComparisonCart />
        <ScrollToTopButton />

        {/* Footer */}
        <footer className="bg-surface border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <span className="text-xl font-bold text-gradient">AIVibeSphere</span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  Discover, compare, and choose the best AI tools for your business needs. Join thousands of users finding their perfect AI solutions.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-text-secondary hover:text-primary smooth-transition">
                    <span className="sr-only">Twitter</span>
                    <div className="w-8 h-8 bg-surface-hover rounded-lg flex items-center justify-center">
                      <span className="text-sm">𝕏</span>
                    </div>
                  </a>
                  <a href="#" className="text-text-secondary hover:text-primary smooth-transition">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-8 h-8 bg-surface-hover rounded-lg flex items-center justify-center">
                      <span className="text-sm">in</span>
                    </div>
                  </a>
                  <a href="#" className="text-text-secondary hover:text-primary smooth-transition">
                    <span className="sr-only">GitHub</span>
                    <div className="w-8 h-8 bg-surface-hover rounded-lg flex items-center justify-center">
                      <span className="text-sm">⚡</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Explore */}
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Explore</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/category-listing-page" className="text-text-secondary hover:text-primary smooth-transition">All Categories</a></li>
                  <li><a href="/category-listing-page?featured=true" className="text-text-secondary hover:text-primary smooth-transition">Featured Tools</a></li>
                  <li><a href="/trending-tools" className="text-text-secondary hover:text-primary smooth-transition">Trending Tools</a></li>
                  <li><a href="/just-launched" className="text-text-secondary hover:text-primary smooth-transition">Just Launched</a></li>
                  <li><a href="/tool-comparison-page" className="text-text-secondary hover:text-primary smooth-transition">Compare Tools</a></li>
                  <li><a href="/deals" className="text-text-secondary hover:text-primary smooth-transition">Deals & Offers</a></li>
                  <li><a href="/tool-directory" className="text-text-secondary hover:text-primary smooth-transition">Tool Directory</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/tool-submission-form" className="text-text-secondary hover:text-primary smooth-transition">Submit Tool</a></li>
                  <li><a href="/request-feature" className="text-text-secondary hover:text-primary smooth-transition">Request Feature</a></li>
                  <li><a href="/report-bug" className="text-text-secondary hover:text-primary smooth-transition">Report Bug</a></li>
                  <li><a href="/contact-us" className="text-text-secondary hover:text-primary smooth-transition">Contact Us</a></li>
                  <li><a href="/advertise" className="text-text-secondary hover:text-primary smooth-transition">Advertise</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-primary smooth-transition">API Documentation</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-primary smooth-transition">Help Center</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-text-secondary hover:text-primary smooth-transition">Privacy Policy</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-primary smooth-transition">Terms of Service</a></li>
                  <li><a href="/disclaimer" className="text-text-secondary hover:text-primary smooth-transition">Disclaimer</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-primary smooth-transition">Cookie Policy</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-primary smooth-transition">GDPR</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-text-secondary text-sm">
                © {new Date().getFullYear()} AIVibeSphere. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <span className="text-text-secondary text-sm">Made with ❤️ for the AI community</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
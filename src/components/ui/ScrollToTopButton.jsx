import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-1000 lg:bottom-8 lg:right-8">
      <Button
        variant="primary"
        onClick={scrollToTop}
        iconName="ArrowUp"
        className="w-12 h-12 rounded-full shadow-elevated hover:shadow-lg smooth-transition animate-scale-in"
        title="Scroll to top"
      />
    </div>
  );
};

export default ScrollToTopButton;
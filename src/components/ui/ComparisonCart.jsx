import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ComparisonCart = () => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const MAX_COMPARISON_ITEMS = 4;
  const STORAGE_KEY = 'aivibesphere-comparison';

  useEffect(() => {
    loadComparisonItems();
    
    const handleStorageChange = () => {
      loadComparisonItems();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('comparison-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('comparison-updated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setIsVisible(comparisonItems.length > 0);
  }, [comparisonItems]);

  const loadComparisonItems = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved);
        setComparisonItems(Array.isArray(items) ? items : []);
      } else {
        setComparisonItems([]);
      }
    } catch (error) {
      console.error('Error loading comparison items:', error);
      setComparisonItems([]);
    }
  };

  const saveComparisonItems = (items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event('comparison-updated'));
    } catch (error) {
      console.error('Error saving comparison items:', error);
    }
  };

  const removeItem = (itemId) => {
    const updatedItems = comparisonItems.filter(item => item.id !== itemId);
    setComparisonItems(updatedItems);
    saveComparisonItems(updatedItems);
  };

  const clearAll = () => {
    setComparisonItems([]);
    saveComparisonItems([]);
    setIsExpanded(false);
  };

  const addToComparison = (tool) => {
    if (comparisonItems.length >= MAX_COMPARISON_ITEMS) {
      return false;
    }

    const exists = comparisonItems.some(item => item.id === tool.id);
    if (exists) {
      return false;
    }

    const updatedItems = [...comparisonItems, tool];
    setComparisonItems(updatedItems);
    saveComparisonItems(updatedItems);
    return true;
  };

  const isInComparison = (toolId) => {
    return comparisonItems.some(item => item.id === toolId);
  };

  const canAddMore = () => {
    return comparisonItems.length < MAX_COMPARISON_ITEMS;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Desktop Floating Cart */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-1000">
        <div className="neumorphic-card bg-surface p-4 max-w-sm animate-scale-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="GitCompare" size={20} className="text-primary" />
              <span className="font-semibold text-text-primary">
                Compare ({comparisonItems.length})
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                iconName={isExpanded ? "ChevronDown" : "ChevronUp"}
                className="text-text-secondary hover:text-text-primary p-1"
              />
              <Button
                variant="ghost"
                onClick={clearAll}
                iconName="X"
                className="text-text-secondary hover:text-error p-1"
              />
            </div>
          </div>

          {isExpanded && (
            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto scrollbar-thin">
              {comparisonItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-background rounded-lg"
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-surface rounded flex items-center justify-center flex-shrink-0">
                      <Icon name="Zap" size={14} className="text-primary" />
                    </div>
                    <span className="text-sm text-text-primary truncate">
                      {item.name || `Tool ${item.id}`}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    iconName="X"
                    className="text-text-secondary hover:text-error p-1 flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex space-x-2">
            <Link to="/tool-comparison-page" className="flex-1">
              <Button
                variant="primary"
                fullWidth
                disabled={comparisonItems.length < 2}
                className="text-sm"
              >
                Compare Now
              </Button>
            </Link>
          </div>

          {comparisonItems.length >= MAX_COMPARISON_ITEMS && (
            <p className="text-xs text-warning mt-2 text-center">
              Maximum {MAX_COMPARISON_ITEMS} tools can be compared
            </p>
          )}
        </div>
      </div>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-1000">
        <Link to="/tool-comparison-page">
          <div className="relative neumorphic-card bg-primary p-3 rounded-full animate-scale-in">
            <Icon name="GitCompare" size={24} color="white" />
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-mono min-w-[24px] text-center">
              {comparisonItems.length}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

// Export utility functions for use in other components
export const useComparison = () => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const STORAGE_KEY = 'aivibesphere-comparison';
  const MAX_COMPARISON_ITEMS = 4;

  useEffect(() => {
    loadItems();
    
    const handleUpdate = () => loadItems();
    window.addEventListener('comparison-updated', handleUpdate);
    
    return () => window.removeEventListener('comparison-updated', handleUpdate);
  }, []);

  const loadItems = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved);
        setComparisonItems(Array.isArray(items) ? items : []);
      }
    } catch (error) {
      console.error('Error loading comparison items:', error);
    }
  };

  const addToComparison = (tool) => {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      if (current.length >= MAX_COMPARISON_ITEMS) {
        return { success: false, message: `Maximum ${MAX_COMPARISON_ITEMS} tools allowed` };
      }

      const exists = current.some(item => item.id === tool.id);
      if (exists) {
        return { success: false, message: 'Tool already in comparison' };
      }

      const updated = [...current, tool];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('comparison-updated'));
      
      return { success: true, message: 'Added to comparison' };
    } catch (error) {
      console.error('Error adding to comparison:', error);
      return { success: false, message: 'Error adding tool' };
    }
  };

  const removeFromComparison = (toolId) => {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const updated = current.filter(item => item.id !== toolId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('comparison-updated'));
      return { success: true };
    } catch (error) {
      console.error('Error removing from comparison:', error);
      return { success: false };
    }
  };

  const isInComparison = (toolId) => {
    return comparisonItems.some(item => item.id === toolId);
  };

  const canAddMore = () => {
    return comparisonItems.length < MAX_COMPARISON_ITEMS;
  };

  return {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    isInComparison,
    canAddMore,
    maxItems: MAX_COMPARISON_ITEMS
  };
};

export default ComparisonCart;
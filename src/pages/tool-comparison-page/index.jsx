import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComparisonCart from '../../components/ui/ComparisonCart';
import ComparisonHeader from './components/ComparisonHeader';
import ToolSelector from './components/ToolSelector';
import ComparisonTable from './components/ComparisonTable';
import MobileComparisonView from './components/MobileComparisonView';
import EmptyComparisonState from './components/EmptyComparisonState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ToolComparisonPage = () => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const STORAGE_KEY = 'aivibesphere-comparison';
  const MAX_COMPARISON_ITEMS = 4;

  useEffect(() => {
    loadComparisonItems();
    checkMobileView();
    
    const handleResize = () => checkMobileView();
    const handleStorageChange = () => loadComparisonItems();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('comparison-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('comparison-updated', handleStorageChange);
    };
  }, []);

  const checkMobileView = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  const loadComparisonItems = () => {
    setIsLoading(true);
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
    } finally {
      setTimeout(() => setIsLoading(false), 500);
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

  const handleAddTool = (tool) => {
    if (comparisonItems.length >= MAX_COMPARISON_ITEMS) {
      showMessage(`Maximum ${MAX_COMPARISON_ITEMS} tools can be compared`, 'warning');
      return;
    }

    const exists = comparisonItems.some(item => item.id === tool.id);
    if (exists) {
      showMessage('Tool is already in comparison', 'warning');
      return;
    }

    const updatedItems = [...comparisonItems, tool];
    setComparisonItems(updatedItems);
    saveComparisonItems(updatedItems);
    showMessage(`${tool.name} added to comparison`, 'success');
  };

  const handleRemoveTool = (toolId) => {
    const updatedItems = comparisonItems.filter(item => item.id !== toolId);
    setComparisonItems(updatedItems);
    saveComparisonItems(updatedItems);
    
    const removedTool = comparisonItems.find(item => item.id === toolId);
    if (removedTool) {
      showMessage(`${removedTool.name} removed from comparison`, 'info');
    }
  };

  const handleClearAll = () => {
    setComparisonItems([]);
    saveComparisonItems([]);
    showMessage('All tools removed from comparison', 'info');
  };

  const handleExportPDF = async () => {
    if (comparisonItems.length === 0) {
      showMessage('No tools to export', 'warning');
      return;
    }

    setIsExporting(true);
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple text-based export for demonstration
      const exportData = {
        title: 'AI Tools Comparison Report',
        date: new Date().toLocaleDateString(),
        tools: comparisonItems.map(tool => ({
          name: tool.name,
          category: tool.category,
          description: tool.description,
          rating: tool.rating || 4.5,
          pricing: tool.pricing || 'Freemium'
        }))
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-tools-comparison-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showMessage('Comparison exported successfully', 'success');
    } catch (error) {
      console.error('Export error:', error);
      showMessage('Failed to export comparison', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveComparison = () => {
    if (comparisonItems.length === 0) {
      showMessage('No tools to save', 'warning');
      return;
    }

    try {
      const savedComparisons = JSON.parse(localStorage.getItem('aivibesphere-saved-comparisons') || '[]');
      const newComparison = {
        id: Date.now().toString(),
        name: `Comparison ${savedComparisons.length + 1}`,
        tools: comparisonItems,
        createdAt: new Date().toISOString()
      };
      
      savedComparisons.push(newComparison);
      localStorage.setItem('aivibesphere-saved-comparisons', JSON.stringify(savedComparisons));
      
      showMessage('Comparison saved successfully', 'success');
    } catch (error) {
      console.error('Save error:', error);
      showMessage('Failed to save comparison', 'error');
    }
  };

  const showMessage = (message, type = 'info') => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Tool Comparison', path: '/tool-comparison-page', icon: 'GitCompare', isLast: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-surface rounded w-1/3"></div>
              <div className="h-32 bg-surface rounded"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-64 bg-surface rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <ComparisonHeader
            comparisonItems={comparisonItems}
            onClearAll={handleClearAll}
            onExportPDF={handleExportPDF}
            onSaveComparison={handleSaveComparison}
            isExporting={isExporting}
          />

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-2 animate-slide-down">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-success font-medium">{successMessage}</span>
            </div>
          )}

          {/* Tool Selector */}
          <div className="mb-6">
            <ToolSelector
              onAddTool={handleAddTool}
              comparisonItems={comparisonItems}
              maxItems={MAX_COMPARISON_ITEMS}
            />
          </div>

          {/* Comparison Content */}
          {comparisonItems.length === 0 ? (
            <EmptyComparisonState />
          ) : (
            <div className="space-y-6">
              {/* Desktop View */}
              {!isMobile && (
                <ComparisonTable
                  comparisonItems={comparisonItems}
                  onRemoveTool={handleRemoveTool}
                />
              )}

              {/* Mobile View */}
              {isMobile && (
                <MobileComparisonView
                  comparisonItems={comparisonItems}
                  onRemoveTool={handleRemoveTool}
                />
              )}
            </div>
          )}

          {/* Quick Actions */}
          {comparisonItems.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() => navigate('/category-listing-page')}
                iconName="Plus"
              >
                Add More Tools
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/homepage')}
                iconName="Home"
              >
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </main>

      <ComparisonCart />
    </div>
  );
};

export default ToolComparisonPage;
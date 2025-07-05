import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonHeader = ({ 
  comparisonItems, 
  onClearAll, 
  onExportPDF, 
  onSaveComparison,
  isExporting 
}) => {
  return (
    <div className="bg-surface rounded-lg p-6 mb-6 neumorphic-card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="GitCompare" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Tool Comparison
            </h1>
            <p className="text-text-secondary text-sm">
              Compare up to 4 AI tools side by side
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Info" size={16} />
            <span>{comparisonItems.length}/4 tools selected</span>
          </div>

          <Button
            variant="ghost"
            onClick={onSaveComparison}
            iconName="Bookmark"
            className="text-text-secondary hover:text-accent"
          >
            Save
          </Button>

          <Button
            variant="outline"
            onClick={onExportPDF}
            iconName="Download"
            loading={isExporting}
            disabled={comparisonItems.length === 0}
          >
            Export PDF
          </Button>

          <Button
            variant="danger"
            onClick={onClearAll}
            iconName="Trash2"
            disabled={comparisonItems.length === 0}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonHeader;
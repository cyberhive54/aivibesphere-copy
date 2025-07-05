import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ToolSelector = ({ onAddTool, comparisonItems, maxItems = 4 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock available tools for selection
  const availableTools = [
    {
      id: 'chatgpt-4',
      name: 'ChatGPT-4',
      category: 'Conversational AI',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop&crop=center',
      description: 'Advanced conversational AI with multimodal capabilities',
      pricing: 'Freemium',
      rating: 4.8
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      category: 'Image Generation',
      logo: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=64&h=64&fit=crop&crop=center',
      description: 'AI-powered image generation and artistic creation',
      pricing: 'Paid',
      rating: 4.7
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      category: 'Conversational AI',
      logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=64&h=64&fit=crop&crop=center',
      description: 'Constitutional AI assistant for safe and helpful interactions',
      pricing: 'Freemium',
      rating: 4.6
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      category: 'Code Generation',
      logo: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=64&h=64&fit=crop&crop=center',
      description: 'AI pair programmer for code completion and generation',
      pricing: 'Paid',
      rating: 4.5
    },
    {
      id: 'jasper-ai',
      name: 'Jasper AI',
      category: 'Content Writing',
      logo: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=64&h=64&fit=crop&crop=center',
      description: 'AI content creation platform for marketing and copywriting',
      pricing: 'Paid',
      rating: 4.4
    },
    {
      id: 'notion-ai',
      name: 'Notion AI',
      category: 'Productivity',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
      description: 'AI-powered writing assistant integrated with Notion workspace',
      pricing: 'Freemium',
      rating: 4.3
    }
  ];

  const filteredTools = availableTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    const notInComparison = !comparisonItems.some(item => item.id === tool.id);
    return matchesSearch && notInComparison;
  });

  const handleAddTool = (tool) => {
    onAddTool(tool);
    setIsOpen(false);
    setSearchQuery('');
  };

  const canAddMore = comparisonItems.length < maxItems;

  if (!canAddMore) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Plus"
        className="w-full lg:w-auto"
      >
        Add Tool to Compare
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 lg:right-auto lg:w-96 mt-2 glass-panel p-4 z-50 animate-slide-down">
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="max-h-64 overflow-y-auto scrollbar-thin space-y-2">
            {filteredTools.length === 0 ? (
              <div className="text-center py-8 text-text-secondary">
                <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
                <p>No tools found</p>
              </div>
            ) : (
              filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => handleAddTool(tool)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface-hover cursor-pointer smooth-transition"
                >
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary truncate">
                      {tool.name}
                    </h4>
                    <p className="text-sm text-text-secondary truncate">
                      {tool.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-text-secondary">
                    <Icon name="Star" size={14} className="text-warning" />
                    <span>{tool.rating}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              iconName="X"
              fullWidth
              className="text-text-secondary"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolSelector;
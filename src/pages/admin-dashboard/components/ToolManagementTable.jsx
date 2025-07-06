import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';
import { ALL_CATEGORIES, getCategoryDisplayName } from '../../../utils/categories';

const ToolManagementTable = ({ tools, onUpdateTool, onDeleteTool }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [editingTool, setEditingTool] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || tool.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (categorySlug) => {
    const category = ALL_CATEGORIES.find(cat => cat.slug === categorySlug);
    if (!category) return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    
    // Extract color from gradient for background
    const colorMatch = category.color.match(/from-(\w+)-500/);
    const colorName = colorMatch ? colorMatch[1] : 'gray';
    
    const colors = {
      'blue': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'purple': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'green': 'bg-green-500/10 text-green-400 border-green-500/20',
      'orange': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'pink': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      'cyan': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      'red': 'bg-red-500/10 text-red-400 border-red-500/20',
      'indigo': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      'teal': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      'yellow': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'violet': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      'slate': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      'emerald': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'amber': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      'rose': 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    };
    
    return colors[colorName] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-500/10 text-green-400 border-green-500/20',
      'inactive': 'bg-red-500/10 text-red-400 border-red-500/20',
      'pending': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };
    return colors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const handleInlineEdit = (tool) => {
    setEditingTool({ ...tool });
  };

  const handleSaveEdit = () => {
    onUpdateTool(editingTool.id, editingTool);
    setEditingTool(null);
  };

  const handleCancelEdit = () => {
    setEditingTool(null);
  };

  return (
    <div className="neumorphic-card overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-border bg-surface/50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search tools by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Categories</option>
              {ALL_CATEGORIES.map(category => (
                <option key={category.slug} value={category.slug}>{category.name}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th 
                className="p-4 text-left text-text-primary font-semibold cursor-pointer hover:text-primary smooth-transition"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Tool</span>
                  <Icon 
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="p-4 text-left text-text-primary font-semibold">Category</th>
              <th className="p-4 text-left text-text-primary font-semibold">Status</th>
              <th 
                className="p-4 text-left text-text-primary font-semibold cursor-pointer hover:text-primary smooth-transition"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center space-x-1">
                  <span>Rating</span>
                  <Icon 
                    name={sortField === 'rating' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="p-4 text-left text-text-primary font-semibold cursor-pointer hover:text-primary smooth-transition"
                onClick={() => handleSort('views')}
              >
                <div className="flex items-center space-x-1">
                  <span>Views</span>
                  <Icon 
                    name={sortField === 'views' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="p-4 text-left text-text-primary font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTools.map((tool) => (
              <tr key={tool.id} className="border-b border-border hover:bg-surface/50 smooth-transition">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-surface rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      {editingTool && editingTool.id === tool.id ? (
                        <div className="space-y-2">
                          <Input
                            type="text"
                            value={editingTool.name}
                            onChange={(e) => setEditingTool({...editingTool, name: e.target.value})}
                            className="text-sm"
                          />
                          <Input
                            type="text"
                            value={editingTool.description}
                            onChange={(e) => setEditingTool({...editingTool, description: e.target.value})}
                            className="text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <p className="text-text-primary font-medium truncate">{tool.name}</p>
                          <p className="text-text-secondary text-sm truncate">{tool.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {editingTool && editingTool.id === tool.id ? (
                    <select
                      value={editingTool.category}
                      onChange={(e) => setEditingTool({...editingTool, category: e.target.value})}
                      className="px-2 py-1 bg-background border border-border rounded text-sm text-text-primary"
                    >
                      {ALL_CATEGORIES.map(category => (
                        <option key={category.slug} value={category.slug}>{category.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(tool.category)}`}>
                      {getCategoryDisplayName(tool.category)}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {editingTool && editingTool.id === tool.id ? (
                    <select
                      value={editingTool.status}
                      onChange={(e) => setEditingTool({...editingTool, status: e.target.value})}
                      className="px-2 py-1 bg-background border border-border rounded text-sm text-text-primary"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tool.status)}`}>
                      {tool.status}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                    <span className="text-text-primary font-medium">{tool.rating}</span>
                    <span className="text-text-secondary text-sm">({tool.reviewsCount})</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={16} className="text-text-secondary" />
                    <span className="text-text-primary">{tool.views.toLocaleString()}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {editingTool && editingTool.id === tool.id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          iconName="Check"
                          onClick={handleSaveEdit}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={handleCancelEdit}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          className="text-text-secondary hover:text-primary"
                          onClick={() => window.open(`/tool-detail-page?id=${tool.id}`, '_blank')}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit"
                          className="text-text-secondary hover:text-primary"
                          onClick={() => handleInlineEdit(tool)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Trash2"
                          className="text-text-secondary hover:text-error"
                          onClick={() => onDeleteTool(tool.id)}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedTools.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Package" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary text-lg font-medium mb-2">No tools found</p>
          <p className="text-text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ToolManagementTable;
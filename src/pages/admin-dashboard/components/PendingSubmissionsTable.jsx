import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PendingSubmissionsTable = ({ submissions, onApprove, onReject, onBulkAction }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortField, setSortField] = useState('submittedAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(submissions.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSubmissions = [...submissions].sort((a, b) => {
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'AI Writing': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'Image Generation': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'Code Assistant': 'bg-green-500/10 text-green-400 border-green-500/20',
      'Data Analysis': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'Chatbot': 'bg-pink-500/10 text-pink-400 border-pink-500/20'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  return (
    <div className="neumorphic-card overflow-hidden">
      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-primary/5 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-text-primary font-medium">
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="success"
                size="sm"
                iconName="Check"
                onClick={() => onBulkAction('approve', selectedItems)}
              >
                Approve All
              </Button>
              <Button
                variant="danger"
                size="sm"
                iconName="X"
                onClick={() => onBulkAction('reject', selectedItems)}
              >
                Reject All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === submissions.length && submissions.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border bg-background text-primary focus:ring-primary focus:ring-offset-background"
                />
              </th>
              <th className="p-4 text-left text-text-primary font-semibold">Tool</th>
              <th 
                className="p-4 text-left text-text-primary font-semibold cursor-pointer hover:text-primary smooth-transition"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <Icon 
                    name={sortField === 'category' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="p-4 text-left text-text-primary font-semibold cursor-pointer hover:text-primary smooth-transition"
                onClick={() => handleSort('submittedAt')}
              >
                <div className="flex items-center space-x-1">
                  <span>Submitted</span>
                  <Icon 
                    name={sortField === 'submittedAt' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="p-4 text-left text-text-primary font-semibold">Submitter</th>
              <th className="p-4 text-left text-text-primary font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubmissions.map((submission) => (
              <tr key={submission.id} className="border-b border-border hover:bg-surface/50 smooth-transition">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(submission.id)}
                    onChange={(e) => handleSelectItem(submission.id, e.target.checked)}
                    className="rounded border-border bg-background text-primary focus:ring-primary focus:ring-offset-background"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-surface rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={submission.logo}
                        alt={submission.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-text-primary font-medium truncate">{submission.name}</p>
                      <p className="text-text-secondary text-sm truncate">{submission.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(submission.category)}`}>
                    {submission.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-text-secondary text-sm">
                    {formatDate(submission.submittedAt)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-text-primary text-sm">
                    <p className="font-medium">{submission.submitterName}</p>
                    <p className="text-text-secondary">{submission.submitterEmail}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      className="text-text-secondary hover:text-primary"
                      onClick={() => window.open(`/tool-detail-page?id=${submission.id}`, '_blank')}
                    />
                    <Button
                      variant="success"
                      size="sm"
                      iconName="Check"
                      onClick={() => onApprove(submission.id)}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      iconName="X"
                      onClick={() => onReject(submission.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {submissions.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Inbox" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary text-lg font-medium mb-2">No pending submissions</p>
          <p className="text-text-muted">All tool submissions have been reviewed</p>
        </div>
      )}
    </div>
  );
};

export default PendingSubmissionsTable;
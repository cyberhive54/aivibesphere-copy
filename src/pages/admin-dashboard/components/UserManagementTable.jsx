import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementTable = ({ users, onUpdateUser, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortField, setSortField] = useState('joinedAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
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

  const getRoleColor = (role) => {
    const colors = {
      'admin': 'bg-red-500/10 text-red-400 border-red-500/20',
      'moderator': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'user': 'bg-green-500/10 text-green-400 border-green-500/20'
    };
    return colors[role] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-500/10 text-green-400 border-green-500/20',
      'suspended': 'bg-red-500/10 text-red-400 border-red-500/20',
      'pending': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };
    return colors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  return (
    <div className="neumorphic-card overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-border bg-surface/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
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
                  <span>User</span>
                  <Icon 
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="p-4 text-left text-text-primary font-semibold">Role</th>
              <th className="p-4 text-left text-text-primary font-semibold">Status</th>
              <th 
                className="p-4 text-left text-text-primary font-semibold cursor-pointer hover:text-primary smooth-transition"
                onClick={() => handleSort('joinedAt')}
              >
                <div className="flex items-center space-x-1">
                  <span>Joined</span>
                  <Icon 
                    name={sortField === 'joinedAt' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="p-4 text-left text-text-primary font-semibold cursor-pointer hover:text-primary smooth-transition"
                onClick={() => handleSort('ratingsCount')}
              >
                <div className="flex items-center space-x-1">
                  <span>Activity</span>
                  <Icon 
                    name={sortField === 'ratingsCount' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="p-4 text-left text-text-primary font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-surface/50 smooth-transition">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">{user.name}</p>
                      <p className="text-text-secondary text-sm">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-text-secondary text-sm">
                    {formatDate(user.joinedAt)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-text-secondary text-sm">
                    <p>{user.ratingsCount} ratings</p>
                    <p>{user.submissionsCount} submissions</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      className="text-text-secondary hover:text-primary"
                      onClick={() => onUpdateUser(user.id, 'edit')}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName={user.status === 'active' ? 'UserX' : 'UserCheck'}
                      className={user.status === 'active' ? 'text-warning hover:text-warning' : 'text-success hover:text-success'}
                      onClick={() => onUpdateUser(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      className="text-text-secondary hover:text-error"
                      onClick={() => onDeleteUser(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedUsers.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary text-lg font-medium mb-2">No users found</p>
          <p className="text-text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;
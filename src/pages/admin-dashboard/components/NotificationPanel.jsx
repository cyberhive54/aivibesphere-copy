import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    const icons = {
      'submission': 'Plus',
      'rating': 'Star',
      'user': 'User',
      'system': 'Settings',
      'warning': 'AlertTriangle',
      'error': 'AlertCircle'
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colors = {
      'submission': 'text-blue-400 bg-blue-500/10',
      'rating': 'text-yellow-400 bg-yellow-500/10',
      'user': 'text-green-400 bg-green-500/10',
      'system': 'text-purple-400 bg-purple-500/10',
      'warning': 'text-orange-400 bg-orange-500/10',
      'error': 'text-red-400 bg-red-500/10'
    };
    return colors[type] || 'text-gray-400 bg-gray-500/10';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="neumorphic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-mono">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className="text-text-secondary hover:text-primary"
          >
            Mark all read
          </Button>
          <Icon name="Bell" size={20} className="text-text-secondary" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 bg-surface rounded-lg p-1">
        {['all', 'unread', 'read'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium smooth-transition ${
              filter === filterType
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-3 p-3 rounded-lg smooth-transition cursor-pointer ${
              notification.read 
                ? 'hover:bg-surface/50' :'bg-primary/5 border border-primary/20 hover:bg-primary/10'
            }`}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
              <Icon name={getNotificationIcon(notification.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className={`text-sm font-medium ${notification.read ? 'text-text-secondary' : 'text-text-primary'}`}>
                  {notification.title}
                </p>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
              <p className="text-text-secondary text-sm mt-1">
                {notification.message}
              </p>
              <span className="text-text-muted text-xs mt-2 block">
                {formatTimeAgo(notification.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-8">
          <Icon name="BellOff" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">
            {filter === 'unread' ? 'No unread notifications' : 
             filter === 'read' ? 'No read notifications' : 'No notifications'}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
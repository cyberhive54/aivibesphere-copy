import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'tool_submitted': 'Plus',
      'tool_approved': 'Check',
      'tool_rejected': 'X',
      'user_registered': 'UserPlus',
      'rating_added': 'Star',
      'tool_updated': 'Edit',
      'user_suspended': 'UserX',
      'admin_login': 'LogIn'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'tool_submitted': 'text-blue-400 bg-blue-500/10',
      'tool_approved': 'text-green-400 bg-green-500/10',
      'tool_rejected': 'text-red-400 bg-red-500/10',
      'user_registered': 'text-purple-400 bg-purple-500/10',
      'rating_added': 'text-yellow-400 bg-yellow-500/10',
      'tool_updated': 'text-orange-400 bg-orange-500/10',
      'user_suspended': 'text-red-400 bg-red-500/10',
      'admin_login': 'text-cyan-400 bg-cyan-500/10'
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
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="neumorphic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-text-secondary" />
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface/50 smooth-transition">
            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
              <Icon name={getActivityIcon(activity.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm font-medium">
                {activity.title}
              </p>
              <p className="text-text-secondary text-sm mt-1">
                {activity.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-text-muted text-xs">
                  {formatTimeAgo(activity.timestamp)}
                </span>
                {activity.user && (
                  <span className="text-text-secondary text-xs">
                    by {activity.user}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
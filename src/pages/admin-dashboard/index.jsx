import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MetricsCard from './components/MetricsCard';
import PendingSubmissionsTable from './components/PendingSubmissionsTable';
import UserManagementTable from './components/UserManagementTable';
import ToolManagementTable from './components/ToolManagementTable';
import ActivityFeed from './components/ActivityFeed';
import AnalyticsChart from './components/AnalyticsChart';
import NotificationPanel from './components/NotificationPanel';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock admin credentials
  const ADMIN_CREDENTIALS = {
    email: "admin@aivibesphere.com",
    password: "Admin@123"
  };

  // Mock data
  const metricsData = [
    { title: 'Total Tools', value: '1,247', change: '+12%', changeType: 'positive', icon: 'Package', color: 'primary' },
    { title: 'Pending Submissions', value: '23', change: '+5', changeType: 'positive', icon: 'Clock', color: 'warning' },
    { title: 'Active Users', value: '8,492', change: '+18%', changeType: 'positive', icon: 'Users', color: 'success' },
    { title: 'Total Reviews', value: '15,638', change: '+24%', changeType: 'positive', icon: 'Star', color: 'info' }
  ];

  const pendingSubmissions = [
    {
      id: 1,
      name: "AI Content Writer Pro",
      description: "Advanced AI writing assistant for content creation",
      category: "AI Writing",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center",
      submittedAt: "2024-01-15T10:30:00Z",
      submitterName: "John Smith",
      submitterEmail: "john@example.com"
    },
    {
      id: 2,
      name: "Visual AI Designer",
      description: "Create stunning visuals with AI-powered design tools",
      category: "Image Generation",
      logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop&crop=center",
      submittedAt: "2024-01-14T15:45:00Z",
      submitterName: "Sarah Johnson",
      submitterEmail: "sarah@example.com"
    },
    {
      id: 3,
      name: "CodeBot Assistant",
      description: "AI-powered coding companion for developers",
      category: "Code Assistant",
      logo: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&h=100&fit=crop&crop=center",
      submittedAt: "2024-01-13T09:20:00Z",
      submitterName: "Mike Chen",
      submitterEmail: "mike@example.com"
    }
  ];

  const users = [
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice@example.com",
      role: "user",
      status: "active",
      joinedAt: "2024-01-10T00:00:00Z",
      ratingsCount: 45,
      submissionsCount: 2
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "moderator",
      status: "active",
      joinedAt: "2024-01-08T00:00:00Z",
      ratingsCount: 128,
      submissionsCount: 8
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "user",
      status: "suspended",
      joinedAt: "2024-01-05T00:00:00Z",
      ratingsCount: 12,
      submissionsCount: 0
    }
  ];

  const tools = [
    {
      id: 1,
      name: "ChatGPT",
      description: "Advanced conversational AI assistant",
      category: "Chatbot",
      status: "active",
      rating: 4.8,
      reviewsCount: 2456,
      views: 125000,
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center",
      createdAt: "2024-01-01T00:00:00Z"
    },
    {
      id: 2,
      name: "DALL-E 3",
      description: "AI image generation from text descriptions",
      category: "Image Generation",
      status: "active",
      rating: 4.6,
      reviewsCount: 1834,
      views: 98000,
      logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop&crop=center",
      createdAt: "2024-01-02T00:00:00Z"
    }
  ];

  const activities = [
    {
      id: 1,
      type: 'tool_submitted',
      title: 'New Tool Submission',
      description: 'AI Content Writer Pro submitted for review',
      timestamp: new Date(Date.now() - 300000),
      user: 'John Smith'
    },
    {
      id: 2,
      type: 'tool_approved',
      title: 'Tool Approved',
      description: 'Visual AI Designer has been approved and published',
      timestamp: new Date(Date.now() - 600000),
      user: 'Admin'
    },
    {
      id: 3,
      type: 'user_registered',
      title: 'New User Registration',
      description: 'Alice Cooper joined the platform',
      timestamp: new Date(Date.now() - 900000),
      user: 'System'
    },
    {
      id: 4,
      type: 'rating_added',
      title: 'New Rating',
      description: '5-star rating added to ChatGPT',
      timestamp: new Date(Date.now() - 1200000),
      user: 'Bob Wilson'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'submission',
      title: 'New Tool Submission',
      message: 'AI Content Writer Pro requires review',
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Traffic Alert',
      message: 'Server load is above normal threshold',
      timestamp: new Date(Date.now() - 600000),
      read: false
    },
    {
      id: 3,
      type: 'user',
      title: 'User Report',
      message: 'Spam report filed against user Charlie Brown',
      timestamp: new Date(Date.now() - 900000),
      read: true
    }
  ];

  const analyticsData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1350 },
    { name: 'Mar', value: 1180 },
    { name: 'Apr', value: 1420 },
    { name: 'May', value: 1680 },
    { name: 'Jun', value: 1890 },
    { name: 'Jul', value: 2100 }
  ];

  const categoryData = [
    { name: 'AI Writing', value: 320 },
    { name: 'Image Gen', value: 280 },
    { name: 'Code Assistant', value: 240 },
    { name: 'Chatbot', value: 200 },
    { name: 'Data Analysis', value: 160 }
  ];

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('admin-authenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loginForm.email === ADMIN_CREDENTIALS.email && loginForm.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-authenticated', 'true');
    } else {
      setLoginError('Invalid email or password. Use admin@aivibesphere.com / Admin@123');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-authenticated');
    navigate('/homepage');
  };

  const handleApproveSubmission = (id) => {
    console.log('Approving submission:', id);
    // Implementation for approving submission
  };

  const handleRejectSubmission = (id) => {
    console.log('Rejecting submission:', id);
    // Implementation for rejecting submission
  };

  const handleBulkAction = (action, ids) => {
    console.log(`Bulk ${action}:`, ids);
    // Implementation for bulk actions
  };

  const handleUpdateUser = (id, action) => {
    console.log('Updating user:', id, action);
    // Implementation for user updates
  };

  const handleDeleteUser = (id) => {
    console.log('Deleting user:', id);
    // Implementation for user deletion
  };

  const handleUpdateTool = (id, data) => {
    console.log('Updating tool:', id, data);
    // Implementation for tool updates
  };

  const handleDeleteTool = (id) => {
    console.log('Deleting tool:', id);
    // Implementation for tool deletion
  };

  const handleMarkAsRead = (id) => {
    console.log('Marking notification as read:', id);
    // Implementation for marking notification as read
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
    // Implementation for marking all notifications as read
  };

  // Login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="neumorphic-card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} color="white" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">Admin Login</h1>
              <p className="text-text-secondary">Access the admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-text-primary font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  placeholder="Enter admin email"
                  required
                  className="bg-surface border-border"
                />
              </div>

              <div>
                <label className="block text-text-primary font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Enter admin password"
                  required
                  className="bg-surface border-border"
                />
              </div>

              {loginError && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                  <p className="text-error text-sm">{loginError}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-surface/50 rounded-lg">
              <p className="text-text-secondary text-sm mb-2">Demo Credentials:</p>
              <p className="text-text-primary text-sm font-mono">Email: admin@aivibesphere.com</p>
              <p className="text-text-primary text-sm font-mono">Password: Admin@123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'submissions', label: 'Submissions', icon: 'Clock' },
    { id: 'tools', label: 'Tools', icon: 'Package' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
              <p className="text-text-secondary">Manage your AI tools platform</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="ghost"
                iconName="RefreshCw"
                onClick={() => window.location.reload()}
                className="text-text-secondary hover:text-text-primary"
              >
                Refresh
              </Button>
              <Button
                variant="danger"
                iconName="LogOut"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-surface rounded-lg p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium smooth-transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricsData.map((metric, index) => (
                  <MetricsCard key={index} {...metric} />
                ))}
              </div>

              {/* Charts and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnalyticsChart
                  data={analyticsData}
                  title="Monthly Tool Submissions"
                  type="line"
                  color="#6366F1"
                />
                <AnalyticsChart
                  data={categoryData}
                  title="Tools by Category"
                  type="bar"
                  color="#8B5CF6"
                />
              </div>

              {/* Activity and Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ActivityFeed activities={activities} />
                <NotificationPanel
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Pending Submissions</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary text-sm">
                    {pendingSubmissions.length} pending review
                  </span>
                </div>
              </div>
              <PendingSubmissionsTable
                submissions={pendingSubmissions}
                onApprove={handleApproveSubmission}
                onReject={handleRejectSubmission}
                onBulkAction={handleBulkAction}
              />
            </div>
          )}

          {activeTab === 'tools' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Tool Management</h2>
                <Button
                  variant="primary"
                  iconName="Plus"
                  onClick={() => navigate('/tool-submission-form')}
                >
                  Add New Tool
                </Button>
              </div>
              <ToolManagementTable
                tools={tools}
                onUpdateTool={handleUpdateTool}
                onDeleteTool={handleDeleteTool}
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">User Management</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary text-sm">
                    {users.length} total users
                  </span>
                </div>
              </div>
              <UserManagementTable
                users={users}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnalyticsChart
                  data={analyticsData}
                  title="User Growth"
                  type="line"
                  color="#10B981"
                />
                <AnalyticsChart
                  data={categoryData}
                  title="Popular Categories"
                  type="bar"
                  color="#F59E0B"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricsCard
                  title="Page Views"
                  value="2.4M"
                  change="+15%"
                  changeType="positive"
                  icon="Eye"
                  color="info"
                />
                <MetricsCard
                  title="Bounce Rate"
                  value="32%"
                  change="-5%"
                  changeType="positive"
                  icon="TrendingDown"
                  color="success"
                />
                <MetricsCard
                  title="Avg. Session"
                  value="4m 32s"
                  change="+12%"
                  changeType="positive"
                  icon="Clock"
                  color="warning"
                />
                <MetricsCard
                  title="Conversion"
                  value="3.2%"
                  change="+0.8%"
                  changeType="positive"
                  icon="Target"
                  color="primary"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
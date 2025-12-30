import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import Card from '../../components/ui/Card';

const Dashboard = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      label: 'Total Users',
      value: '1,234',
      change: '+12%',
      trend: 'up',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      label: 'Revenue',
      value: '$45,678',
      change: '+8%',
      trend: 'up',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      label: 'Active Projects',
      value: '23',
      change: '+3',
      trend: 'up',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      label: 'Growth Rate',
      value: '23.5%',
      change: '+2.5%',
      trend: 'up',
    },
  ];

  const recentActivity = [
    { id: 1, action: 'New user registered', time: '2 minutes ago' },
    { id: 2, action: 'Project completed', time: '1 hour ago' },
    { id: 3, action: 'Payment received', time: '3 hours ago' },
    { id: 4, action: 'New feature deployed', time: '5 hours ago' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card title="Recent Activity">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                >
                  <p className="text-gray-700">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                <h4 className="font-semibold text-blue-900">Create Project</h4>
                <p className="text-sm text-blue-700 mt-1">Start a new project</p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                <h4 className="font-semibold text-green-900">Add User</h4>
                <p className="text-sm text-green-700 mt-1">Invite team members</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                <h4 className="font-semibold text-purple-900">View Reports</h4>
                <p className="text-sm text-purple-700 mt-1">Analytics & insights</p>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
                <h4 className="font-semibold text-orange-900">Settings</h4>
                <p className="text-sm text-orange-700 mt-1">Configure options</p>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

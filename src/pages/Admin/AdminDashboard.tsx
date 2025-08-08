import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, Clock } from 'lucide-react';
import StatCard from '../../components/Admin/StatCard';
import { dashboardStats } from '../../data/adminData';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: `$${dashboardStats.totalSales.toLocaleString()}`,
      icon: DollarSign,
      change: dashboardStats.salesGrowth,
      changeType: 'increase' as const
    },
    {
      title: 'Total Orders',
      value: dashboardStats.totalOrders,
      icon: ShoppingCart,
      change: dashboardStats.ordersGrowth,
      changeType: 'increase' as const
    },
    {
      title: 'Total Products',
      value: dashboardStats.totalProducts,
      icon: Package
    },
    {
      title: 'Total Users',
      value: dashboardStats.totalUsers,
      icon: Users
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeType={stat.changeType}
              index={index}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {dashboardStats.recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.userName}</p>
                    <p className="text-xs text-gray-500">{order.orderDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${order.total.toLocaleString()}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Add New Product</span>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">View All Orders</span>
                </div>
                <span className="text-green-600 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Manage Users</span>
                </div>
                <span className="text-purple-600 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-900">View Analytics</span>
                </div>
                <span className="text-orange-600 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
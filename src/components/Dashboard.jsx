/**
 * Dashboard Component - Property Management System
 * 
 * This is the main dashboard that shows different interfaces based on user role.
 * It demonstrates role-based UI rendering and serves as the main hub after login.
 * 
 * Features:
 * - Role-based dashboard rendering (Landlord vs Tenant)
 * - Property management overview
 * - Payment tracking
 * - Quick actions and navigation
 * - Responsive design
 * 
 * Learning Goals Demonstrated:
 * - Conditional rendering based on user roles
 * - Component composition
 * - State management
 * - Tailwind CSS for responsive design
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Building2, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Plus,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  // Get user information from auth context
  const { user, logout, hasRole } = useAuth();
  
  // Component state for demo data
  const [stats, setStats] = useState({
    properties: 0,
    tenants: 0,
    monthlyRevenue: 0,
    pendingPayments: 0
  });

  /**
   * Initialize dashboard data based on user role
   */
  useEffect(() => {
    // Mock data based on user role
    if (hasRole('landlord')) {
      setStats({
        properties: 5,
        tenants: 12,
        monthlyRevenue: 45000,
        pendingPayments: 3
      });
    } else if (hasRole('tenant')) {
      setStats({
        rentDue: 15000,
        nextPaymentDate: '2024-02-01',
        messagesUnread: 2,
        maintenanceRequests: 1
      });
    }
  }, [user, hasRole]);

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
  };

  /**
   * Format currency for display
   * @param {number} amount - Amount to format
   * @returns {string} - Formatted currency string
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  /**
   * Landlord Dashboard Component
   */
  const LandlordDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-navy-100">
          Here's an overview of your property portfolio
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-navy-800" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Properties</p>
              <p className="text-2xl font-bold text-gray-900">{stats.properties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-navy-700" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{stats.tenants}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-navy-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.monthlyRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-navy-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => alert('Add Property feature coming soon!')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-5 w-5 text-navy-800 mr-3" />
            <span className="text-sm font-medium text-gray-700">Add New Property</span>
          </button>
          
          <button 
            onClick={() => alert('Manage Tenants feature coming soon!')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-5 w-5 text-navy-700 mr-3" />
            <span className="text-sm font-medium text-gray-700">Manage Tenants</span>
          </button>
          
          <button 
            onClick={() => alert('Messaging feature coming soon!')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="h-5 w-5 text-navy-600 mr-3" />
            <span className="text-sm font-medium text-gray-700">Send Message</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-navy-50 rounded-lg">
            <CreditCard className="h-5 w-5 text-navy-700 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Payment Received</p>
              <p className="text-xs text-gray-600">John Doe paid KES 15,000 for Apartment 2A</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-navy-50 rounded-lg">
            <MessageSquare className="h-5 w-5 text-navy-800 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">New Message</p>
              <p className="text-xs text-gray-600">Jane Smith sent a maintenance request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Tenant Dashboard Component
   */
  const TenantDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-navy-700 to-navy-900 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-navy-100">
          Manage your tenancy and payments easily
        </p>
      </div>

      {/* Rent Status Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Rent Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-navy-50 p-4 rounded-lg">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-navy-800" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Amount Due</p>
                <p className="text-2xl font-bold text-navy-800">
                  {formatCurrency(stats.rentDue)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-navy-100 p-4 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-navy-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Due Date</p>
                <p className="text-2xl font-bold text-navy-700">Feb 1, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pay Rent Button */}
        <div className="mt-6">
          <button 
            onClick={() => alert('M-Pesa payment integration coming soon!')}
            className="w-full bg-navy-800 hover:bg-navy-900 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Pay Rent via M-Pesa
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => alert('Chat feature coming soon!')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="h-5 w-5 text-navy-800 mr-3" />
            <div className="text-left">
              <span className="text-sm font-medium text-gray-700 block">Contact Landlord</span>
              <span className="text-xs text-gray-500">{stats.messagesUnread} unread messages</span>
            </div>
          </button>
          
          <button 
            onClick={() => alert('Maintenance request feature coming soon!')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-5 w-5 text-navy-700 mr-3" />
            <div className="text-left">
              <span className="text-sm font-medium text-gray-700 block">Maintenance Request</span>
              <span className="text-xs text-gray-500">{stats.maintenanceRequests} pending</span>
            </div>
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-navy-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">January 2024</p>
              <p className="text-xs text-gray-600">Paid on Jan 1, 2024</p>
            </div>
            <span className="text-sm font-semibold text-navy-700">
              {formatCurrency(15000)}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-navy-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">December 2023</p>
              <p className="text-xs text-gray-600">Paid on Dec 1, 2023</p>
            </div>
            <span className="text-sm font-semibold text-navy-700">
              {formatCurrency(15000)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-navy-800" />
              <span className="ml-2 text-xl font-bold text-gray-900">PropManager</span>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Render appropriate dashboard based on user role */}
        {hasRole('landlord') ? <LandlordDashboard /> : <TenantDashboard />}
      </main>
    </div>
  );
};

export default Dashboard;
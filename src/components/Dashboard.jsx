import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RealTimeChat from './RealTimeChat';
import TenantChatList from './TenantChatList';
import io from 'socket.io-client';
import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp,
  Calendar,
  Bell,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  const [stats, setStats] = useState({
    properties: 0,
    tenants: 0,
    monthlyRevenue: 0,
    pendingPayments: 0
  });

  useEffect(() => {
    if (user?.role === 'landlord') {
      setStats({
        properties: 5,
        tenants: 12,
        monthlyRevenue: 45000,
        pendingPayments: 3
      });
    } else if (user?.role === 'tenant') {
      setStats({
        rentDue: 15000,
        nextPaymentDate: '2024-02-01',
        messagesUnread: 2,
        maintenanceRequests: 1
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  const LandlordDashboard = () => {
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
      const socket = io('http://localhost:5000');
      socket.emit('join_landlord_room');
      
      socket.on('payment_notification', (notification) => {
        setNotifications(prev => [notification, ...prev.slice(0, 4)]);
        if (Notification.permission === 'granted') {
          new Notification('Payment Received', {
            body: notification.message,
            icon: '/favicon.ico'
          });
        }
      });
      
      return () => socket.close();
    }, []);
    
    useEffect(() => {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }, []);
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.first_name} {user?.last_name}!
          </h1>
          <p className="text-navy-100">
            Here's an overview of your property portfolio
          </p>
        </div>

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

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h2>
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <CreditCard className="h-5 w-5 text-green-700 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Payment Received</p>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500">Transaction: {notification.transaction_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-700">KSh {notification.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <CreditCard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No recent payments</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tenant Communications</h2>
          <TenantChatList userRole="landlord" />
        </div>
      </div>
    );
  };

  const TenantDashboard = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const handlePayRent = () => {
      setShowPaymentModal(true);
    };
    
    const handlePaymentSubmit = async (e) => {
      e.preventDefault();
      if (!phoneNumber) {
        alert('Please enter your phone number');
        return;
      }
      
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          alert('Please log in again');
          return;
        }
        
        const response = await fetch('http://localhost:5000/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            property_id: 1,
            amount: stats.rentDue || 15000,
            phone_number: phoneNumber,
            payment_method: 'mpesa'
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert('STK Push sent! Please check your phone and enter your M-Pesa PIN.');
          setShowPaymentModal(false);
          setPhoneNumber('');
        } else {
          alert(data.error || 'Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please check your connection and try again.');
      }
    };
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-navy-700 to-navy-900 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.first_name} {user?.last_name}!
          </h1>
          <p className="text-navy-100">
            Manage your tenancy and payments easily
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rent Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-navy-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-navy-800" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Amount Due</p>
                  <p className="text-2xl font-bold text-navy-800">
                    {formatCurrency(stats.rentDue || 15000)}
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

          <div className="mt-6">
            <button 
              onClick={handlePayRent}
              className="w-full bg-navy-800 hover:bg-navy-900 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Pay Rent via M-Pesa
            </button>
          </div>
        </div>

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
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chat with Landlord</h2>
          <RealTimeChat propertyId={1} receiverId={1} />
        </div>
        
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Phone Number</h3>
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0712345678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your Safaricom number to receive payment prompt
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-navy-800 text-white py-2 px-4 rounded-lg hover:bg-navy-900 transition-colors"
                  >
                    Send STK Push
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-navy-800" />
              <span className="ml-2 text-xl font-bold text-gray-900">PropManager</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
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

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {user?.role === 'landlord' ? <LandlordDashboard /> : <TenantDashboard />}
      </main>
    </div>
  );
};

export default Dashboard;
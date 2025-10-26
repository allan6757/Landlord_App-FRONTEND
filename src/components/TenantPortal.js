import React, { useState } from 'react';
import { Home, CreditCard, MessageCircle, ArrowLeft, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import STKPushPayment from './STKPushPayment';
import Chat from './Chat';

const TenantPortal = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPayment, setShowPayment] = useState(false);

  // Mock tenant data
  const tenantData = {
    name: 'John Doe',
    property: 'Sunset Apartments',
    unit: 'A1',
    monthlyRent: 25000,
    nextDueDate: '2024-02-01',
    landlord: 'Sarah Wilson',
    address: '123 Main St, Nairobi'
  };

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, amount: 25000, date: '2024-01-01', status: 'paid', method: 'M-Pesa', reference: 'MP240101001' },
    { id: 2, amount: 25000, date: '2023-12-01', status: 'paid', method: 'M-Pesa', reference: 'MP231201001' },
    { id: 3, amount: 25000, date: '2023-11-01', status: 'paid', method: 'M-Pesa', reference: 'MP231101001' },
    { id: 4, amount: 25000, date: '2023-10-01', status: 'paid', method: 'M-Pesa', reference: 'MP231001001' }
  ]);

  const handlePaymentSuccess = (paymentData) => {
    const newPayment = {
      id: Date.now(),
      amount: paymentData.amount,
      date: new Date().toISOString().split('T')[0],
      status: 'paid',
      method: 'M-Pesa',
      reference: paymentData.reference
    };
    setPaymentHistory([newPayment, ...paymentHistory]);
    setShowPayment(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'overdue': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showPayment) {
    return (
      <STKPushPayment
        amount={tenantData.monthlyRent}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Home className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Tenant Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {tenantData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 mb-8 border-b">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'payments', label: 'Payments' },
            { id: 'history', label: 'Payment History' },
            { id: 'chat', label: 'Messages' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Property Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400" 
                    alt={tenantData.property}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Property</label>
                    <p className="text-lg font-semibold text-gray-900">{tenantData.property}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Unit</label>
                    <p className="text-lg font-semibold text-gray-900">{tenantData.unit}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-700">{tenantData.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Landlord</label>
                    <p className="text-gray-700">{tenantData.landlord}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Status Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <CreditCard className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Monthly Rent</p>
                  <p className="text-2xl font-bold text-gray-900">KSh {tenantData.monthlyRent.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Next Due Date</p>
                  <p className="text-lg font-semibold text-gray-900">{tenantData.nextDueDate}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-green-600">Up to Date</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Make Payment</h3>
            <div className="max-w-md mx-auto text-center">
              <div className="mb-6">
                <CreditCard className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Pay Your Rent</h4>
                <p className="text-gray-600 mb-4">
                  Secure payment via M-Pesa STK Push
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">Amount Due</p>
                  <p className="text-3xl font-bold text-indigo-600">KSh {tenantData.monthlyRent.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Due: {tenantData.nextDueDate}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Pay with M-Pesa
              </button>
            </div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map(payment => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        KSh {payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.reference}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(payment.status)}
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <Chat userRole="tenant" />
        )}
      </div>
    </div>
  );
};

export default TenantPortal;
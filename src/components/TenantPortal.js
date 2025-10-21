import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, CreditCard, Home, Calendar } from 'lucide-react';
import STKPushPayment from './STKPushPayment';
import Chat from './Chat';

const TenantPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tenantData = {
    name: 'John Doe',
    property: 'Sunset Apartments',
    unit: 'Unit 5A',
    address: '123 Main St, Nairobi',
    rent: 25000,
    dueDate: '1st of every month',
    landlord: 'Jane Smith'
  };

  const [paymentHistory] = useState([
    { id: 1, date: '2024-01-01', amount: 25000, status: 'paid', reference: 'MPX123456' },
    { id: 2, date: '2023-12-01', amount: 25000, status: 'paid', reference: 'MPX123455' },
    { id: 3, date: '2023-11-01', amount: 25000, status: 'paid', reference: 'MPX123454' },
    { id: 4, date: '2023-10-01', amount: 25000, status: 'paid', reference: 'MPX123453' }
  ]);

  const nextPaymentDue = new Date();
  nextPaymentDue.setMonth(nextPaymentDue.getMonth() + 1);
  nextPaymentDue.setDate(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Users className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Tenant Portal</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'payment' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Pay Rent
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'history' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'chat' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Messages
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <Home className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Property</p>
                      <p className="font-medium text-gray-900">{tenantData.property}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Unit</p>
                      <p className="font-medium text-gray-900">{tenantData.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{tenantData.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Landlord</p>
                      <p className="font-medium text-gray-900">{tenantData.landlord}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Rent</p>
                      <p className="text-2xl font-bold text-gray-900">KSh {tenantData.rent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Due Date</p>
                      <p className="font-medium text-gray-900">{tenantData.dueDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow p-6 text-white mb-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 mr-2" />
                    <h3 className="text-lg font-semibold">Next Payment</h3>
                  </div>
                  <p className="text-2xl font-bold mb-2">KSh {tenantData.rent.toLocaleString()}</p>
                  <p className="text-indigo-100">Due: {nextPaymentDue.toLocaleDateString()}</p>
                  <button
                    onClick={() => setActiveTab('payment')}
                    className="w-full mt-4 bg-white text-indigo-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Pay Now
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
                  <div className="space-y-3">
                    {paymentHistory.slice(0, 3).map(payment => (
                      <div key={payment.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{payment.date}</p>
                          <p className="text-xs text-gray-600">{payment.reference}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">KSh {payment.amount.toLocaleString()}</p>
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pay Rent</h2>
            <STKPushPayment 
              amount={tenantData.rent}
              propertyName={tenantData.property}
              unit={tenantData.unit}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map(payment => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">KSh {payment.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.reference}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'chat' && <Chat userType="tenant" />}
      </div>
    </div>
  );
};

export default TenantPortal;
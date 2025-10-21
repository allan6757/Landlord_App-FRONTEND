import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, MessageCircle, CreditCard } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">PropManager</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your rental property management with our comprehensive platform. Track 
            payments, communicate with tenants, and manage properties all in one place.
          </p>
        </div>

        {/* Portal Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Landlord Portal</h2>
            <p className="text-gray-600 mb-6">
              Manage your properties, track rent payments, and communicate with tenants efficiently.
            </p>
            <button
              onClick={() => navigate('/landlord')}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Login as Landlord
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tenant Portal</h2>
            <p className="text-gray-600 mb-6">
              Pay rent securely via M-Pesa, view payment history, and chat with your landlord.
            </p>
            <button
              onClick={() => navigate('/tenant')}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Login as Tenant
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">M-Pesa Integration</h3>
            <p className="text-gray-600">
              Secure STK push payments for quick and easy rent transactions
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Management</h3>
            <p className="text-gray-600">
              Centralized dashboard to manage all your rental properties
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Chat</h3>
            <p className="text-gray-600">
              Instant communication between landlords and tenants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
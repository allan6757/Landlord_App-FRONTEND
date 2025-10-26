import React from 'react';
import { Building2, Users, MessageCircle, CreditCard } from 'lucide-react';

const LandingPage = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">PropManager</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Streamline your rental property management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track payments, communicate with tenants, and manage properties all in one place.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Landlord Portal</h3>
            <p className="text-gray-600 mb-6">
              Manage your properties, track rent payments, and communicate with tenants efficiently.
            </p>
            <button
              onClick={() => onRoleSelect('landlord')}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Login as Landlord
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tenant Portal</h3>
            <p className="text-gray-600 mb-6">
              Pay rent securely via M-Pesa, view payment history, and chat with your landlord.
            </p>
            <button
              onClick={() => onRoleSelect('tenant')}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Login as Tenant
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">M-Pesa Integration</h4>
            <p className="text-gray-600">
              Secure STK push payments for quick and easy rent transactions
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Property Management</h4>
            <p className="text-gray-600">
              Centralized dashboard to manage all your rental properties
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Chat</h4>
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
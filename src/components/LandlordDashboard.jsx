/**
 * Landlord Dashboard Component - Property Management System
 * 
 * This component provides the main dashboard for landlords to manage their properties,
 * view tenants, track payments, and communicate with tenants.
 * 
 * Features:
 * - Property portfolio overview
 * - Add/Edit properties and units
 * - View M-Pesa payment statements
 * - Chat with tenants
 * - Create apartment broadcasts
 * 
 * Learning Goals Demonstrated:
 * - React Hooks (useState, useEffect)
 * - Component composition
 * - State management
 * - API integration
 * - Real-time updates
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { propertyService, broadcastService } from '../services/propertyService';
import { paymentService } from '../services/paymentService';
import { chatService } from '../services/chatService';
import { 
  Building2, 
  Plus, 
  Users, 
  DollarSign, 
  MessageSquare,
  Settings,
  Eye,
  Edit,
  Home,
  Receipt,
  Bell
} from 'lucide-react';

const LandlordDashboard = () => {
  // Authentication context
  const { user } = useAuth();
  
  // State management for dashboard data
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [units, setUnits] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  /**
   * Load initial dashboard data
   * Fetches properties, payments, and other landlord data
   */
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load properties owned by landlord
        const propertiesResponse = await propertyService.getProperties();
        if (propertiesResponse.success) {
          setProperties(propertiesResponse.data || []);
          
          // Load first property details if available
          if (propertiesResponse.data?.length > 0) {
            setSelectedProperty(propertiesResponse.data[0]);
            await loadPropertyUnits(propertiesResponse.data[0].id);
          }
        }
        
        // Load recent payments
        const paymentsResponse = await paymentService.getPayments();
        if (paymentsResponse.success) {
          setPayments(paymentsResponse.data || []);
        }
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        
        // Use mock data for development when CORS blocks API
        if (error.message.includes('Failed to fetch')) {
          console.log('Using mock data for development');
          setProperties([
            {
              id: 1,
              name: 'Greenshade Apartments',
              address: '123 Main Street, Nairobi',
              description: 'Modern apartment complex with 12 units',
              total_units: 12,
              monthly_revenue: 300000
            },
            {
              id: 2,
              name: 'Sunset Villas',
              address: '456 Oak Avenue, Nairobi',
              description: 'Luxury villas with garden views',
              total_units: 6,
              monthly_revenue: 180000
            }
          ]);
          
          setPayments([
            {
              id: 1,
              tenant_name: 'John Doe',
              unit_number: 'A1',
              property_name: 'Greenshade Apartments',
              amount: 25000,
              payment_date: '2024-01-15',
              payment_method: 'M-Pesa'
            }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  /**
   * Load units for a specific property
   * @param {number} propertyId - ID of the property
   */
  const loadPropertyUnits = async (propertyId) => {
    try {
      const response = await propertyService.getUnits(propertyId);
      if (response.success) {
        setUnits(response.data || []);
      }
    } catch (error) {
      console.error('Error loading units:', error);
      
      // Use mock units data for development
      if (error.message.includes('Failed to fetch')) {
        const mockUnits = [
          {
            id: 1,
            unit_number: 'A1',
            rent: 25000,
            unit_type: '2bedroom',
            tenant: { first_name: 'John', last_name: 'Doe' }
          },
          {
            id: 2,
            unit_number: 'A2',
            rent: 25000,
            unit_type: '2bedroom',
            tenant: null
          },
          {
            id: 3,
            unit_number: 'B1',
            rent: 30000,
            unit_type: '3bedroom',
            tenant: { first_name: 'Jane', last_name: 'Smith' }
          }
        ];
        setUnits(mockUnits);
      }
    }
  };

  /**
   * Handle property selection
   * @param {object} property - Selected property object
   */
  const handlePropertySelect = async (property) => {
    setSelectedProperty(property);
    await loadPropertyUnits(property.id);
  };

  /**
   * Dashboard Statistics Component
   * Shows key metrics for the landlord
   */
  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Properties</p>
            <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <Home className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Units</p>
            <p className="text-2xl font-bold text-gray-900">{units.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-purple-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Tenants</p>
            <p className="text-2xl font-bold text-gray-900">
              {units.filter(unit => unit.tenant).length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-yellow-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              KSh {units.reduce((total, unit) => total + (unit.rent || 0), 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Properties List Component
   * Shows all properties with management options
   */
  const PropertiesList = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">My Properties</h2>
          <button 
            onClick={() => setActiveTab('add-property')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {properties.length === 0 ? (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No properties yet. Add your first property to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div 
                key={property.id} 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedProperty?.id === property.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePropertySelect(property)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">{property.name}</h3>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-blue-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                <p className="text-sm text-gray-600 mb-3">{property.description}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Units: {property.total_units || 0}</span>
                  <span className="text-green-600 font-medium">
                    KSh {(property.monthly_revenue || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  /**
   * Units Management Component
   * Shows units for selected property
   */
  const UnitsManagement = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Units - {selectedProperty?.name || 'Select a Property'}
          </h2>
          {selectedProperty && (
            <button 
              onClick={() => setActiveTab('add-unit')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Unit
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {!selectedProperty ? (
          <p className="text-gray-600 text-center py-8">Select a property to view its units</p>
        ) : units.length === 0 ? (
          <div className="text-center py-8">
            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No units in this property. Add units to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit) => (
              <div key={unit.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">Unit {unit.unit_number}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    unit.tenant 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {unit.tenant ? 'Occupied' : 'Vacant'}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">Rent: KSh {(unit.rent || 0).toLocaleString()}</p>
                  {unit.tenant && (
                    <p className="text-gray-600">
                      Tenant: {unit.tenant.first_name} {unit.tenant.last_name}
                    </p>
                  )}
                  <p className="text-gray-600">Type: {unit.unit_type}</p>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-sm">
                    Bills
                  </button>
                  {unit.tenant && (
                    <button className="text-purple-600 hover:text-purple-800 text-sm">
                      Chat
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  /**
   * Recent Payments Component
   * Shows M-Pesa payment statements
   */
  const RecentPayments = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View All Statements
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {payments.length === 0 ? (
          <div className="text-center py-8">
            <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No payments received yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {payment.tenant_name} - Unit {payment.unit_number}
                  </p>
                  <p className="text-sm text-gray-600">{payment.property_name}</p>
                  <p className="text-xs text-gray-500">{payment.payment_date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    KSh {payment.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{payment.payment_method}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Landlord Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
              </button>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Welcome, {user?.first_name}</p>
                <p className="text-gray-600">Property Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Building2 },
              { id: 'properties', label: 'Properties', icon: Home },
              { id: 'payments', label: 'Payments', icon: DollarSign },
              { id: 'chats', label: 'Messages', icon: MessageSquare },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PropertiesList />
              <RecentPayments />
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-8">
            <PropertiesList />
            {selectedProperty && <UnitsManagement />}
          </div>
        )}

        {activeTab === 'payments' && (
          <RecentPayments />
        )}

        {activeTab === 'chats' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
            <p className="text-gray-600">Chat functionality will be implemented here.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel will be implemented here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandlordDashboard;
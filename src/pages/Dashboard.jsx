/**
 * Dashboard Component - Property Management System
 * 
 * This component routes users to their role-specific dashboards.
 * Landlords see property management features, tenants see payment portal.
 * 
 * Learning Goals Demonstrated:
 * - Role-based routing
 * - Component composition
 * - Authentication integration
 * - User experience design
 */

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LandlordDashboard from '../components/LandlordDashboard';
import TenantPortal from '../components/TenantPortal';

const Dashboard = () => {
  const { user, getUserRole } = useAuth();
  
  // Get user role from profile or user object
  const userRole = getUserRole();
  
  // Route to appropriate dashboard based on user role
  if (userRole === 'landlord') {
    return <LandlordDashboard />;
  } else if (userRole === 'tenant') {
    return <TenantPortal />;
  }
  
  // Fallback for users without proper role
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to PropertyHub</h2>
        <p className="text-gray-600 mb-4">
          Your account role is not properly set. Please contact support.
        </p>
        <p className="text-sm text-gray-500">
          User: {user?.email} | Role: {userRole || 'Not set'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
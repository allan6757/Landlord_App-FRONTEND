/**
 * Empty State Component - User Onboarding
 * 
 * Provides helpful empty states for new users to guide them through
 * the application features and encourage engagement.
 * 
 * Learning Goals Demonstrated:
 * - User experience design principles
 * - Component reusability patterns
 * - Conditional rendering
 * - Call-to-action design
 */

import React from 'react';
import { Building2, Home, CreditCard, MessageSquare, Plus } from 'lucide-react';

const EmptyState = ({ type, onAction }) => {
  const emptyStates = {
    properties: {
      icon: <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />,
      title: "No Properties Yet",
      description: "Start building your property portfolio by adding your first property. You can manage multiple properties and their units from here.",
      actionText: "Add Your First Property",
      actionIcon: <Plus className="h-4 w-4 mr-2" />
    },
    units: {
      icon: <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />,
      title: "No Units Configured",
      description: "Add units to this property to start managing tenants and collecting rent. Each unit can have its own rent amount and tenant.",
      actionText: "Configure Units",
      actionIcon: <Plus className="h-4 w-4 mr-2" />
    },
    payments: {
      icon: <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />,
      title: "No Payments Yet",
      description: "Once tenants start paying rent through M-Pesa, you'll see all payment transactions and receipts here.",
      actionText: "View Payment Setup",
      actionIcon: <CreditCard className="h-4 w-4 mr-2" />
    },
    tenantUnit: {
      icon: <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />,
      title: "No Unit Assigned",
      description: "You haven't been assigned to a unit yet. Please contact your landlord to get access to your rental unit dashboard.",
      actionText: "Contact Support",
      actionIcon: <MessageSquare className="h-4 w-4 mr-2" />
    },
    tenantPayments: {
      icon: <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />,
      title: "No Payment History",
      description: "Your payment history will appear here once you make your first rent payment via M-Pesa.",
      actionText: "Make Payment",
      actionIcon: <CreditCard className="h-4 w-4 mr-2" />
    }
  };

  const state = emptyStates[type] || emptyStates.properties;

  return (
    <div className="text-center py-12 px-6">
      {state.icon}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{state.title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{state.description}</p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {state.actionIcon}
          {state.actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
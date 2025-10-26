import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LandlordDashboard from './components/LandlordDashboard';
import TenantPortal from './components/TenantPortal';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentView(role === 'landlord' ? 'landlord' : 'tenant');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setUserRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'landing' && (
        <LandingPage onRoleSelect={handleRoleSelect} />
      )}
      {currentView === 'landlord' && (
        <LandlordDashboard onBack={handleBackToLanding} />
      )}
      {currentView === 'tenant' && (
        <TenantPortal onBack={handleBackToLanding} />
      )}
    </div>
  );
}

export default App;
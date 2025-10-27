import React, { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import LandlordDashboard from './components/LandlordDashboard.jsx';
import TenantPortal from './components/TenantPortal.jsx';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState({
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    profile: { role: 'landlord', id: 1 }
  });

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setUser({
      ...user,
      profile: { ...user.profile, role }
    });
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
        <LandlordDashboard onBack={handleBackToLanding} user={user} />
      )}
      {currentView === 'tenant' && (
        <TenantPortal onBack={handleBackToLanding} user={user} />
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import LandlordDashboard from './components/LandlordDashboard.jsx';
import TenantPortal from './components/TenantPortal.jsx';
import LoginForm from './components/auth/LoginForm.jsx';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentView('login');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView(userRole === 'landlord' ? 'landlord' : 'tenant');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setUserRole(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'landing' && (
        <LandingPage onRoleSelect={handleRoleSelect} />
      )}
      {currentView === 'login' && (
        <LoginForm onLogin={handleLogin} userType={userRole} />
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
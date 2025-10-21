import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LandlordDashboard from './components/LandlordDashboard';
import TenantPortal from './components/TenantPortal';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landlord" element={<LandlordDashboard />} />
          <Route path="/tenant" element={<TenantPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
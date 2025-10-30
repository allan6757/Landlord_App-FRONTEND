import React, { useState } from 'react';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testEndpoints = async () => {
    setLoading(true);
    const endpoints = [
      '/health',
      '/api/auth/login',
      '/auth/login',
      '/login'
    ];

    const results = [];
    const baseUrl = 'https://landlord-app-backend-1eph.onrender.com';

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@test.com', password: 'test' })
        });
        
        const data = await response.text();
        results.push(`${endpoint}: ${response.status} - ${data.substring(0, 100)}`);
      } catch (error) {
        results.push(`${endpoint}: ERROR - ${error.message}`);
      }
    }

    setResult(results.join('\n\n'));
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-100 m-4 rounded">
      <h3 className="text-lg font-bold mb-4">API Endpoint Test</h3>
      <button 
        onClick={testEndpoints}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? 'Testing...' : 'Test API Endpoints'}
      </button>
      <pre className="bg-white p-4 rounded text-sm overflow-auto max-h-96">
        {result || 'Click button to test endpoints'}
      </pre>
    </div>
  );
};

export default ApiTest;
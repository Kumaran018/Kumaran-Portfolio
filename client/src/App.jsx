import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MacbookCanvas from './three/MacbookCanvas';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  // Private Route check
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    return token ? children : <Navigate to="/admin/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Main Flow: MacBook Intro -> Portfolio Website */}
        <Route 
          path="/" 
          element={<Portfolio />} 
        />

        {/* Administration routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

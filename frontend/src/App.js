import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Components
import HeroPage from './components/HeroPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BedAllotment from './components/BedAllotment';
import InfectionMonitor from './components/InfectionMonitor';
import MedicineTracker from './components/MedicineTracker';
import SurgeMonitor from './components/SurgeMonitor';
import GreenScore from './components/GreenScore';
import StaffSchedule from './components/StaffSchedule';
import AIChatbot from './components/AIChatbot';
import AlertFeed from './components/AlertFeed';
import WardMap from './components/WardMap';
import Sidebar from './components/Sidebar';
import Patients from './components/Patients';


function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [alerts, setAlerts] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('jeevixa_user');
    const savedTheme = localStorage.getItem('jeevixa_theme') || 'light';
    if (savedUser) setUser(JSON.parse(savedUser));
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('jeevixa_user', JSON.stringify(userData));
    localStorage.setItem('jeevixa_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jeevixa_user');
    localStorage.removeItem('jeevixa_token');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('jeevixa_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  // Protected Route
  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar
          user={user}
          theme={theme}
          language={language}
          onLogout={handleLogout}
          onToggleTheme={toggleTheme}
          onToggleLanguage={toggleLanguage}
        />
        <div style={{ flex: 1, marginLeft: '260px', transition: 'all 0.3s ease' }}>
          {children}
        </div>
        <AIChatbot user={user} language={language} />
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!user ? <HeroPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} theme={theme} /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard user={user} language={language} /></ProtectedRoute>} />
        <Route path="/beds" element={<ProtectedRoute><BedAllotment language={language} /></ProtectedRoute>} />
        <Route path="/infection" element={<ProtectedRoute><InfectionMonitor language={language} /></ProtectedRoute>} />
        <Route path="/medicine" element={<ProtectedRoute><MedicineTracker language={language} /></ProtectedRoute>} />
        <Route path="/surge" element={<ProtectedRoute><SurgeMonitor language={language} /></ProtectedRoute>} />
        <Route path="/green" element={<ProtectedRoute><GreenScore language={language} /></ProtectedRoute>} />
        <Route path="/staff" element={<ProtectedRoute><StaffSchedule language={language} /></ProtectedRoute>} />
        <Route path="/wards" element={<ProtectedRoute><WardMap language={language} /></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute><AlertFeed language={language} /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute><Patients language={language} /></ProtectedRoute>} />    

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
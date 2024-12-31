import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from "./components/auth/AuthContext";
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';
import Layout from './components/Layout';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="settings/:page" element={<SettingsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
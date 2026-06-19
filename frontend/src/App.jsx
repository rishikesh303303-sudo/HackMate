import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import TeamDashboard from './pages/TeamDashboard';
import FindTeam from './pages/FindTeam';
import Profile from './pages/Profile';
import Hackathons from './pages/Hackathons/Hackathons';
import Notifications from './pages/Notifications/Notifications';
import TeamChat from './pages/Chat/TeamChat'; 
import Settings from './pages/Settings/Settings';

import Navbar from './components/Navbar';

function LayoutWrapper({ children }) {
  const location = useLocation();
  
  const hideNavbarOn = ['/', '/auth'];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team-dashboard" element={<TeamDashboard />} />
              <Route path="/find-team" element={<FindTeam />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/hackathons" element={<Hackathons />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/chat" element={<TeamChat />} /> 
              <Route path="/settings" element={<Settings />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </LayoutWrapper>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
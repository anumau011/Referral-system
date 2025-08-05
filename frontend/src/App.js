import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Users from './components/Users';
import Navbar from './components/Navbar';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
`;

const ContentContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <AppContainer>
        <Login onLogin={handleLogin} />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Router>
        <Navbar user={currentUser} onLogout={handleLogout} />
        <ContentContainer>
          <Routes>
            <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ContentContainer>
      </Router>
    </AppContainer>
  );
}

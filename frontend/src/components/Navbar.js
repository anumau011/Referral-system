import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0 2rem;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled.h1`
  color: #667eea;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.active ? '#667eea' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  color: #333;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff5252;
  }
`;

export default function Navbar({ user, onLogout }) {
  const location = useLocation();

  return (
    <NavContainer>
      <NavContent>
        <Logo>Refrel System</Logo>
        <NavLinks>
          <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>
            Dashboard
          </NavLink>
          <NavLink to="/leaderboard" active={location.pathname === '/leaderboard'}>
            Leaderboard
          </NavLink>
          <NavLink to="/users" active={location.pathname === '/users'}>
            All Users
          </NavLink>
        </NavLinks>
        <UserInfo>
          <UserName>Hi, {user?.name || 'User'}!</UserName>
          <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        </UserInfo>
      </NavContent>
    </NavContainer>
  );
}

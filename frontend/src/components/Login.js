import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_URLS } from '../config/api';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  margin-top: 1rem;
  text-decoration: underline;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: #ffebee;
  padding: 0.5rem;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  background: #e8f5e8;
  padding: 0.5rem;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

export default function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (isSignup) {
      // Sign up new user
      try {
        const response = await axios.post(API_URLS.USER, formData);
        setSuccess('Account created successfully!');
        setTimeout(() => onLogin(response.data), 1500);
      } catch (err) {
        setError(err.response?.data?.error || 'Error creating account');
      }
    } else {
      // Login with dummy data or use name to find user
      try {
        const response = await axios.get(API_URLS.USER_BY_CODE(formData.name.toLowerCase().replace(/\s+/g, '') + '2025'));
        onLogin(response.data);
      } catch (err) {
        // Use dummy data for login
        onLogin({
          name: formData.name || 'John Doe',
          referralCode: (formData.name || 'johndoe').toLowerCase().replace(/\s+/g, '') + '2025',
          totalDonations: 1234,
          email: formData.email || 'john@example.com'
        });
      }
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>{isSignup ? 'Join Refrel' : 'Welcome Back'}</Title>
        <Subtitle>
          {isSignup 
            ? 'Create your account and start referring!' 
            : 'Sign in to your referral dashboard'
          }
        </Subtitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          {isSignup && (
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          )}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Sign In')}
          </Button>
        </Form>
        
        <ToggleButton onClick={() => setIsSignup(!isSignup)}>
          {isSignup 
            ? 'Already have an account? Sign In' 
            : 'New here? Create Account'
          }
        </ToggleButton>
      </LoginCard>
    </LoginContainer>
  );
}

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      // Replace with actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const user = await response.json();
        dispatch(loginSuccess(user));
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </Form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </LoginContainer>
  );
}

export default Login;
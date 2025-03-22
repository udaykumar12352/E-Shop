import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginSuccess } from '../store/slices/authSlice';

const RegisterContainer = styled.div`
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

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Replace with actual API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const user = await response.json();
        dispatch(loginSuccess(user));
        navigate('/');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <RegisterContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </Form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </RegisterContainer>
  );
}

export default Register;
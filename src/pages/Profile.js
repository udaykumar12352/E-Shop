import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateProfile } from '../store/slices/authSlice';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 400px;
`;

const OrderHistory = styled.div`
  margin-top: 2rem;
`;

function Profile() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual API call
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(updateProfile(updatedUser));
        alert('Profile updated successfully');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ProfileContainer>
      <h1>My Profile</h1>
      
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={profileData.phone}
          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
        />
        <button type="submit">Update Profile</button>
      </Form>

      <OrderHistory>
        <h2>Order History</h2>
        {/* Add order history implementation */}
      </OrderHistory>
    </ProfileContainer>
  );
}

export default Profile;
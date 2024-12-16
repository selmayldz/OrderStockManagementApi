import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileUpdate.css';

const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    password: '',
    customerPhoto: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    fetch('http://localhost:5048/api/Customers/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch profile');
        }
      })
      .then((data) => {
        setFormData({
          customerName: data.customerName,
          password: '',
          customerPhoto: data.customerPhoto,
        });
      })
      .catch((error) => {
        console.error(error);
        alert('Unable to fetch profile data.');
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:5048/api/Customers/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Profile updated successfully!');
          navigate('/profile');
        } else {
          throw new Error('Failed to update profile');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Unable to update profile.');
      });
  };

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <div className="profile-update-body">
      <div className="profile-update-page">
        <a href="#" className="profile-update-back-button" onClick={handleBack}>← Back</a>
        <h2>Update Profile</h2>
        <div className="profile-update-form-group">
          <img src={formData.customerPhoto} alt="Preview" className="profile-update-photo-preview" />
        </div>
        <form onSubmit={handleSubmit} className="profile-update-form">
          <div className="profile-update-form-group">
            <label htmlFor="customerName">Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile-update-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile-update-form-group">
            <label htmlFor="customerPhoto">Photo URL</label>
            <input
              type="url"
              id="customerPhoto"
              name="customerPhoto"
              value={formData.customerPhoto}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="profile-update-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;

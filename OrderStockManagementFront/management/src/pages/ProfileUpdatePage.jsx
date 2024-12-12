import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileUpdate.css';

const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    budget: 0,
    customerType: '',
    customerPhoto: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    // Fetch current profile data
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
          budget: data.budget,
          customerType: data.customerType,
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
    <div className="profile-update-page">
      <a href="#" class="back-button" onClick={handleBack}>← Back</a>
      <h2>Update Profile</h2>
      <div className="form-group">
          <img src={formData.customerPhoto} alt="Preview" className="photo-preview" />
      </div>
      <form onSubmit={handleSubmit} className="profile-update-form">
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="budget">Budget</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerType">Type</label>
          <input
            type="text"
            id="customerType"
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;

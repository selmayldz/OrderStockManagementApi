import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

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
      .then((data) => setProfileData(data))
      .catch((error) => {
        console.error(error);
        alert('Unable to fetch profile data.');
      });
  }, [navigate]);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  const handleBack = () => {
    navigate('/home');
  };

  const handleProfileUpdate = () => {
    navigate('/profile/update');
  };

  return (
    <div className="profile-body">
      <div className="profile-page">
        <a href="#" class="profile-back-button" onClick={handleBack}>← Back</a>
        <h2>Profile</h2>
        <div className="profile-profile-details">
          <img
            src={profileData.customerPhoto}
            alt={`${profileData.customerName}'s Avatar`}
            className="profile-photo"
          />
          <p><strong>Name:</strong> {profileData.customerName}</p>
          <p><strong>Budget:</strong> ${profileData.budget}</p>
          <p><strong>Type:</strong> {profileData.customerType}</p>
          <p><strong>Total Spend:</strong> ${profileData.totalSpend}</p>
        </div>
        <button className="profile-button" onClick={handleProfileUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

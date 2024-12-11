import React from 'react';
import '../styles/Profile.css';

const ProfilePage = ({ profileData }) => {
  const { customerName, budget, totalSpend, customerPhoto, customerType } = profileData;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-photo">
          <img src={customerPhoto} alt={`${customerName}'s profile`} />
        </div>
        <div className="profile-details">
          <h2 className="profile-name">{customerName}</h2>
          <p className="profile-info">
            <strong>Customer Type:</strong> {customerType}
          </p>
          <p className="profile-info">
            <strong>Budget:</strong> ${budget}
          </p>
          <p className="profile-info">
            <strong>Total Spend:</strong> ${totalSpend}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

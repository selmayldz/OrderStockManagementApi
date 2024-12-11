import React from 'react';
import '../styles/Home.css';

const HomePage = () => {
  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" />
          <h1 className="app-name">Öz Elbistanlılar Trendyol</h1>
        </div>
        <div className="header-buttons">
          <button className="header-button">My orders</button>
          <button className="header-button">Profile</button>
          <button className="header-button">Logout</button>
        </div>
      </header>
    </div>
  );
};

export default HomePage; 

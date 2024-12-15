import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          console.error('No authentication token found');
          return;
        }

        const response = await fetch('http://localhost:5048/api/Products', {
          method: 'GET',
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          console.error('Error fetching products:', response.statusText);
          return;
        }

        const data = await response.json();
        console.log(data);
        setProducts(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
      <div>
        <header className="home-header">
          <div className="home-logo-container">
            <img src="logo.png" alt="Logo" className="home-logo" />
            <h1 className="home-app-name">Öz Elbistanlılar Trendyol</h1>
          </div>
          <div className="home-header-buttons">
            <button className="home-header-button">My Orders</button>
            <button className="home-header-button" onClick={handleProfile}>Profile</button>
            <button className="home-header-button" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        
        <div className="home-products-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.productName}
                className="home-product-card"
                onClick={() => handleProductClick(product.productId)}
              >
                <img src={product.productPhoto} alt={product.productName} className="home-product-image" />
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))
          ) : (
            <p>Loading products...</p> 
          )}
        </div>
      </div>
  );
};

export default HomePage;

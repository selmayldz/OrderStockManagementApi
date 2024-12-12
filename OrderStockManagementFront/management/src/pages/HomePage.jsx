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
      <header className="header">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" />
          <h1 className="app-name">Öz Elbistanlılar Trendyol</h1>
        </div>
        <div className="header-buttons">
          <button className="header-button">My Orders</button>
          <button className="header-button" onClick={handleProfile}>Profile</button>
          <button className="header-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.productName}
              className="product-card"
              onClick={() => handleProductClick(product.productName)}
            >
              <img src={product.productPhoto} alt={product.productName} className="product-image" />
              <h3>{product.productName}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
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

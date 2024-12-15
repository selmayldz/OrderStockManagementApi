import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No authentication token found');
        return;
      }

      try {
        console.log(productId)
        const response = await fetch(
          `http://localhost:5048/api/Products/${productId}`, 
          {
            method: 'GET',
            headers: {
              accept: '*/*',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  /*
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 && value <= 5) {
      setQuantity(value);
    }
  };
  
  const handleOrder = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('Authentication token is missing. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5048/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity,
          productId: parseInt(productId, 10),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an issue placing your order. Please try again later.');
    }
  };
*/
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <body>
      <div>
        <header className="header">
          <div className="logo-container">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 className="app-name">Öz Elbistanlılar Trendyol</h1>
          </div>
        </header>
        <div className="product-detail-container">
          <div className="product-detail-card">
            <div className="product-detail">
              <div className="product-detail-image">
                <img src={product.productPhoto} alt={product.productName} />
              </div>
              <div className="product-detail-info">
                <h2>{product.productName}</h2>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <div className="action-buttons">
                  <button className="buy-button">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );  
};

export default ProductDetail;

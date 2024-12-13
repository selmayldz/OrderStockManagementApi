import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams(); // productId parametresini alıyoruz
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No authentication token found');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5048/api/Products/${productId}`, // ID'ye göre API çağrısı
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
  }, [productId]); // productId'ye bağımlı



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <header className="header">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" />
          <h1 className="app-name">Öz Elbistanlılar Trendyol</h1>
        </div>
      </header>

      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={product.productPhoto} // Gelen verideki productPhoto
            alt={product.productName} // Gelen verideki productName
          />
        </div>
        <div className="product-detail-info">
          <h2>{product.productName}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <button className="buy-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

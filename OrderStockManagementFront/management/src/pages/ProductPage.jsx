import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductPage.css'; 
import ProductTable from '../components/ProductStockPanel/ProductTable.jsx';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  
  const fetchProducts = async () => {
    try {
      console.log('Fetching products with token:', token);
      const response = await fetch('http://localhost:5048/api/Products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Products fetched:', data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };
  
  useEffect(() => {
    if (!token) {
      console.error('Token not found.');
      return;
    }
    fetchProducts();
  }, [token]);
  
  
  return (
    <div className="product-page">
      <h1>Product List</h1>
      <button 
          className="add-product-button" 
          onClick={() => navigate('/productadd')}
        >
          New Product
      </button>
      <div className="product-table-container">
        <ProductTable products={products} /> 
      </div>
    </div>
  );
  
};

export default ProductPage;

import React, { useEffect, useState } from 'react';
import '../styles/ProductPage.css'; 
import ProductTable from '../components/ProductStockPanel/ProductTable.jsx';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('accessToken'); 
  console.log("Token:", token); 
  
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5048/api/Products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }
      console.log("Token:", token);

      const data = await response.json(); 
      setProducts(data); 
    } catch (error) {
      console.error('Error fetching products:', error); 
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts(); 
    }
  }, [token]);

  return (
    <div>
      <h1>Product Page</h1>
      <ProductTable products={products} /> 
    </div>
  );
};

export default ProductPage;

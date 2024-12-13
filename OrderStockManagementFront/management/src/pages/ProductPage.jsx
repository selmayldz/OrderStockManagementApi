import React, { useEffect, useState } from 'react';
import '../styles/ProductPage.css'; 
import ProductTable from '../components/ProductStockPanel/ProductTable.jsx';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('accessToken');
  console.log('Token:', token);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products with token:', token); // Token'ı kontrol edin
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
      console.log('Products fetched:', data); // Verileri kontrol edin
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };
  
  useEffect(() => {
    if (!token) {
      console.error('Token bulunamadı.');
      return;
    }
    fetchProducts();
  }, [token]);
  

  return (
    <div>
      <h1>Product Page</h1>
      <ProductTable products={products} /> 
    </div>
  );
};

export default ProductPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductAdd.css';

const ProductAdd = () => {
  const [product, setProduct] = useState({
    productName: '',
    stock: 0,
    price: 0,
    description: '',
    productPhoto: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5048/api/Products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('The product could not be added.');
      }
      alert('The product was successfully added.');
      navigate('/products');
    } catch (error) {
      console.error('Error:', error);
      alert('The product addition process failed.');
    }
  };

  const handleBack = () => {
    navigate('/products');
  };

  return (
    <div className="productadd-container">
      <a href="" className="profile-back-button" onClick={handleBack}>← Back</a>
      <h1>Add New Product</h1>
      <form className="productadd-form" onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input 
            type="text" 
            name="productName" 
            value={product.productName} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Stock:
          <input 
            type="number" 
            name="stock" 
            value={product.stock} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Price:
          <input 
            type="number" 
            name="price" 
            value={product.price} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Description:
          <textarea 
            name="description" 
            value={product.description} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Product Photo URL:
          <textarea 
            name="productPhoto" 
            value={product.productPhoto} 
            onChange={handleChange} 
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;

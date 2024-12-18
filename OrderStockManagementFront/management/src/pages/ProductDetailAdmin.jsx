import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetailAdmin.css';

const ProductDetailAdmin = () => {
    const { productId } = useParams(); 
    const token = localStorage.getItem('authToken'); 
    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        productId: null,
        productName: '',
        stock: 0,
        price: 0,
        description: '',
        productPhoto: '',
    });
  
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log('Fetching product with ID:', productId);
                const response = await fetch(`http://localhost:5048/api/Products/${productId}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                });
            if (response.ok) {
              const data = await response.json();
              setProduct(data);
              setLoading(false);
            } else {
              throw new Error('Failed to fetch product data');
            }
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
        fetchProduct();
      }, [productId, token]);
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
      };

      const handleBack = () => {
        navigate('/products');
      };

    return (
        <div className="productdetailss-container">
          <a href="" className="profile-back-button" onClick={handleBack}>← Back</a>
          <h1>Product Details</h1>
          <form className="productdetailss-form">
            <div className="productdetailss-form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="productdetailss-form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="productdetailss-form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                step="0.01"
                readOnly
              />
            </div>
            <div className="productdetailss-form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                readOnly
              ></textarea>
            </div>
            <div className="productdetailss-form-group">
              <label htmlFor="productPhoto">Product Photo URL</label>
              <input
                type="text"
                id="productPhoto"
                name="productPhoto"
                value={product.productPhoto}
                onChange={handleChange}
                readOnly
              />
            </div>
          </form>
        </div>
    );
};

export default ProductDetailAdmin;
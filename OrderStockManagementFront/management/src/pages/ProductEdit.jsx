import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductEdit.css';

const ProductEdit = () => {
  const { productId } = useParams();
  console.log('Product ID:', productId); 
  const token = localStorage.getItem('authToken'); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({
    productId: null,
    productName: '',
    stock: 0,
    price: 0,
    description: '',
    productPhoto: '',
  });

  useEffect(() => {
    console.log('Product ID:', productId); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5048/api/Products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Error updating product: ${response.status} - ${response.statusText}`);
      }

      alert('Product updated successfully!');
      navigate('/products'); 
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleBack = () => {
    navigate('/products');
  };

  return (
    <div className="productedit-container">
      <a href="#" className="profile-back-button" onClick={handleBack}>← Back</a>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} className="productedit-form">
        <div className="productedit-form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="productedit-form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="productedit-form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div className="productedit-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="productedit-form-group">
          <label htmlFor="productPhoto">Product Photo URL</label>
          <input
            type="text"
            id="productPhoto"
            name="productPhoto"
            value={product.productPhoto}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="productedit-save-button">Save Changes</button>
        <button type="button" className="productedit-cancel-button" onClick={() => navigate('/products')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;

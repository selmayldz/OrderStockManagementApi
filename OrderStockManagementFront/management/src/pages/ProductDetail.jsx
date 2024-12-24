import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No authentication token found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5048/api/Products/${productId}`, {
          method: 'GET',
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        });

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

  const handleAddToCart = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please log in to add items to your cart');
      navigate('/');
      return;
    }
  
    const userId = JSON.parse(atob(token.split('.')[1])).userId;
  
    const cartKey = `cart_${userId}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  
    const newItem = {
      productId: product.productId,
      productName: product.productName,
      productPhoto: product.productPhoto,
      price: product.price,
      quantity,
    };
  
    cart.push(newItem);
    localStorage.setItem(cartKey, JSON.stringify(cart)); 
    alert('Product added to cart!');
    navigate('/myorders'); 
  };
  
  

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 && value <= 5) {
      setQuantity(value);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="product-header">
        <div className="product-logo-container">
          <img src="/logo.png" alt="Logo" className="product-logo" />
          <h1 className="product-app-name">Öz Elbistanlılar</h1>
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

              <div className="product-quantity">
                <label htmlFor="quantity">Quantity:</label>
                <select id="quantity" value={quantity} onChange={handleQuantityChange}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="product-action-buttons">
                <button className="product-buy-button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

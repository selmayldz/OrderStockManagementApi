import React, { useState, useEffect } from 'react';
import '../styles/OrdersPage.css';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handlePlaceAllOrders = async () => {
    try {
      for (const product of cart) {
        const response = await fetch('http://localhost:5048/api/Orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product.productId,
            quantity: product.quantity,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to place all orders');
        }
  
        const order = await response.json(); 
        console.log('Order placed successfully:', order);
      }
  
      alert('All orders placed successfully!');
      setCart([]);
      localStorage.removeItem('cart'); 
    } catch (error) {
      console.error('Error placing all orders:', error);
      alert('Failed to place the orders.');
    }
  };  

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div>
      <a href="" className="profile-back-button" onClick={handleBack}>
        ← Back
      </a>
      <div className="orders-table">
        <h1>My Cart</h1>
        {cart.length === 0 ? (
          <p>No items in your cart</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handlePlaceAllOrders}
              className="place-all-orders-button"
            >
              Order Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

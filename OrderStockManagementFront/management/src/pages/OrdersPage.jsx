import React, { useState, useEffect } from 'react';
import '../styles/OrdersPage.css';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [cart, setCart] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await fetch('http://localhost:5048/api/Orders/customers-order', {
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customer orders');
        }

        const data = await response.json();
        setCustomerOrders(data);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      }
    };

    fetchCustomerOrders();
  }, [token]);

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
          throw new Error(`Failed to place order for product: ${product.productName}`);
        }

        const order = await response.json();
        console.log('Order placed successfully:', order);
      }

      alert('All orders placed successfully!');
      setCart([]);
    } catch (error) {
      console.error('Error placing orders:', error);
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
                  <th>Product Photo</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={`${item.productId}-${index}`}>
                    <td>
                      <img
                        src={item.productPhoto}
                        alt={item.productName}
                        className="product-photo"
                      />
                    </td>
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
      <div className="customer-orders-table">
        <h1>Customer Orders</h1>
        {customerOrders.length === 0 ? (
          <p>No customer orders found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Customer ID</th>
                <th>Product ID</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.orderStatus ? 'Completed' : 'Pending'}</td>
                  <td>{order.customerId}</td>
                  <td>{order.productId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

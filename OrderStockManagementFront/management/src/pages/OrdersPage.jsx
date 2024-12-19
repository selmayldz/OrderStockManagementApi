import React, { useState, useEffect } from 'react';
import '../styles/OrdersPage.css';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [cart, setCart] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
  
    const userId = JSON.parse(atob(token.split('.')[1])).userId;
    const cartKey = `cart_${userId}`;
  
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(storedCart);
  }, [token, navigate]);
  

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await fetch('http://localhost:5048/api/Orders/customers-order', {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customer orders');
        }

        const data = await response.json();
        setCustomerOrders((prevOrders) => {
          const newOrders = data.filter(
            (order) => !prevOrders.some((prevOrder) => prevOrder.orderId === order.orderId)
          );
          return [...newOrders, ...prevOrders];
        });
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      }
    };

    fetchCustomerOrders();
    const interval = setInterval(fetchCustomerOrders, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const handlePlaceAllOrders = async () => {
    try {
      for (const product of cart) {
        console.log('Placing order:', product); 
  
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
          const errorMessage = await response.text();
          
          if (errorMessage.includes('Not enough stock')) {
            alert(`Ürün: ${product.productName} için yeterli stok yok. Bu işlem gerçekleştirilemez.`);
          } else {
            alert(`Bir hata oluştu: ${errorMessage}`);
          }
          continue;
        }
  
        const order = await response.json();
        console.log('Order placed successfully:', order);
      }
  
      alert('All orders placed successfully!');
      setCart([]);
  
      const userId = JSON.parse(atob(token.split('.')[1])).userId;
      const cartKey = `cart_${userId}`;
      localStorage.removeItem(cartKey);
    } catch (error) {
      console.error('Error placing orders:', error);
      alert('Failed to place the orders: ' + error.message);
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
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={`${item.productId}-${index}`}>
                    <td>
                      <img src={item.productPhoto} alt="Product Photo" className="product-photo" />
                    </td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
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
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.orderDate} {order.orderTime.split(':').slice(0, 2).join(':')}</td>
                  <td>{order.orderStatus ? 'Completed' : 'Pending'}</td>
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

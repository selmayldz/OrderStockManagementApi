import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/CustomersAllOrders.css';

const CustomersAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Fetching orders with token:', token);
        const response = await fetch('http://localhost:5048/api/Admin/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data); 

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]); 

  const handleProcessOrders = async () => {
    try {
      const ordersToProcess = orders.map(order => ({
        orderId: order.orderId,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        orderDate: order.orderDate,
        orderTime: order.orderTime,
        orderStatus: order.orderStatus,
        customerName: order.customerName, 
        productName: order.productName,   
        customerId: order.customerId,
        productId: order.productId
      }));
  
      const response = await fetch('http://localhost:5048/api/Admin/process-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ orders: ordersToProcess }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to process orders');
      }
  
      const responseText = await response.text(); 
      let data;
  
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { message: responseText }; 
      }
  
      console.log('Orders processed successfully:', data);
      alert('Orders processed successfully!');
    } catch (error) {
      console.error('Error processing orders:', error);
      alert('Error processing orders: ' + error.message);
    }
  };
  
  const handleBack = () => {
    navigate('/admin');
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <button className="customersallorders-process-btn" onClick={handleProcessOrders}>Process Orders</button>
      <a href="" className="profile-back-button" onClick={handleBack}>← Back</a>
      <h1>All Orders</h1>
      <div className="customersallorders-container">
        <table className="customersallorders-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerId}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderTime}</td>
                <td>{order.orderStatus ? 'Processed' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersAllOrders;

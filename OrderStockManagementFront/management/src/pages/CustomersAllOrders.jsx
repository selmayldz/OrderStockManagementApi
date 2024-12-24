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
        setOrders((prevOrders) => {
          const newOrders = data.filter(
            (order) => !prevOrders.some((prevOrder) => prevOrder.orderId === order.orderId)
          );

          const updatedOrders = [...newOrders, ...prevOrders];
          updatedOrders.sort((a, b) => b.orderId - a.orderId); 
          
          return updatedOrders;
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 1000); 
    return () => clearInterval(interval);
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
        productId: order.productId,
        waitingTime: order.waitingTime,
        priorityScore: order.priorityScore
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
      console.log(ordersToProcess)
      const responseText = await response.text(); 
      let data;
  
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { message: responseText }; 
      }
  
      console.log('Orders processed successfully:', data);
      alert('Orders processed successfully!');
      //window.location.reload(); 
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

  const getOrderStatus = (orderStatus) => {
    if (orderStatus === 0) return 'Processed';
    if (orderStatus === -1) return 'Pending';
    if (orderStatus === 1) return 'Processed';
    return 'Unknown';  
  };

  return (
    <div>
      <button className="customersallorders-process-btn" onClick={handleProcessOrders}>Process Orders</button>
      <a href="" className="profile-back-button" onClick={handleBack}>← Back</a>
      <h1>All Orders</h1>
      <div className="customersallorders-container">
        <table className="customersallorders-orders-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Order Date Time</th>
              <th>Waiting Time</th>
              <th>Priority Score</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice}</td>
                <td>{order.orderDate} {order.orderTime.split(':').slice(0, 2).join(':')}</td>
                <td>{order.waitingTime}</td>
                <td>{order.priorityScore}</td>
                <td>
                    {getOrderStatus(order.orderStatus, order.progress || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersAllOrders;

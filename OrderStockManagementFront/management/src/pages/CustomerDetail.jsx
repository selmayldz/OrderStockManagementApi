import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import '../styles/CustomerDetail.css';

const CustomerDetail = () => {
  const { customerName } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerResponse = await fetch(`http://localhost:5048/api/Admin/user/${customerName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!customerResponse.ok) {
          throw new Error('Failed to fetch customer details');
        }

        const customerData = await customerResponse.json();
        setCustomer(customerData);

        const ordersResponse = await fetch(`http://localhost:5048/api/Admin/customers-order/${customerName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch customer orders');
        }

        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerName, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const getOrderStatus = (orderStatus) => {
    if (orderStatus === 0) return 'Unsuccessful';
    if (orderStatus === -1) return 'Pending';
    if (orderStatus === 1) return 'Successful';
    return 'Unknown';  
  };

  const handleBack = () => {
    navigate('/customers');
  };

  return (
    <div>
      <a href="" className="profile-back-button" onClick={handleBack}>← Back</a>
      <div className="customerdetail-page">
        <h1>Customer Details</h1>
        <div className="customerdetail">
          <img src={customer.customerPhoto} alt={customer.customerName} />
            <h2>{customer.customerName}</h2>
            <p><strong>Customer Type:</strong> {customer.customerType}</p>
            <p><strong>Budget:</strong> ${customer.budget}</p>
            <p><strong>Total Spend:</strong> ${customer.totalSpend}</p> 
        </div>
        <div className="customerdetail-orders">
          <h2>Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found for this customer.</p>
          ) : (
            <table className="customerdetail-orders-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Order Date Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.productName}</td>
                    <td>{order.quantity}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.orderDate} {order.orderTime.split(':').slice(0, 2).join(':')}</td>
                    <td>
                      {getOrderStatus(order.orderStatus, order.progress || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>  
  );
};

export default CustomerDetail;

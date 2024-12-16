import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import '../styles/CustomerDetail.css';

const CustomerDetail = () => {
  const { customerName } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5048/api/Admin/user/${customerName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customer details');
        }

        const data = await response.json();
        setCustomer(data);
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

  return (
    <div className="customer-body">
        <div className="customer-detail-page">
            <h1>Customer Details</h1>
            <div className="customer-detail">
                <div className="customer-photo">
                <img src={customer.customerPhoto} alt={customer.customerName} />
                </div>
                <div className="customer-info">
                <h2>{customer.customerName}</h2>
                <p><strong>Customer Type:</strong> {customer.customerType}</p>
                <p><strong>Budget:</strong> ${customer.budget}</p>
                <p><strong>Total Spend:</strong> ${customer.totalSpend}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CustomerDetail;

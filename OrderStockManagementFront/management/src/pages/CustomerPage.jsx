import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CustomerPage.css'; 

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        console.log('Fetching products with token:', token); 
        const response = await fetch('http://localhost:5048/api/Admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }

        const data = await response.json();

        const filteredCustomers = data.filter(customer => customer.customerName.toLowerCase() !== 'admin');
        
        setCustomers(filteredCustomers);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDetailsClick = (customer) => {
    navigate(`/customers-details/${customer.customerName}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="customers-body">
      <div className="customers-page">
        <h1>Customer List</h1>
        <table className="customers-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Type</th>
              <th>Budget</th>
              <th>Total Spend</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>
                  <img src={customer.customerPhoto} alt={customer.customerName} className="customers-photo" />
                </td>
                <td>{customer.customerName}</td>
                <td>{customer.customerType}</td>
                <td>${customer.budget}</td>
                <td>${customer.totalSpend}</td>
                <td>
                  <button 
                    className="customers-details-button" 
                    onClick={() => handleDetailsClick(customer)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;

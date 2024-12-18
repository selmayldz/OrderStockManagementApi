import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogPage.css';

const LogPage = () => {
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5048/api/Admin/logs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        }
      });
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs(); 
    const interval = setInterval(fetchLogs, 1000); 
    return () => clearInterval(interval); 
  }, []);

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div>
      <a href="" className="profile-back-button" onClick={handleBack}>← Back</a>
      <div className="log-container">
        <h1>Logs</h1>
        <table className="log-table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Log Date</th>
              <th>Log Type</th>
              <th>Log Details</th>
              <th>Customer ID</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.logId}>
                <td>{log.logId}</td>
                <td>{new Date(log.logDate).toLocaleString()}</td>
                <td>{log.logType}</td>
                <td>{log.logDetails}</td>
                <td>{log.customerId}</td>
                <td>{log.orderId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogPage;

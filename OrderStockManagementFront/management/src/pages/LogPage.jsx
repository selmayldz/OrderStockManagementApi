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
      setLogs((prevLogs) => {
        const newLogs = data.filter(
          (log) => !prevLogs.some((prevLog) => prevLog.logId === log.logId)
        );

        const updatedLogs = [...newLogs, ...prevLogs];
        updatedLogs.sort((a, b) => b.logId - a.logId);  
        
        return updatedLogs;
      });
      // window.location.reload(); bununla sürekli istek atılıp sayfanın güncellendiğini görebiliriz :)
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
              <th>Log Date</th>
              <th>Log Type</th>
              <th>Log Details</th> 
              <th>Customer Name</th>
              <th>Customer Type</th>
              <th>Product Name</th>
              <th>Quantity</th>             
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.logId}>
                <td>{log.logDate} {log.logTime}</td>
                <td>{log.logType}</td>
                <td>{log.logDetails}</td>
                <td>{log.customerName}</td>
                <td>{log.customerType}</td>
                <td>{log.productName}</td>
                <td>{log.quantity}</td>                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogPage;

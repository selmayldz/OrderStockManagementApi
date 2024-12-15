import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

const AdminPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
      };

    return (
        <body>
            <div className="admin-page">
                <div className="admin-navigation">
                    <button className="nav-button" onClick={() => navigate('/customers')}>
                        Customer List
                    </button>
                    <button className="nav-button" onClick={() => navigate('/logs')}>
                        Activity Logs
                    </button>
                    <button className="nav-button" onClick={() => navigate('/products')}>
                        Product Stock Status
                    </button>
                    <button className="header-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </body>
    );
};

export default AdminPage;

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
        <div className="admin-body">
            <div className="admin-page">
                <div className="admin-navigation">
                    <button className="admin-nav-button" onClick={() => navigate('/customers')}>
                        Customer List
                    </button>
                    <button className="admin-nav-button" onClick={() => navigate('/logs')}>
                        Activity Logs
                    </button>
                    <button className="admin-nav-button" onClick={() => navigate('/products')}>
                        Product Stock Status
                    </button>
                    <button className="admin-logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

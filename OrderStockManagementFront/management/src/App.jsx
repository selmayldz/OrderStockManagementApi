import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CustomerPage from './pages/CustomerPage';
import ProductPage from './pages/ProductPage';
import LogPage from './pages/LogPage';
import PriorityPage from './pages/PriorityPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProfileUpdatePage from './pages/ProfileUpdatePage';
import AdminPage from './pages/AdminPage';
import ProductDetail from './pages/ProductDetail';
import ProductDetailAdmin from './pages/ProductDetailAdmin';
import ProductEdit from './pages/ProductEdit';
import ProductAdd from './pages/ProductAdd';
import CustomerDetail from './pages/CustomerDetail';
import OrdersPage from './pages/OrdersPage';
import CustomersAllOrders from './pages/CustomersAllOrders'

ProductDetailAdmin
const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/customers" element={<CustomerPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/logs" element={<LogPage />} />
              <Route path="/priority" element={<PriorityPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/update" element={<ProfileUpdatePage />} />
              <Route path="/product-detail/:productId" element={<ProductDetail />} />
              <Route path="/product-details/:productId" element={<ProductDetailAdmin />} />
              <Route path="/product-edit/:productId" element={<ProductEdit />} />
              <Route path="/productadd" element={<ProductAdd />} />
              <Route path="/customers-details/:customerName" element={<CustomerDetail />} /> 
              <Route path="/myorders" element={<OrdersPage/>} />
              <Route path="/customerorders" element={<CustomersAllOrders/>} />
            </Routes>
      </Router>
  );
};

export default App
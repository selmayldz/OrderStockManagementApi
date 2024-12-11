import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CustomerPage from './pages/CustomerPage';
import ProductPage from './pages/ProductPage';
import LogPage from './pages/LogPage';
import PriorityPage from './pages/PriorityPage';
import OrderPage from './pages/OrderPage';
import RegisterPage from './pages/RegisterPage';

import './App.css'

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/customers" element={<CustomerPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/logs" element={<LogPage />} />
              <Route path="/priority" element={<PriorityPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
      </Router>
  );
};

export default App
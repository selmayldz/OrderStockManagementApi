import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5048/api/Customers/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid login credentials');
        }
      })
      .then((data) => {
        localStorage.setItem('authToken', data.token);
        console.log('Login successful:', data);
        navigate('/home');

        if (formData.customerName === 'admin' && formData.password === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      });
  };

  const handleRegister = (e) => {
    e.preventDefault(); 
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Welcome!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-submit">Login</button>

          <button onClick={handleRegister} className="btn-register">
            Don't have an account? Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;

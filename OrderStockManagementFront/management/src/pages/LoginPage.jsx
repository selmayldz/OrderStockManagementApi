import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { parseJwt } from '../utils/authHelper';

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

        const tokenPayload = parseJwt(data.token);

        if (tokenPayload && tokenPayload.customerType) {
          if (tokenPayload.customerType === 'admin') {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        } else {
          console.error('Invalid token or customerType not found.');
          navigate('/login'); 
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
    <body>
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-title">Welcome!</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="login-customerName">Name</label>
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

            <div className="login-form-group">
              <label htmlFor="login-password">Password</label>
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

            <button type="submit" className="login-btn-submit">Login</button>

            <button onClick={handleRegister} className="login-btn-register">
              Don't have an account? Register
            </button>

          </form>
        </div>
      </div>
    </body>
  );
};

export default LoginPage;

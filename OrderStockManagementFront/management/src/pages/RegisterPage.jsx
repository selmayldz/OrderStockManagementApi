import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    password: '',
    customerPhoto: '',
  });

  const handleBack = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      customerName: formData.customerName,
      password: formData.password,
      customerPhoto: formData.customerPhoto,
    };

    fetch('http://localhost:5048/api/Customers/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('API response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Kayıt başarılı:', data);
        navigate('/');
      })
      .catch(error => {
        console.error('Kayıt başarısız:', error);
        alert('Registration failed. Please try again later.');
      });
  };

  return (
    <body>
      <div className="register-page">
        <button className="back-submit" onClick={handleBack}>
          &larr; Back
        </button>
        <div className="register-container">
          <h2 className="register-title">Create Your Account</h2>
          <form className="register-form" onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label htmlFor="customerPhoto">Profile Photo URL</label>
              <input
                type="text"
                id="customerPhoto"
                name="customerPhoto"
                value={formData.customerPhoto}
                onChange={handleChange}
                placeholder="Paste profile photo URL"
                required
              />
            </div>

            <button type="submit" className="btn-submit">Create Account</button>
          </form>
        </div>
      </div>
    </body>
  );
};

export default RegisterPage;

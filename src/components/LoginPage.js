import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../css/loginPage.css';
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      localStorage.setItem("id",data.id);
      localStorage.setItem("role",data.role);
      // Redirect based on user role
      if (data.role === 'Freelancer') {
        navigate(`/freelancer-home/${data.id}`);
      } else if (data.role === 'Client') {
        navigate(`/client-home/${data.id}`);
      } else {
        alert('Unknown role!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={`${process.env.PUBLIC_URL}/imeges/2.jpeg`} alt="Login Visual" />
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input 
            type="email" 
            name="email" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="Username" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Password" 
            required 
          />
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

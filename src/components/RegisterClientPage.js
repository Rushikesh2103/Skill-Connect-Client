import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerClientDetails } from '../services/api';
import '../css/RegisterClientPage.css';

const RegisterClientPage = () => {
  const location = useLocation();
  const { userData } = location.state; 
  const [clientData, setClientData] = useState({
    ...userData, 
    company_name: '',
    description: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const clientDataWithUserDetails = {
        ...clientData,
        user: userData, 
      };
      await registerClientDetails(clientDataWithUserDetails);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      //alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="register-client-container">
      <div className="register-client-form-container">
        <form onSubmit={handleSubmit} className="register-client-form">
          <h1>Client Registration</h1>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label>Company Name:</label>
            <input 
              type="text" 
              name="company_name" 
              onChange={handleChange} 
              value={userData.company_name} 
              required 
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea 
              name="description" 
              onChange={handleChange} 
              value={userData.description} 
              required 
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="register-client-image">
        <img src="/imeges/4.jpeg" alt="Client Registration" />
      </div>
    </div>
  );
};

export default RegisterClientPage;

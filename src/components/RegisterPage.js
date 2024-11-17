import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/registerPage.css';
const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Freelancer', // Default to Freelancer
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (userData.role === 'Freelancer') {
      navigate('/register-freelancer', { state: { userData } });
    } else {
      navigate('/register-client', { state: { userData } });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <form onSubmit={handleNext} className="register-form">
          <h1>Register</h1>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              onChange={handleChange} 
              value={userData.email} 
              required 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              value={userData.password} 
              required 
            />
          </div>
          <div>
            <label>Role:</label>
            <select 
              name="role" 
              onChange={handleChange} 
              value={userData.role} 
              required
            >
              <option value="Freelancer">Freelancer</option>
              <option value="Client">Client</option>
            </select>
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
      <div className="register-image">
        <img src={`${process.env.PUBLIC_URL}/imeges/1.jpeg`} alt="Register Visual" />
      </div>
    </div>
  );
};

export default RegisterPage;

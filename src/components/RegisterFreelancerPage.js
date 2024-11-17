import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerFreelancerDetails } from '../services/api';
import '../css/RegisterFreelancerPage.css';

const RegisterFreelancerPage = () => {
  const [freelancerData, setFreelancerData] = useState({
    experience: '',
    firstName: '',
    lastName: '',
    location: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const { userData } = location.state; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFreelancerData({ ...freelancerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const freelancerDataWithUserDetails = {
        ...freelancerData,
        user: userData, 
      };
      await registerFreelancerDetails(freelancerDataWithUserDetails);
      navigate('/login');
    } catch (error) {
      setError(error.message);
      //console.error("Freelancer registration failed: ", error);
    }
  };

  return (
    <div className="register-freelancer-container">
      <div className="register-freelancer-form-container">
        <form onSubmit={handleSubmit} className="register-freelancer-form">
          <h1>Freelancer Registration</h1>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label>First Name:</label>
            <input 
              type="text" 
              name="firstName" 
              onChange={handleChange} 
              value={userData.firstName} 
              required 
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input 
              type="text" 
              name="lastName" 
              onChange={handleChange} 
              value={userData.lastName} 
              required 
            />
          </div>
          <div>
            <label>Experience:</label>
            <input 
              type="text" 
              name="experience" 
              onChange={handleChange} 
              value={userData.experience} 
              required 
            />
          </div>
          <div>
            <label>Location:</label>
            <input 
              type="text" 
              name="location" 
              onChange={handleChange} 
              value={userData.location} 
              required 
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="register-freelancer-image">
        <img src="/imeges/4.jpeg" alt="Freelancer Registration" />
      </div>
    </div>
  );
};

export default RegisterFreelancerPage;

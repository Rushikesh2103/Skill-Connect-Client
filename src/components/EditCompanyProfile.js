import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/EditCompanyProfile.css';
import { getCompanyDetails, updateCompanyDetails } from '../services/api'; 

const EditCompanyProfile = () => {
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    industry: '',
    description: '',
    location: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const details = await getCompanyDetails(); 
        setCompanyDetails(details);
      } catch (error) {
        setError('Failed to fetch company details.');
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompanyDetails(companyDetails);
      navigate('/companyProfile', { state: { message: 'Profile updated successfully' } });
    } catch (error) {
      setError('Failed to update company details.');
      console.error('Error updating company details:', error);
    }
  };

  return (
    <div>
      <Navbar username={companyDetails.name} role="Client" /> 
      <div className="edit-company-profile-container">
        <h1>Edit Company Profile</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="edit-company-profile-form">
          <label>
            Company Name:
            <input
              type="text"
              name="name"
              value={companyDetails.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Industry:
            <input
              type="text"
              name="industry"
              value={companyDetails.industry}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={companyDetails.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={companyDetails.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={companyDetails.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={companyDetails.phone}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="save-button">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
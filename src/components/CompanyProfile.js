import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/CompanyProfile.css';
import { getClientDetails } from '../services/api'; 

const CompanyProfile = () => {
 // const [companyDetails, setCompanyDetails] = useState(null);
  const navigate = useNavigate();
  const clientId=localStorage.getItem('id');
  console.log(clientId);
  const [clientDetails, setclientDetails] = useState(null);
  
  useEffect(() => {
    const fetchclientDetails = async () => {
      try {
        const details = await getClientDetails(clientId);
        setclientDetails(details);
        console.log(details);
        //localStorage.setItem('name',details.company_name);
      } catch (error) {
        console.error('Failed to fetch client details:', error);
      }
    };

    fetchclientDetails();
  }, []);
  const handleEditProfile = () => {
    navigate(`/editCompanyProfile/${clientDetails.clientId}`); 
  };

  // if (!clientDetails) return <p>Loading...</p>;

  return (
    <div>
      <Navbar username={localStorage.getItem('name')} />
      <div className="company-profile-container">
        <h1>Company Profile</h1>
        <div className="company-details">
          <p><strong>Company Name:</strong> {clientDetails.company_name}</p>
          {/* <p><strong>Industry:</strong> {clientDetails.industry}</p> */}
          <p><strong>Description:</strong> {clientDetails.description}</p>
          {/* <p><strong>Location:</strong> {clientDetails.location}</p>
          <p><strong>Email:</strong> {clientDetails.email}</p>
          <p><strong>Phone:</strong> {clientDetails.phone}</p> */}
        </div>
        <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
      </div>
    </div>
  );
};

export default CompanyProfile;
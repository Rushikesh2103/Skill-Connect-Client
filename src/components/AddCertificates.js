// AddCertificates.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/AddCertificates.css';
import { getFreelancerDetails, addCertificate } from '../services/api'; 

const AddCertificates = () => {
  const { id } = useParams(); 
  const [freelancer, setFreelancer] = useState(null);
  const [certificateData, setCertificateData] = useState({
    name: '',
    issuedBy: '',
    issuedDate: '',
    certificateNumber: ''
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch freelancer details to get additional info if needed
  //   const fetchFreelancer = async () => {
  //     const data = await getFreelancerDetails(id);
  //     setFreelancer(data);
  //   };
  //   fetchFreelancer();
  // }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificateData({ ...certificateData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCertificate(id, certificateData); 
      alert('Certificate added successfully!');
      navigate('/freelancer-home'); 
    } catch (error) {
      alert('Failed to add certificate: ' + error.message);
    }
  };

  return (
    <div>
      <Navbar username={localStorage.getItem('name')} />
      <div className="add-certificates-container">
        <div className="image-section">
          <img src="/imeges/3.jpeg" alt="Add Certificates" className="add-certificates-image" />
        </div>
        <div className="form-section">
          <h1>Add Certificate</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Certificate Name:</label>
              <input
                type="text"
                name="name"
                value={certificateData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Issued By:</label>
              <input
                type="text"
                name="issuedBy"
                value={certificateData.issuedBy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Issued Date:</label>
              <input
                type="date"
                name="issuedDate"
                value={certificateData.issuedDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Certificate Number:</label>
              <input
                type="text"
                name="certificateNumber"
                value={certificateData.certificateNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCertificates;

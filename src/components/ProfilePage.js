import React, { useState, useEffect } from 'react';
import { getFreelancerDetails, updateUserProfile } from '../services/api';
import {useNavigate}  from'react-router-dom';
import Navbar from './Navbar';
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const freelancerId=localStorage.getItem('id');
  console.log(freelancerId);
  const [freelancerDetails, setFreelancerDetails] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancerDetails = async () => {
      try {
        const details = await getFreelancerDetails(freelancerId);
        setFreelancerDetails(details);
        console.log(details);
        
      } catch (error) {
        console.error('Failed to fetch freelancer details:', error);
      }
    };

    fetchFreelancerDetails();
  }, [freelancerId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(freelancerId, profile);
      setEditMode(false);
      alert('Profile updated!');
    } catch (error) {
      alert('Update failed: ' + error.message);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar username={localStorage.getItem('name')} />
      <h1>Profile</h1>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} value={freelancerDetails.firstName} required />
          </div>
          <div>
            <label>Email:</label>
            {/* <input type="email" name="email" onChange={handleChange} value={profile.email} required /> */}
          </div>
          <div>
            <label>Skills:</label>
            {/* <input type="text" name="skills" onChange={handleChange} value={profile.skills} required /> */}
          </div>
          <button type="submit">Update</button>
        </form>
      ) : (
        <div>
          <p>Name: {}</p>
          {/* <p>Email: {profile.email}</p>
          <p>Skills: {profile.skills}</p> */}
          <button onClick={() => setEditMode(true)}>Edit</button>
          {/* <button onClick={logout}>Logout</button> */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

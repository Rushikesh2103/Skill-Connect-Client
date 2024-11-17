import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/AddSkills.css';
import { getFreelancerDetails, addSkill } from '../services/api'; 

const AddSkills = () => {
  const { id } = useParams(); 
  const [freelancer, setFreelancer] = useState(null);
  const [skillData, setSkillData] = useState({
    skillName: '',
    description: '',
    experience: '',
    rating: ''
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
    setSkillData({ ...skillData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSkill(id, skillData); 
      alert('Skill added successfully!');
      navigate('/freelancer-home'); 
    } catch (error) {
      alert('Failed to add skill: ' + error.message);
    }
  };

  const handleTest = () => {
    navigate('/test'); 
  };

  return (
    <div>
      <Navbar username={localStorage.getItem('name')} />
      <div className="add-skills-container">
        <div className="image-section">
          <img src="/imeges/2.jpeg" alt="Add Skills" className="add-skills-image" />
        </div>
        <div className="form-section">
          <h1>Add Skill</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Skill Name:</label>
              <input
                type="text"
                name="skillName"
                value={skillData.skillName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={skillData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Years of Experience:</label>
              <input
                type="number"
                name="experience"
                value={skillData.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="number"
                name="rating"
                value={skillData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                required
              />
            </div>
            <button type="button" onClick={handleTest}>Give Test</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkills;

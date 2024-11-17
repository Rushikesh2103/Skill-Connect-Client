import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { createProject } from '../services/api';
import '../css/PostProject.css';

const PostProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    projectType: '',
    requiredSkills: '',
    status:'open',
    businessId:localStorage.getItem("id")
  });

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
      await createProject(formData);
      alert('Project Posted Successfully');
      navigate('/manage-projects');
    } catch (error) {
      console.error('Error posting project:', error);
      alert('Failed to post project');
    }
  };

  return (
    <div>
      <Navbar username={localStorage.getItem('name')} />
      <div className="post-project-container">
        <div className="form-section">
          <h1>Post a New Project</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="requiredSkills">Required Skills</label>
              <input
                type="text"
                id="requiredSkills"
                name="requiredSkills"
                value={formData.requiredSkills}
                onChange={handleChange}
                required
              />
              
            </div>

            <button type="submit">Post Project</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProject;

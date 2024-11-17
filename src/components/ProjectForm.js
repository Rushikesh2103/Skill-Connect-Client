import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, createProject, updateProject } from '../services/api';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    skillsRequired: '',
  });

  useEffect(() => {
    if (id) {
      getProject(id).then((response) => setProjectData(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProject(id, projectData);
      } else {
        await createProject(projectData);
      }
      navigate('/projects');
    } catch (error) {
      alert('Save failed: ' + error.message);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Project' : 'New Project'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} value={projectData.name} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" onChange={handleChange} value={projectData.description} required />
        </div>
        <div>
          <label>Skills Required:</label>
          <input type="text" name="skillsRequired" onChange={handleChange} value={projectData.skillsRequired} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProjectForm;

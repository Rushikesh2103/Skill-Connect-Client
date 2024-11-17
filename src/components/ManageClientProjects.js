import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../css/ManagePostProjects.css';
import { getProjects, deleteProject } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ManagePostProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const clientId = localStorage.getItem('id'); // Assuming client ID is stored in local storage

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects();
        // Filter projects based on client ID
        const clientProjects = response.data.filter(project => project.clientId === clientId);
        setProjects(clientProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };

    loadProjects();
  }, [clientId]);

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter(project => project.id !== projectId));
      alert('Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleEdit = (projectId) => {
    navigate(`/edit-project/${projectId}`);
  };

  return (
    <div>
      <Navbar username="Client" />
      <div className="manage-projects-container">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Budget:</strong> ${project.budget}</p>
            <p><strong>Deadline:</strong> {project.deadline}</p>
            <p><strong>Type:</strong> {project.projectType}</p>
            <p><strong>Required Skills:</strong> {project.requiredSkills}</p>
            <div className="project-actions">
              <button onClick={() => handleEdit(project.id)}>Edit Project</button>
              <button onClick={() => handleDelete(project.id)}>Delete Project</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePostProjects;

import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api'; 
import Navbar from './Navbar';

const ViewProjects = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects(); 
        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
       <Navbar username={localStorage.getItem('name')} />
      <h1>Available Projects</h1>
      <ul>
      <div className="project-cards">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <img src={project.imageUrl} alt={project.name} className="project-image" />
            <div className="project-details">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p><strong>Budget:</strong> ${project.budget}</p>
              <p><strong>Deadline:</strong> {project.deadline}</p>
              <p><strong>Type:</strong> {project.projectType}</p>
            </div>
          </div>
        ))}
      </div>
      </ul>
    </div>
  );
};

export default ViewProjects;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, deleteProject } from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((response) => setProjects(response.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      <Link to="/projects/new">Add New Project</Link>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { getProject, saveBidDetails } from '../services/api'; // Assuming you have these API functions
import '../css/ApplyProject.css';

const ApplyProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [amount, setAmount] = useState('');
  const [timeline, setTime] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const details = await getProject(projectId);
        setProject(details.data);
        console.log(details.data);
      } catch (error) {
        setError('Failed to fetch project details.');
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleApply = async () => {
    try {
      const bidData = {
        projectId,
        amount,
        timeline,
        freelancerId:localStorage.getItem("id"), 
      };
      await saveBidDetails(bidData);
      navigate('/manage-projects'); 
    } catch (error) {
      setError('Failed to save bid details.');
    }
  };

  if (!project) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar username="Freelancer" role="Freelancer" /> 
      <div className="apply-project-container">
        <h2>Apply for Project</h2>
        <div className="project-details">
          <p><strong>Title:</strong> {project.title}</p>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Budget:</strong> ${project.budget}</p>
          <p><strong>Deadline:</strong> {project.deadline}</p>
        </div>
        <div className="bid-form">
          <label>
            Bid Amount ($):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <label>
            Time Required (days):
            <input
              type="number"
              value={timeline}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>
          <button onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default ApplyProject;
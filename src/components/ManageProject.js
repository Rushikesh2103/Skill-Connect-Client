import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../css/ManageProject.css';
import { getAppliedProjects, getAssignedProjects, getEarningTracker } from '../services/api';

const ManageProject = () => {
  const [selectedOption, setSelectedOption] = useState('appliedProjects');
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [earningTracker, setEarningTracker] = useState({ projects: [], monthlyIncome: 0, totalIncome: 0 });

  // useEffect(() => {
  //   const fetchAppliedProjects = async () => {
  //     const data = await getAppliedProjects();
  //     setAppliedProjects(data);
  //   };

  //   const fetchAssignedProjects = async () => {
  //     const data = await getAssignedProjects();
  //     setAssignedProjects(data);
  //   };

  //   const fetchEarningTracker = async () => {
  //     const data = await getEarningTracker();
  //     setEarningTracker(data);
  //   };

  //   if (selectedOption === 'appliedProjects') {
  //     fetchAppliedProjects();
  //   } else if (selectedOption === 'assignedProjects') {
  //     fetchAssignedProjects();
  //   } else if (selectedOption === 'earningTracker') {
  //     fetchEarningTracker();
  //   }
  // }, [selectedOption]);

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  // };

  // const handleSubmitProject = (projectId) => {
  //   // Handle any necessary logic before redirecting
  //   console.log(`Submit project ID ${projectId} clicked`);

  //   // Redirect to the file submission page
  //   window.location.href = 'https://sendfileonline.com/';
  // };

  const renderContent = () => {
    switch (selectedOption) {
      case 'appliedProjects':
        return (
          <div>
            <h2>Applied Projects</h2>
            {appliedProjects.length > 0 ? (
              appliedProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p><strong>Company:</strong> {project.companyName}</p>
                  <p><strong>Budget:</strong> ${project.budget}</p>
                  <p><strong>Deadline:</strong> {project.deadline}</p>
                  <p><strong>Bid Amount:</strong> ${project.bidAmount}</p>
                  <p><strong>Time Estimated:</strong> {project.timeEstimated} days</p>
                  <p><strong>Status:</strong> {project.status}</p>
                </div>
              ))
            ) : (
              <p>No applied projects found.</p>
            )}
          </div>
        );
      case 'assignedProjects':
        return (
          <div>
            <h2>Assigned Projects</h2>
            {assignedProjects.length > 0 ? (
              assignedProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p><strong>Company:</strong> {project.companyName}</p>
                  <p><strong>Budget:</strong> ${project.budget}</p>
                  <p><strong>Deadline:</strong> {project.deadline}</p>
                  <p><strong>Bid Amount:</strong> ${project.bidAmount}</p>
                  <p><strong>Time Estimated:</strong> {project.timeEstimated} days</p>
                  <p><strong>Status:</strong> {project.status}</p>
                  <div className="project-actions">
                    {/* <button onClick={() => handleNDA(project.id)}>Non-Disclosure Agreement</button>
                    <button onClick={() => handleMessageClient(project.id)}>Message Client</button>
                    <button onClick={() => handleSubmitProject(project.id)}>Submit Project</button> */}
                  </div>
                </div>
              ))
            ) : (
              <p>No assigned projects found.</p>
            )}
          </div>
        );
      case 'earningTracker':
        return (
          <div>
            <h2>Earning Tracker</h2>
            <p><strong>Monthly Income:</strong> ${earningTracker.monthlyIncome}</p>
            <p><strong>Total Income:</strong> ${earningTracker.totalIncome}</p>
            <h3>Projects Completed</h3>
            {earningTracker.projects.length > 0 ? (
              earningTracker.projects.map((project) => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p><strong>Company:</strong> {project.companyName}</p>
                  <p><strong>Budget:</strong> ${project.budget}</p>
                  <p><strong>Completion Date:</strong> {project.completionDate}</p>
                </div>
              ))
            ) : (
              <p>No completed projects found.</p>
            )}
            <h3>Set Goals</h3>
            <input type="text" placeholder="Set your monthly goal" />
            <button>Save Goal</button>
          </div>
        );
      default:
        return null;
    }
  };

  const handleNDA = (projectId) => {
    // Handle NDA logic here
    alert(`NDA for project ID ${projectId} clicked`);
  };

  const handleMessageClient = (projectId) => {
    // Handle message client logic here
    alert(`Message client for project ID ${projectId} clicked`);
  };

  return (
    <div>
      <Navbar username={localStorage.getItem('name')} />
      <div className="manage-projects-container">
        <div className="sidebar">
          <ul>
            {/* <li onClick={() => handleOptionClick('appliedProjects')}>Applied Projects</li>
            <li onClick={() => handleOptionClick('assignedProjects')}>Assigned Projects</li>
            <li onClick={() => handleOptionClick('earningTracker')}>Earning Tracker</li> */}
          </ul>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ManageProject;
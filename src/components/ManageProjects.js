import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../css/ManageProjects.css'; // Create and style this CSS file
import { getBidders, getAssignedProjects, assignProject, rejectBid, makePayment } from '../services/api'; // Assume these functions are implemented in your API service

const ManageProjects = () => {
  const [selectedTab, setSelectedTab] = useState('bidders');
  const [bidders, setBidders] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const loadBidders = async () => {
  //     try {
  //       const response = await getBidders(); // Fetch bidders from the API
  //       setBidders(response.data);
  //     } catch (error) {
  //       setError('Failed to load bidders.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const loadAssignedProjects = async () => {
  //     try {
  //       const response = await getAssignedProjects(); 
  //       setAssignedProjects(response.data);
  //     } catch (error) {
  //       setError('Failed to load assigned projects.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (selectedTab === 'bidders') {
  //     loadBidders();
  //   } else if (selectedTab === 'assigned') {
  //     loadAssignedProjects();
  //   }
  // }, [selectedTab]);

  // const handleAssignProject = async (projectId, freelancerId) => {
  //   try {
  //     await assignProject(projectId, freelancerId);
  //     alert('Project assigned successfully');
  //     setSelectedTab('assigned'); // Switch to assigned tab
  //   } catch (error) {
  //     console.error('Failed to assign project:', error);
  //   }
  // };

  // const handleRejectBid = async (projectId, freelancerId) => {
  //   try {
  //     await rejectBid(projectId, freelancerId);
  //     alert('Bid rejected');
  //     // Reload bidders list after rejecting
  //     setBidders(bidders.filter(bid => !(bid.projectId === projectId && bid.freelancerId === freelancerId)));
  //   } catch (error) {
  //     console.error('Failed to reject bid:', error);
  //   }
  // };

  // const handleMakePayment = async (projectId, freelancerId) => {
  //   try {
  //     await makePayment(projectId, freelancerId);
  //     alert('Payment made successfully');
  //   } catch (error) {
  //     console.error('Failed to make payment:', error);
  //   }
  // };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>hello</h1>
      <Navbar username={localStorage.getItem('name')} />
      <div className="manage-projects-container">
        <div className="sidebar">
          <button onClick={() => setSelectedTab('bidders')} className={selectedTab === 'bidders' ? 'active' : ''}>
            Bidders
          </button>
          <button onClick={() => setSelectedTab('assigned')} className={selectedTab === 'assigned' ? 'active' : ''}>
            Assign Projects
          </button>
        </div>
        <div className="content">
          {selectedTab === 'bidders' && (
            <div className="bidders-list">
              {bidders.map((bid) => (
                <div className="card" key={`${bid.projectId}-${bid.freelancerId}`}>
                  <h3>Project: {bid.projectName}</h3>
                  <p><strong>Freelancer:</strong> {bid.freelancerName}</p>
                  <p><strong>Demanded Amount:</strong> ${bid.amount}</p>
                  <p><strong>Time Required:</strong> {bid.timeRequired} days</p>
                  {/* <button onClick={() => handleAssignProject(bid.projectId, bid.freelancerId)}>Assign Project</button>
                  <button onClick={() => handleRejectBid(bid.projectId, bid.freelancerId)}>Reject</button> */}
                </div>
              ))}
            </div>
          )}
          {selectedTab === 'assigned' && (
            <div className="assigned-projects-list">
              {assignedProjects.map((project) => (
                <div className="card" key={project.projectId}>
                  <h3>Project: {project.name}</h3>
                  <p><strong>Freelancer:</strong> {project.freelancerName}</p>
                  <p><strong>Budget:</strong> ${project.budget}</p>
                  <p><strong>Deadline:</strong> {project.deadline}</p>
                  {/* <button onClick={() => handleMakePayment(project.projectId, project.freelancerId)}>Make Payment</button> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProjects;
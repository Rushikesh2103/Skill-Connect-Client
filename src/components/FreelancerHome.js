// // FreelancerHome.js
// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import '../css/FreelancerHome.css';
// import { getProjects } from '../services/api';
// import { useParams,useNavigate } from 'react-router-dom';

// import { getFreelancerDetails } from '../services/api'; // Assume you have this function in your API service

// const FreelancerHome = () => {
//   const [username] = useState('Freelancer'); // Replace with the actual username if available
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchType, setSearchType] = useState('');
//   const [searchBudget, setSearchBudget] = useState('');
//   const { freelancerId } = useParams();
//   const [freelancerDetails, setFreelancerDetails] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchFreelancerDetails = async () => {
//       try {
//         const details = await getFreelancerDetails(freelancerId);
//         setFreelancerDetails(details);
//         localStorage.setItem('name',freelancerDetails.firstName)
//       } catch (error) {
//         console.error('Failed to fetch freelancer details:', error);
//       }
//     };

//     fetchFreelancerDetails();
//   }, [freelancerId]);
  

//   // if (!freelancerDetails) {
//   //   return <div>Loading...</div>;
//   // }

//   // useEffect(() => {
//   //   const loadProjects = async () => {
//   //     const data = await fetchProjects();
//   //     setProjects(data);
//   //     setFilteredProjects(data);
//   //   };

//   //   loadProjects();
//   // }, []);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const response = await getProjects(); // Fetch projects from the API
//         setProjects(response.data);
//         //console.log(response.data);
//       } catch (error) {
//         setError('Failed to load projects.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProjects();
//   }, []);

//   if (loading) return <p>Loading ...</p>;
//   if (error) return <p>{error}</p>;

//   const handleSearch = () => {
//     const filtered = projects.filter(project =>
//       (searchType ? project.projectType.includes(searchType) : true) &&
//       (searchBudget ? project.budget <= searchBudget : true)
//     );
//     setFilteredProjects(filtered);
//   };
//   const handleApply = (projectId) => {
//     navigate(`/applyProject/${projectId}`); // Navigate to ApplyProject page with the project ID
//   };
  
  
//   return (
//     <div>
//       <Navbar username={freelancerDetails.firstName}  role="Freelancer" /> 
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search by Project Type"
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Search by Budget"
//           value={searchBudget}
//           onChange={(e) => setSearchBudget(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <h2>Trending Projects</h2>
//       <div className="project-cards">
//         {projects.map((project) => (
//           <div className="project-card" key={project.id}>
//             <img src={project.imageUrl} alt={project.name} className="project-image" />
//             <div className="project-details">
//               <h3>{project.name}</h3>
//               <p>{project.description}</p>
//               <p><strong>Budget:</strong> ${project.budget}</p>
//               <p><strong>Deadline:</strong> {project.deadline}</p>
//               <p><strong>Type:</strong> {project.projectType}</p>
//               <button onClick={() => handleApply(project.id)}>Apply</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FreelancerHome;

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../css/FreelancerHome.css';
import { getProjects, getFreelancerDetails } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const FreelancerHome = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const { freelancerId } = useParams();
  //const [freelancerDetails, setFreelancerDetails] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancerDetails = async () => {
      try {
        const details = await getFreelancerDetails(freelancerId);
       // setFreelancerDetails(details);
        console.log(details);
        localStorage.setItem('name', details.firstName);
      } catch (error) {
        console.error('Failed to fetch freelancer details:', error);
      }
    };

    fetchFreelancerDetails();
  }, [freelancerId]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects(); // Fetch projects from the API
        setProjects(response.data);
        setFilteredProjects(response.data); // Initialize filteredProjects with all projects
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

  const handleSearch = () => {
    let minBudget = 0;
    let maxBudget = Infinity;

    if (budgetRange) {
      const [min, max] = budgetRange.split('-').map(Number);
      minBudget = min;
      maxBudget = max;
    }

    const filtered = projects.filter(project =>
      (searchType ? project.projectType.includes(searchType) : true) &&
      project.budget >= minBudget && project.budget <= maxBudget
    );
    setFilteredProjects(filtered);
  };

  const handleApply = (projectId) => {
    navigate(`/applyProject/${projectId}`); // Navigate to ApplyProject page with the project ID
  };

  return (
    <div>
      <Navbar username={localStorage.getItem('name')} />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Project Type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)}>
          <option value="">Select Budget Range</option>
          <option value="0-5000">$0 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000-15000">$10,000 - $15,000</option>
          <option value="15000-25000">$15,000 - $25,000</option>
          <option value="25000-50000">$25,000 - $50,000</option>
          <option value="50000-Infinity">$50,000+</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <h2>Trending Projects</h2>
      <div className="project-cards">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project.id}>
            <img src={project.imageUrl} alt={project.name} className="project-image" />
            <div className="project-details">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p><strong>Budget:</strong> ${project.budget}</p>
              <p><strong>Deadline:</strong> {project.deadline}</p>
              <p><strong>Type:</strong> {project.projectType}</p>
              <button onClick={() => handleApply(project.id)}>Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancerHome;

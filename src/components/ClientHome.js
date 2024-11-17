// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { getClientDetails } from '../services/api';
// const ClientHome = () => {
//   const navigate = useNavigate();
//   const { clientId } = useParams();
//   const [clientDetails, setclientDetails] = useState(null);
//   useEffect(() => {
//     const fetchclientDetails = async () => {
//       try {
//         const details = await getClientDetails(clientId);
//         setclientDetails(details);
//       } catch (error) {
//         console.error('Failed to fetch client details:', error);
//       }
//     };

//     fetchclientDetails();
//   }, [clientId]);

//   if (!clientDetails) {
//     return <div>Loading...</div>;
//   }

//   const handleLogout = () => {
//     // Optionally call the logout endpoint
//     localStorage.removeItem('id'); // Clear user ID
//     localStorage.removeItem('role'); // Clear user role 
//     navigate('/login'); // Redirect to login page
// };

//   return (
//     <div>
//       <nav>
//         <ul>
//           <li onClick={() => navigate('/post-project')}>Post Project</li>
//           <li onClick={() => navigate('/view-bids')}>View Bids</li>
//           <li onClick={() => navigate('/manage-projects')}>Manage Projects</li>
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </nav>
//       <h1>Welcome, {clientDetails.company_name}!</h1>
//       {/* Add additional client-specific functionality here */}
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../css/ClientHome.css';
import { getFreelancers,getClientDetails } from '../services/api';
import { useParams } from 'react-router-dom';

const ClientHome = () => {
  //const [username] = useState('Client'); // Replace with actual username if available
  const [freelancers, setFreelancers] = useState([]);
  const { clientId } = useParams();
  //const [clientDetails, setclientDetails] = useState(null);
  useEffect(() => {
    const fetchclientDetails = async () => {
      try {
        const details = await getClientDetails(clientId);
        
        console.log(details);
        localStorage.setItem('name',details.company_name);
      } catch (error) {
        console.error('Failed to fetch client details:', error);
      }
    };

    fetchclientDetails();
  }, []);
  useEffect(() => {
    const loadFreelancers = async () => {
      try {
        const response = await getFreelancers();
        setFreelancers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to load freelancers:', error);
      }
    };

    loadFreelancers();
  }, []);

  return (
    <div>
      <Navbar username={localStorage.getItem('name')} />
      <h2>Available Freelancers</h2>
      <div className="freelancer-cards">
        {freelancers.map((freelancer) => (
          <div className="freelancer-card" key={freelancer.id}>
            <img src={freelancer.profileImage} alt={freelancer.firstName} className="freelancer-image" />
            <div className="freelancer-details">
              <h3>{freelancer.firstName} {freelancer.lastName}</h3>
              <p><strong>Experience:</strong> {freelancer.experience} years</p>
              <p><strong>Location:</strong> {freelancer.location}</p>
              {/* <p><strong>Skills:</strong> {freelancer.skills.map(skill => ${skill.name} (${skill.rating})).join(', ')}</p> */}
              {/* <p><strong>Certifications:</strong> {freelancer.certifications.map(cert => cert.name).join(', ')}</p> */}
              <button>Contact</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientHome;
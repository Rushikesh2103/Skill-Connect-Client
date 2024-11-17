// // Navbar.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../css/Navbar.css';

// const Navbar = ({ username }) => {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     // Optionally call the logout endpoint
//     localStorage.removeItem('id'); // Clear user ID
//     localStorage.removeItem('role'); // Clear user role 
//     navigate('/login'); // Redirect to login page
// };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <h2>SkillConnect</h2>
//       </div>
//       <div className="navbar-right">
//         <p>Hello, {username}</p>
//         <ul>
//           <li onClick={() => navigate('/view-projects')}>View Projects</li>
//           <li onClick={() => navigate('/manage-projects')}>Manage Projects</li>
//           <li onClick={() => navigate('/add-skills')}>Add Skills</li>
//           <li onClick={() => navigate('/add-certifications')}>Add Certifications</li>
          
//           <li onClick={() => navigate('/profile')}>Profile</li>
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ username}) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const handleLogout = () => {
  localStorage.removeItem('id'); // Clear user ID
  localStorage.removeItem('role');
  localStorage.removeItem('name'); // Clear user role 
  navigate('/login'); // Redirect to login page
};
  

  const freelancerLinks = (
    <>
     <li onClick={() => navigate(`/freelancer-home/${localStorage.getItem('id')}`)}>Home</li>
      {/* <li onClick={() => navigate('/view-projects')}>View Projects</li> */}
      <li onClick={() => navigate('/manage-project')}>Manage Projects</li>
      <li onClick={() => navigate('/add-skills')}>Add Skills</li>
      <li onClick={() => navigate('/add-certifications')}>Add Certifications</li>
      <li onClick={() => navigate('/profile')}>Profile</li>
      <li onClick={handleLogout}>Logout</li>
    </>
  );

  const clientLinks = (
    <>
    <li onClick={() => navigate(`/client-home/${localStorage.getItem('id')}`)}>Home</li>
      {/* <li onClick={() => navigate('/freelancers')}>Freelancers</li> */}
      <li onClick={() => navigate('/post-project')}>Post Project</li>
      <li onClick={() => navigate('/manage-projects')}>Manage Projects</li>
      <li onClick={() => navigate(`/company-profile`)}>Company Profile</li>
      <li onClick={() => navigate('/manage-bids')}>Manage Bids</li>
      <li onClick={handleLogout}>Logout</li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>SkillConnect</h2>
      </div>
      <div className="navbar-right">
        <p>Hello, {username}</p>
        <ul>
          {role === 'Freelancer' ? freelancerLinks : clientLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
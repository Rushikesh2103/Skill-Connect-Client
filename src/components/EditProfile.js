// // EditProfile.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Navbar from './Navbar';
// import '../css/EditProfile.css';
// import { getFreelancerDetails, updateFreelancerProfile } from '../services/api'; // Ensure these functions are implemented

// const EditProfile = () => {
//   const { id } = useParams(); // Assume freelancer ID is passed as a URL parameter
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     location: '',
//     experience: ''
//   });
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const fetchFreelancerDetails = async () => {
//       try {
//         const details = await getFreelancerDetails(freelancerId);
//         setFreelancerDetails(details);
//         localStorage.setItem('name', details.firstName);
//       } catch (error) {
//         console.error('Failed to fetch freelancer details:', error);
//       }
//     };

//     fetchFreelancerDetails();
//   }, [freelancerId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateFreelancerProfile(id, profileData); // Assuming this function updates the profile in the backend
//       alert('Profile updated successfully!');
//       navigate('/freelancer-home'); // Redirect to the freelancer home page
//     } catch (error) {
//       alert('Failed to update profile: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <Navbar username={localStorage.getItem('name')} />
//       <div className="edit-profile-container">
//         <div className="image-section">
//           <img src="path/to/your/image.jpg" alt="Edit Profile" className="edit-profile-image" />
//         </div>
//         <div className="form-section">
//           <h1>Edit Profile</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>First Name:</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={FreelancerDetails.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Last Name:</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={FreelancerDetails.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             {/* <div className="form-group">
//               <label>Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={FreelancerDetails.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div> */}
//             <div className="form-group">
//               <label>Location:</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={FreelancerDetails.location}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Experience:</label>
//               <input
//                 type="text"
//                 name="experience"
//                 value={FreelancerDetails.experience}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import ProjectList from './components/ProjectList';
import RegisterFreelancerPage from './components/RegisterFreelancerPage';
import RegisterClientPage from './components/RegisterClientPage';
import ReviewList from './components/ReviewList';
import ProjectForm from './components/ProjectForm';
import ReviewForm from './components/ReviewForm';
import FreelancerHome from './components/FreelancerHome';
import ClientHome from './components/ClientHome';
import AddSkills from './components/AddSkills';
import './css/homepage.css';
import ProtectedRoute from './components/ProtectedRoute';
import ViewProjects from './components/ViewProjects';
import PostProject from './components/PostProject';
import ApplyProject from './components/ApplyProject';
import ManagePostProjects from './components/ManageClientProjects';
import ManageProject from './components/ManageProject';
import ManageProjects from './components/ManageProjects';
import CompanyProfile from './components/CompanyProfile';
import AddCertificates from './components/AddCertificates';
import AboutUs from './components/AboutUs';
//import EditProfile from './components/EditProfile';
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-freelancer" element={<RegisterFreelancerPage />} />
          <Route path="/register-client" element={<RegisterClientPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/freelancer-home/:freelancerId" element={<ProtectedRoute requiredRole="Freelancer" ><FreelancerHome /></ProtectedRoute>} />
          <Route path="/client-home/:clientId" element={<ProtectedRoute requiredRole="Client"><ClientHome /></ProtectedRoute>} />
          <Route path="/view-projects" element={< ViewProjects />} />
          <Route path="/freelancers" element={< ClientHome />} />
          <Route path="/applyProject/:projectId" element={<ApplyProject />} />
          <Route path="/post-project" element={<PostProject />} />
          <Route path="/manage-projects" element={<ManagePostProjects />} />
          <Route path="/manage-project" element={<ManageProject />} />
          <Route path="/manage-projects" element={<ManageProjects/>} />
          <Route path="/company-profile/:projectId" element={<CompanyProfile />} />
          <Route path="/add-skills" element={<AddSkills />} />
          <Route path="/add-certifications" element={<AddCertificates />} />
          <Route path="/about-us" element={<AboutUs />} />

          <Route
            path="/profile" element={<ProfilePage /> }/>/company-profile/
            <Route
            path="/company-profile" element={<CompanyProfile /> }/>
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectList />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <PrivateRoute>
                <ReviewList />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviews/new"
            element={
              <PrivateRoute>
                <ReviewForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviews/:id"
            element={
              <PrivateRoute>
                <ReviewForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

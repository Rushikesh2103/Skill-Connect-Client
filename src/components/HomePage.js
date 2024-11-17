import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';

const HomePage = () => (
  <div className="homepage-container">
    <nav className="navbar">
      <div className="navbar-brand">SkillConnect</div>
      <div className="navbar-links">
        <Link to="/about-us">About Us</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>

    <header className="header">
      <h1>SkillConnect: A Bridge Between Skills and Opportunities</h1>
      <div className="header-images">
        {/* Add your images here */}
        <img src={`${process.env.PUBLIC_URL}/imeges/3.jpeg`} alt="Skill Image 1" />
      </div>
    </header>

    <div className="buttons-container">
      <Link to="/login" className="button">Login</Link>
      <Link to="/register" className="button">Register</Link>
    </div>
  </div>
);

export default HomePage;

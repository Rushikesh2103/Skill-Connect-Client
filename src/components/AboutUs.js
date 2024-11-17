import React from 'react';
import '../css/AboutUs.css' 

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to Freelancer Platform, the place where freelancers and clients connect.
        Our mission is to provide a platform that allows freelancers to showcase their skills and clients to find the best talent for their projects.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        Our mission is to empower freelancers and businesses by connecting them in a seamless and efficient manner.
        We believe in the power of remote work and strive to create a community where talent and opportunities meet.
      </p>
      
      <h2>Our Team</h2>
      <p>
        Our team is comprised of passionate individuals who are committed to making this platform the best it can be.
        We work tirelessly to ensure that both freelancers and clients have a positive experience on our platform.
      </p>
      
      <h2>Contact Us</h2>
      <p>
        If you have any questions, feel free to reach out to us at <a href="mailto:support@freelancerplatform.com">support@freelancerplatform.com</a>.
      </p>
    </div>
  );
}

export default AboutUs;

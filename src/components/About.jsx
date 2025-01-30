import React from 'react';
import Navbar from './NavBar';
import AboutUsImage from "../css/images/AboutIMG.png";
import "../css/About.css";
import Footer from './Fotter';

function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <div className="about-content">
          <h1>About Us</h1>
          <p className="lead">
            At BCard, we revolutionize the way businesses connect through innovative and customized business card solutions.
          </p>
          <p>
            We believe in the power of first impressions. That’s why we’ve made it our mission to provide modern, user-friendly tools
            to help you create stunning business cards in minutes.
          </p>
          <p>
            Whether you’re meeting clients, attending events, or building your network, BCard ensures you leave a lasting impression every time.
          </p>
        </div>

        <div className="about-image">
          <img src={AboutUsImage} alt="About Us" />
        </div>

        <h2>Why Choose BCard?</h2>
        <div className="features">
          <div className="feature">
            <i className="bi bi-pencil-square"></i>
            <h3>Creative Customization</h3>
            <p>Design cards that reflect your brand and personality.</p>
          </div>
          <div className="feature">
            <i className="bi bi-people-fill"></i>
            <h3>Professional Connections</h3>
            <p>Strengthen your network with beautifully crafted business cards.</p>
          </div>
          <div className="feature">
            <i className="bi bi-cloud-upload-fill"></i>
            <h3>Seamless Sharing</h3>
            <p>Share your cards digitally or print them effortlessly.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;

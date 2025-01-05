import React from 'react';
import Navbar from './NavBar';
import AboutUsImage from "../css/images/AboutIMG.png";
import "../css/About.css";

function About() {
  return (
    <>
      <Navbar />
      <div className="about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>About Us</h1>
              <p className="lead">
                At BCard, we specialize in revolutionizing the way businesses connect through innovative and customized business card solutions. 
                Our platform is designed to empower professionals, startups, and enterprises alike to showcase their unique identity with ease and elegance.
              </p>
              <p>
                We believe in the power of first impressions. That’s why we’ve made it our mission to provide modern, user-friendly tools that let you create stunning business cards in minutes. 
                Whether you’re meeting clients, attending events, or building your network, BCard ensures you leave a lasting impression every time.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={AboutUsImage}
                alt="About Us"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="row mt-5">
            <h2>Why Choose BCard?</h2>
            <div className="col-md-4 text-center">
              <i className="bi bi-pencil-square"></i>
              <h3>Creative Customization</h3>
              <p>
                Design your cards with ease using our intuitive platform. Tailor them to reflect your brand and personality.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-people-fill"></i>
              <h3>Professional Connections</h3>
              <p>
                Strengthen your network with beautifully crafted business cards that stand out and leave a mark.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-cloud-upload-fill"></i>
              <h3>Seamless Sharing</h3>
              <p>
                Share your cards digitally or print them effortlessly. Connect anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

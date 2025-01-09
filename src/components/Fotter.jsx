import React from "react";
import "../css/Fotter.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/PrivacyPolicy">Privacy Policy</a>
        </div>
        <div className="footer-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
        <p className="footer-text">© 2025 BCard. create by Yair Yerushalmi.</p>
      </div>
    </footer>
  );
}

export default Footer;

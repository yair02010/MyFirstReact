import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
              Facebook
            </a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
              Twitter
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

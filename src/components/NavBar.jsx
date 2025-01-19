import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faHome, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { getUserById } from '../services/UserService';
import "../css/Navbar.css";
import { notify } from "../utils/notify";

function Navbar({ setSearchTerm }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
      loadUser(userId);
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const loadUser = async (userId) => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUser(null);
    notify("logout");
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  const userIcon = user?.isAdmin 
    ? faUserTie 
    : user?.isBusiness 
    ? faBriefcase 
    : faUser;

  return (
    <nav className="navbar fixed-top navbar-expand-lg shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          BCard <FontAwesomeIcon icon={faHome} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/cards">
                    Cards
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/fav-card">
                    Fav Cards
                  </a>
                </li>
                {(user?.isBusiness || user?.isAdmin )&& (
                  <li className="nav-item">
                    <a className="nav-link" href="/myBizzCard">
                      My Cards
                    </a>
                  </li>
                )}
              </>
            )}
          </ul>
          <form className="d-flex me-3">
          </form>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <a className="nav-link" href="/profile">
                    <FontAwesomeIcon icon={userIcon} />
                  </a>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Signup
                  </a>
                </li>
              </>
            )}
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getUserById } from '../services/UserService';
import "../css/Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
      loadUser(userId);
    } else {
      setIsLoggedIn(false);
      setLoading(false); // אם המשתמש לא מחובר
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
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // אפשר להוסיף עיצוב מתאים
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          BCard
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
              </>
            )}
          </ul>
          <form className="d-flex me-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <a className="nav-link" href="/profile">
                    <FontAwesomeIcon icon={faUser} />
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

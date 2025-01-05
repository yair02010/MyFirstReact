import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getUserById } from '../services/UserService';
import "../css/Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
      loadUser(userId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const loadUser = async (userId) => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUser(null);
  };

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
            <li className="nav-item">
              <a className="nav-link" href="/fav-card">
                Fav Cards
              </a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a className="nav-link" href="/cards">
                  Cards
                </a>
              </li>
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
                    {user ? (
                      <img
                        src={user.profilePic || '/default-avatar.png'}
                        alt="Profile"
                        className="profile-img"
                      />
                    ) : (
                      'Profile'
                    )}
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

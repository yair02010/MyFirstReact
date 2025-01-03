import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Navbar({ userType }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <nav className={`navbar fixed-top ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          CardsAPP
        </a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="חיפוש"
            aria-label="Search"
          />
        </form>
        <button
          className="btn btn-outline-primary"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <ul className="navbar-nav ms-auto">
          {!userType && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  כניסה
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  הרשמה
                </a>
              </li>
            </>
          )}
          {userType === 'regular' && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/favorites">
                  המועדפים שלי
                </a>
              </li>
            </>
          )}
          {userType === 'business' && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/my-cards">
                  הכרטיסים שלי
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/create-card">
                  יצירת כרטיס חדש
                </a>
              </li>
            </>
          )}
          {userType === 'admin' && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/admin">
                  ניהול משתמשים
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

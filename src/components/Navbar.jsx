import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem('currentUser');

  // If user is not logged in, don't show the navbar
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    // Clear user from local storage
    localStorage.removeItem('currentUser');
    // Navigate back to login
    navigate('/');
  };

  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/home" className="navbar-logo">
          📰 MyNews
        </Link>
        
        <div className="navbar-links">
          <Link to="/home" className={isActive('/home')}>Home</Link>
          <Link to="/local" className={isActive('/local')}>Local News</Link>
          <Link to="/saved" className={isActive('/saved')}>Saved Posts</Link>
          <Link to="/profile" className={isActive('/profile')}>My Profile</Link>
          
          <button onClick={handleLogout} className="btn btn-outline" style={{ marginLeft: '1rem' }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="gradient-text font-bold">GyanSutra AI</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/internships">Internships</Link></li>
          <li><Link to="/contributors">Contributors</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
        <div className="navbar-cta">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

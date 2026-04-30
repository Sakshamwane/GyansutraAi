import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Zap, Users, CreditCard, GraduationCap, MessageCircle } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="gradient-text font-bold">GyanSutra AI</Link>
        </div>

        <div className={`navbar-links-container ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                <Home size={18} className="nav-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/features" onClick={() => setIsOpen(false)}>
                <Zap size={18} className="nav-icon" /> Features
              </Link>
            </li>
            <li>
              <Link to="/contributors" onClick={() => setIsOpen(false)}>
                <Users size={18} className="nav-icon" /> Contributors
              </Link>
            </li>
            <li>
              <Link to="/pricing" onClick={() => setIsOpen(false)}>
                <CreditCard size={18} className="nav-icon" /> Pricing
              </Link>
            </li>
            <li>
              <a href="https://lms.gyansutra.com/student-login" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                <GraduationCap size={18} className="nav-icon" /> LMS
              </a>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <MessageCircle size={18} className="nav-icon" /> Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-actions">


          <button className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

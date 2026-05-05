import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Zap, Users, GraduationCap, MessageCircle, Calendar, BookOpen, Heart } from 'lucide-react';
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
              <Link to="/events" onClick={() => setIsOpen(false)}>
                <Calendar size={18} className="nav-icon" /> Events
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setIsOpen(false)}>
                <BookOpen size={18} className="nav-icon" /> Blog
              </Link>
            </li>
            <li>
              <Link to="/join-us" onClick={() => setIsOpen(false)}>
                <Heart size={18} className="nav-icon" /> Join Us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <MessageCircle size={18} className="nav-icon" /> Contact Us
              </Link>
            </li>
          </ul>
          
          <div className="mobile-only lms-mobile-footer">
            <a 
              href="https://lms.gyansutra.com/student-login" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary w-full"
              onClick={() => setIsOpen(false)}
            >
              <GraduationCap size={18} className="mr-2" /> Login to LMS
            </a>
          </div>
        </div>

        <div className="navbar-actions">
          <a 
            href="https://lms.gyansutra.com/student-login" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="lms-login-btn desktop-only"
          >
            <GraduationCap size={16} className="mr-2" /> Login to LMS
          </a>

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

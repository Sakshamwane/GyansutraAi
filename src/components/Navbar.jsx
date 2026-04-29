import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Zap, 
  Users, 
  CreditCard, 
  GraduationCap, 
  Mail, 
  Menu, 
  X, 
  ExternalLink 
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Features', path: '/features', icon: <Zap size={18} /> },
    { name: 'Contributors', path: '/contributors', icon: <Users size={18} /> },
    { name: 'Pricing', path: '/pricing', icon: <CreditCard size={18} /> },
    { name: 'LMS', path: 'https://lms.gyansutra.com/student-login', icon: <GraduationCap size={18} />, external: true },
    { name: 'Contact Us', path: '/contact', icon: <Mail size={18} /> },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <span className="logo-icon">G</span>
            <span className="logo-text gradient-text">GyanSutra AI</span>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <ul className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.external ? (
                <a 
                  href={link.path} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="nav-link"
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.name}
                  <ExternalLink size={12} className="external-indicator" />
                </a>
              ) : (
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button 
            className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`} 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link, index) => (
            <li 
              key={link.name} 
              style={{ transitionDelay: `${index * 100}ms` }}
              className={isOpen ? 'fade-in' : ''}
            >
              {link.external ? (
                <a 
                  href={link.path} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.name}
                </a>
              ) : (
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

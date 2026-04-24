import React from 'react';
import './Footer.css';
import { Globe, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="gradient-text font-bold" style={{fontSize: '1.5rem', marginBottom: '1rem'}}>GyanSutra AI</h3>
            <p className="footer-description">
              Accelerating student placement journeys with AI and top-tier mentorship. Your success is our mission.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Globe size={20} /></a>
              <a href="#" className="social-icon"><MessageCircle size={20} /></a>
              <a href="#" className="social-icon"><Mail size={20} /></a>
              <a href="#" className="social-icon"><Phone size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h4>Platform</h4>
            <ul>
              <li><a href="#">AI Resume Builder</a></li>
              <li><a href="#">Mock Interviews</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Study Resources</a></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#mentors">Mentors</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom text-center">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} GyanSutra AI. All rights reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;

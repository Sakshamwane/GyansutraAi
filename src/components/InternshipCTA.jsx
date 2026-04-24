import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, CheckCircle2 } from 'lucide-react';
import './InternshipCTA.css';

const InternshipCTA = () => {
  return (
    <section className="internship-cta section">
      <div className="container">
        <div className="cta-grid">
          <div className="cta-content animate-fade-in-up">
            <div className="cta-badge">
              <Briefcase size={16} />
              <span>Real-World Experience</span>
            </div>
            <h2 className="cta-title">
              Bridge the Gap Between <span className="gradient-text">Campus and Corporate.</span>
            </h2>
            <p className="cta-description">
              Stop watching tutorials and start shipping real code. Our immersive industrial internships plug you directly into production-grade projects, mentored by elite engineers from top tech companies.
            </p>
            <ul className="cta-highlights">
              <li><CheckCircle2 size={18} className="highlight-icon" /> Live Enterprise Projects</li>
              <li><CheckCircle2 size={18} className="highlight-icon" /> 1:1 Industry Mentorship</li>
              <li><CheckCircle2 size={18} className="highlight-icon" /> Guaranteed Pre-Placement Assistance</li>
            </ul>
            <Link to="/internships" className="btn btn-primary btn-lg mt-6">
              Claim Your Spot <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <div className="cta-image-wrapper animate-fade-in-up delay-200">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Students collaborating on a tech project" 
              className="cta-image"
            />
            <div className="cta-image-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipCTA;

import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const Hero = ({ 
  title, 
  subtitle, 
  badgeText = "AI-Powered Placement Acceleration", 
  badgeIcon: BadgeIcon = Sparkles,
  showStats = true,
  showCta = true,
  ctaText = "Get Started",
  ctaLink = "/lms",
  secondaryCtaText = "Explore Features",
  secondaryCtaLink = "/pricing",
  minHeight = "100vh"
}) => {
  return (
    <section className="hero section" style={{ minHeight }}>
      <div className="hero-bg-glow"></div>
      <div className="container hero-container animate-fade-in-up">
        {badgeText && (
          <div className="hero-badge delay-100">
            <BadgeIcon className="badge-icon" size={16} />
            <span>{badgeText}</span>
          </div>
        )}
        
        <h1 className="hero-title delay-200">
          {title || (
            <>
              Master Your Placement Journey with <br className="hidden-mobile" />
              <span className="gradient-text">AI + Mentorship</span>
            </>
          )}
        </h1>
        
        <p className="hero-subtitle delay-300">
          {subtitle || "From resume to offer letter — everything in one platform. Clean, intelligent, and designed to help you succeed."}
        </p>
        
        {showCta && (
          <div className="hero-cta delay-300">
            <Link to={ctaLink} className="btn btn-primary btn-lg">
              {ctaText} <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to={secondaryCtaLink} className="btn btn-secondary btn-lg">
              {secondaryCtaText}
            </Link>
          </div>
        )}
        
        {showStats && (
          <div className="hero-stats delay-300">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Mentors</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Partner Colleges</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

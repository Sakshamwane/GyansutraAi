import React, { useState } from 'react';
import { Send, Building2, Users, ShieldCheck, Zap, Globe, BarChart3, Shield } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    studentCount: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your interest! Our team will contact you shortly to set up your free trial.");
    setFormData({ name: '', institution: '', email: '', phone: '', studentCount: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const institutionalFeatures = [
    { icon: <Users size={20} />, title: "Bulk Enrollment", desc: "Automated student onboarding at scale." },
    { icon: <Globe size={20} />, title: "Custom Branding", desc: "Your name, logo, and brand identity." },
    { icon: <BarChart3 size={20} />, title: "Deep Analytics", desc: "Detailed performance tracking." },
    { icon: <Shield size={20} />, title: "Enterprise Security", desc: "Encrypted data and access control." },
    { icon: <Zap size={20} />, title: "API Integration", desc: "Connect with your existing systems." },
    { icon: <Building2 size={20} />, title: "Dedicated Support", desc: "Personalized account management." }
  ];

  const faqs = [
    { q: "How long is the free trial period?", a: "Our institutional trial lasts for 14 days, providing full access for a selected cohort of students." },
    { q: "Can we integrate with our existing ERP?", a: "Yes, GyanSutra LMS offers robust API and webhook support for major institutional ERP systems." },
    { q: "Is there a limit on the number of students?", a: "No. Our plan scales from small colleges to large universities with over 50,000+ students." },
    { q: "Do you offer white-labeling?", a: "Yes. We can deploy the platform on your own subdomain with full brand customization." }
  ];

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <span className="badge-outline">Enterprise LMS</span>
          <h1 className="hero-title">Scalable Solutions for <span className="gradient-text">Modern Institutions</span></h1>
          <p className="hero-subtitle">Empower your students with an AI-driven learning ecosystem designed for excellence.</p>
        </div>
      </section>

      {/* Main Content: Features & Form */}
      <section className="pricing-main-section container">
        <div className="pricing-grid-layout">
          <div className="pricing-info-column">
            <h2 className="section-heading">Built for Institutional Excellence</h2>
            <div className="feature-grid-standard">
              {institutionalFeatures.map((item, index) => (
                <div className="feature-card-minimal" key={index}>
                  <div className="feature-icon-circle">{item.icon}</div>
                  <div className="feature-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mini-stats">
              <div className="stat-item">
                <span className="stat-num">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">100k+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>

          <div className="pricing-form-column">
            <div className="form-card-premium">
              <div className="card-header">
                <h3>Request a Demo</h3>
                <p>Set up your 14-day free trial today.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-field">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. Sarah Smith" required />
                </div>
                
                <div className="form-field">
                  <label>Institutional Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="sarah@university.edu" required />
                </div>
                
                <div className="form-field">
                  <label>Institution Name</label>
                  <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="GyanSutra University" required />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." required />
                  </div>
                  <div className="form-field">
                    <label>Student Volume</label>
                    <select name="studentCount" value={formData.studentCount} onChange={handleChange} required>
                      <option value="">Select Capacity</option>
                      <option value="<500">Less than 500</option>
                      <option value="500-2000">500 - 2,000</option>
                      <option value="2000+">2,000+</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Request Free Trial <Send size={18} className="ml-2" />
                </button>
              </form>
              
              <div className="form-security-badge">
                <ShieldCheck size={14} className="mr-1" /> Data secured by enterprise-grade encryption
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pricing-bottom-cta container">
        <div className="cta-colored-box">
          <div className="cta-content-wrapper">
            <h2 className="cta-title">Ready to modernize your campus?</h2>
            <p className="cta-subtitle">Join forward-thinking institutions using GyanSutra to bridge the gap between education and industry.</p>
          </div>
          <button className="btn-white">Contact Sales Team</button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

import React, { useState } from 'react';
import { Send, Building2, Users, ShieldCheck, Zap, Globe, BarChart3, ChevronDown, CheckCircle2 } from 'lucide-react';
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
    { icon: <Users size={24} />, title: "Bulk Enrollment", desc: "Easily manage thousands of students with automated onboarding." },
    { icon: <Globe size={24} />, title: "Custom Branding", desc: "Your institution's name, logo, and brand colors throughout the LMS." },
    { icon: <BarChart3 size={24} />, title: "Deep Analytics", desc: "Track performance at the student, course, or department level." },
    { icon: <ShieldCheck size={24} />, title: "Enterprise Security", desc: "Role-based access control and encrypted data management." },
    { icon: <Zap size={24} />, title: "API Integration", desc: "Connect with your existing ERP, CRM, or identity providers." },
    { icon: <Building2 size={24} />, title: "Dedicated Support", desc: "A personal account manager and 24/7 technical assistance." }
  ];

  const faqs = [
    { q: "How long is the free trial period?", a: "Our standard institutional trial lasts for 14 days, providing full access to all enterprise features for a selected cohort of students." },
    { q: "Can we integrate with our existing ERP?", a: "Yes, GyanSutra LMS offers robust API and webhook support for seamless integration with major institutional ERP and CRM systems." },
    { q: "Is there a limit on the number of students?", a: "Our institutional plan is designed to scale from small colleges with 500 students to large universities with over 50,000 students." },
    { q: "Do you offer white-labeling?", a: "Absolutely. We can deploy the platform on your own domain (e.g., lms.yourcollege.edu) with full brand customization." }
  ];

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="container">
          <span className="badge-outline">Enterprise Solutions</span>
          <h1 className="hero-title mt-4">Scalable LMS for <span className="gradient-text">Modern Institutions</span></h1>
          <p className="hero-subtitle">Transform your educational delivery with AI-powered tracking, custom branding, and industry-aligned curriculum.</p>
        </div>
      </section>

      <section className="pricing-main-section container">
        <div className="pricing-grid-layout">
          {/* Left Side: Value Proposition */}
          <div className="pricing-info-column">
            <h2 className="section-heading">Why Choose GyanSutra for your Institution?</h2>
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
            
            <div className="trust-indicators mt-12">
              <p className="small-text uppercase mb-4">Empowering 50+ Institutions Globally</p>
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
          </div>

          {/* Right Side: High-End Form */}
          <div className="pricing-form-column">
            <div className="form-card-premium glass-panel">
              <div className="card-header">
                <h3>Request Institutional Access</h3>
                <p>Start your 14-day free trial and experience the future of learning management.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-field">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Dr. Sarah Smith" required />
                </div>
                
                <div className="form-field">
                  <label>Institutional Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="sarah@university.edu" required />
                </div>
                
                <div className="form-field">
                  <label>Name of Institution</label>
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
                      <option value="2000-5000">2,000 - 5,000</option>
                      <option value="5000+">5,000+</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>Specific Use Case (Optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="e.g. Integration with SAP, AI-based proctoring..." rows="2"></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-full mt-4">
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

      {/* FAQ Section */}
      <section className="pricing-faq-section container">
        <div className="text-center mb-12">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="hero-subtitle">Everything you need to know about GyanSutra Institutional deployment.</p>
        </div>
        
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div className="faq-item glass-panel" key={index}>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="pricing-bottom-cta container">
        <div className="cta-colored-box">
          <div className="cta-content-wrapper">
            <h2 className="cta-title">Ready to modernize your campus?</h2>
            <p className="cta-subtitle">Join forward-thinking institutions using GyanSutra to bridge the gap between education and industry.</p>
          </div>
          <div className="cta-button-wrapper">
            <button className="btn btn-white btn-lg">Contact Sales Team</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

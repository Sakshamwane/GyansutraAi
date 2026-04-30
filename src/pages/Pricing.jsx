import React, { useState } from 'react';
import axios from 'axios';
import { Send, Building2, Users, ShieldCheck, Zap, Globe, BarChart3, Shield, Loader2 } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
      
      // Map studentCount to student_count for backend
      const payload = {
        name: formData.name,
        email: formData.email,
        institution: formData.institution,
        phone: formData.phone,
        student_count: formData.studentCount,
        message: formData.message
      };

      await axios.post(`${API_BASE}/api/training/request-demo/`, payload);
      
      setSubmitted(true);
      setFormData({ name: '', institution: '', email: '', phone: '', studentCount: '', message: '' });
    } catch (err) {
      console.error("Error submitting demo request:", err);
      alert("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
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
          <h1 className="hero-title">Scalable Solutions for <span className="gradient-text">Modern Institutions</span></h1>
          <p className="hero-subtitle">Empower your students with an AI-driven learning ecosystem designed for excellence.</p>
        </div>
      </section>

      {/* Top CTA Section */}
      <section className="pricing-top-cta container">
        <div className="cta-colored-box">
          <div className="cta-content-wrapper">
            <h2 className="cta-title">Ready to modernize your campus?</h2>
            <p className="cta-subtitle">Join forward-thinking institutions using GyanSutra to bridge the gap between education and industry.</p>
          </div>
          <a 
            href="https://wa.me/918543832619?text=When%20can%20we%20connect?" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-white"
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            Contact Sales Team
          </a>
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
              
              {submitted ? (
                <div className="form-success-message text-center p-8">
                  <div className="success-icon mb-4" style={{ color: '#10b981' }}>
                    <ShieldCheck size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                  <p className="text-gray-600">Thank you for your interest. Our institutional team will contact you at <strong>{formData.email}</strong> within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary mt-6">Send Another Request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="premium-form">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. Sarah Smith" required disabled={loading} />
                  </div>
                  
                  <div className="form-field">
                    <label>Institutional Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="sarah@university.edu" required disabled={loading} />
                  </div>
                  
                  <div className="form-field">
                    <label>Institution Name</label>
                    <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="GyanSutra University" required disabled={loading} />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." required disabled={loading} />
                    </div>
                    <div className="form-field">
                      <label>Student Volume</label>
                      <select name="studentCount" value={formData.studentCount} onChange={handleChange} required disabled={loading}>
                        <option value="">Select Capacity</option>
                        <option value="<500">Less than 500</option>
                        <option value="500-2000">500 - 2,000</option>
                        <option value="2000+">2,000+</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin mr-2" /> Submitting...</>
                    ) : (
                      <><Send size={18} className="ml-2" /> Request Free Trial</>
                    )}
                  </button>
                </form>
              )}
              
              <div className="form-security-badge">
                <ShieldCheck size={14} className="mr-1" /> Data secured by enterprise-grade encryption
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Pricing;

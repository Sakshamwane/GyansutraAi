import React, { useState } from 'react';
import { Check, Send, Building2, Users, ShieldCheck, Zap, Globe, BarChart3 } from 'lucide-react';
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
    // In a real app, you'd send this to your backend
    alert("Thank you for your interest! Our team will contact you shortly to set up your free trial.");
    setFormData({
      name: '',
      institution: '',
      email: '',
      phone: '',
      studentCount: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const institutionalFeatures = [
    { icon: <Users size={20} />, text: "Bulk Student Enrollment & Management" },
    { icon: <Globe size={20} />, text: "Custom Subdomain & Branding" },
    { icon: <BarChart3 size={20} />, text: "Advanced Analytics & Progress Tracking" },
    { icon: <ShieldCheck size={20} />, text: "Secure Institutional Data Management" },
    { icon: <Zap size={20} />, text: "LMS Integration with Existing Systems" },
    { icon: <Building2 size={20} />, text: "Dedicated Support & Account Manager" }
  ];

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="container">
          <h1 className="gradient-text">Institutional LMS Solutions</h1>
          <p>Empower your students with a world-class learning management system. Request a free trial today.</p>
        </div>
      </section>

      <section className="pricing-content container">
        <div className="institutional-layout">
          {/* Left Side: Institutional Plan Details */}
          <div className="institutional-card glass-panel animate-fade-in">
            <div className="plan-badge">Enterprise Ready</div>
            <h2>Institutional Plan</h2>
            <div className="plan-price-custom">
              <span className="amount">Custom Pricing</span>
              <p>Tailored to your institution's size and needs</p>
            </div>
            
            <div className="feature-list-institutional">
              {institutionalFeatures.map((item, index) => (
                <div className="feature-item-box" key={index}>
                  <div className="feature-icon-wrapper">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="plan-footer-info">
              <p>Includes everything in our core platform plus dedicated institutional tools.</p>
            </div>
          </div>

          {/* Right Side: Request Trial Form */}
          <div className="trial-form-container glass-panel animate-fade-in-up">
            <h3>Request a Free Trial</h3>
            <p>Fill out the form below and our team will get in touch to set up a personalized demo for your institution.</p>
            
            <form onSubmit={handleSubmit} className="trial-form">
              <div className="form-group">
                <label>Contact Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Institution Name</label>
                <input 
                  type="text" 
                  name="institution" 
                  value={formData.institution} 
                  onChange={handleChange} 
                  placeholder="University Name" 
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="john@university.edu" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+91 98765 43210" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Estimated Student Count</label>
                <select name="studentCount" value={formData.studentCount} onChange={handleChange} required>
                  <option value="">Select range</option>
                  <option value="100-500">100 - 500</option>
                  <option value="500-2000">500 - 2,000</option>
                  <option value="2000+">2,000+</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Additional Requirements</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Tell us about your specific needs..."
                  rows="3"
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">
                <Send size={18} className="mr-2" /> Request Free Trial
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

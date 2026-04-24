import React, { useState } from 'react';
import { Mail, Calendar, Send, MessageCircle, Camera, Briefcase, Globe } from 'lucide-react';
import Hero from '../components/Hero';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page section pt-24">
      <div className="container">
        <Hero 
          title={<span className="gradient-text">Get in Touch</span>}
          subtitle="We'd love to hear from you. Reach out to us for any queries or just to say hi!"
          badgeText="Contact Us"
          badgeIcon={Mail}
          showStats={false}
          showCta={false}
          minHeight="auto"
        />

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-container glass-panel animate-fade-in-up delay-100">
            <h2 className="form-title">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Write your message here..." rows="5"></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                <Send size={18} className="btn-icon" /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Information & Alternatives */}
          <div className="contact-info-container animate-fade-in-up delay-200">
            
            <div className="info-card glass-panel">
              <div className="info-icon-wrapper bg-blue">
                <Calendar size={24} className="info-icon" />
              </div>
              <div className="info-content">
                <h3>Schedule a Virtual Meeting</h3>
                <p>Discuss your needs directly with our experts at a time that works for you.</p>
                <button className="btn btn-secondary mt-2">Book a Slot</button>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper bg-green">
                <MessageCircle size={24} className="info-icon" />
              </div>
              <div className="info-content">
                <h3>Connect via WhatsApp</h3>
                <p>Get quick responses and support directly on WhatsApp.</p>
                <button className="btn btn-secondary mt-2">Chat with Us</button>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper bg-purple">
                <Mail size={24} className="info-icon" />
              </div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>Prefer email? Drop us a line and we'll reply within 24 hours.</p>
                <a href="mailto:contact@gyansutra.com" className="btn btn-secondary mt-2">contact@gyansutra.com</a>
              </div>
            </div>

            <div className="social-section glass-panel">
              <h3>Connect on Social Media</h3>
              <p>Follow us for updates, tips, and more.</p>
              <div className="social-links">
                <a href="#" className="social-link instagram" aria-label="Instagram"><Camera size={20} /></a>
                <a href="#" className="social-link linkedin" aria-label="LinkedIn"><Briefcase size={20} /></a>
                <a href="#" className="social-link facebook" aria-label="Facebook"><Globe size={20} /></a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

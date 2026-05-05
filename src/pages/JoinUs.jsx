import React, { useState } from 'react';
import axios from 'axios';
import { Users, Gift, TrendingUp, Award, CheckCircle, Smartphone, Shirt, Coffee, Send } from 'lucide-react';
import './JoinUs.css';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    linkedin_url: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/training/ambassador/register/', formData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.email || "Check your details and try again."));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="join-us-page flex items-center justify-center text-center">
        <div className="container py-40 animate-fade-in">
          <div className="success-icon mb-6 flex justify-center">
             <div className="p-6 bg-green-500/20 rounded-full text-green-500">
               <CheckCircle size={80} />
             </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">Welcome to the Tribe!</h1>
          <p className="text-xl text-slate-400 max-width-600 mx-auto mb-10">
            Your application to become a GyanSutra Campus Ambassador has been received. Our team will review your profile and get back to you within 48 hours.
          </p>
          <button onClick={() => window.location.href = '/'} className="btn btn-primary btn-lg">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="join-us-page">
      <section className="join-hero">
        <div className="container">
          <h1 className="gradient-text animate-fade-in-up">Lead the Future at Your Campus</h1>
          <p className="animate-fade-in-up delay-100">
            Join the GyanSutra Campus Ambassador Program. Empower your peers, build your network, and earn exclusive rewards while shaping the next generation of engineers.
          </p>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <div className="section-header text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Why Become an Ambassador?</h2>
            <p className="text-slate-400">Unlock opportunities that go beyond the classroom</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card animate-fade-in-up delay-100">
              <div className="benefit-icon"><TrendingUp size={30} /></div>
              <h3>Earn Credits</h3>
              <p>Promote GyanSutra services and earn credits for every referral. The more you share, the more you earn.</p>
            </div>
            <div className="benefit-card animate-fade-in-up delay-200">
              <div className="benefit-icon"><Gift size={30} /></div>
              <h3>Exclusive Goodies</h3>
              <p>Redeem your credits for premium swag including T-shirts, Mugs, iPads, and industry-standard gear.</p>
            </div>
            <div className="benefit-card animate-fade-in-up delay-300">
              <div className="benefit-icon"><Users size={30} /></div>
              <h3>Networking</h3>
              <p>Connect with a global community of ambassadors and top-tier mentors from the tech industry.</p>
            </div>
            <div className="benefit-card animate-fade-in-up delay-400">
              <div className="benefit-icon"><Award size={30} /></div>
              <h3>Certification</h3>
              <p>Receive an official Certificate of Appreciation and a Letter of Recommendation upon successful completion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rewards-showcase">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Rewards Gallery</h2>
            <p className="text-slate-400">What's waiting for you</p>
          </div>
          <div className="reward-grid">
            <div className="reward-item">
              <Shirt size={40} className="mx-auto mb-4 text-blue-400" />
              <span>GyanSutra T-Shirt</span>
            </div>
            <div className="reward-item">
              <Coffee size={40} className="mx-auto mb-4 text-orange-400" />
              <span>Premium Coffee Mug</span>
            </div>
            <div className="reward-item">
              <Smartphone size={40} className="mx-auto mb-4 text-purple-400" />
              <span>iPad / Tech Gear</span>
            </div>
            <div className="reward-item">
              <Award size={40} className="mx-auto mb-4 text-yellow-400" />
              <span>Elite Badges</span>
            </div>
          </div>
        </div>
      </section>

      <section className="registration-section" id="register">
        <div className="container">
          <div className="registration-container">
            <form className="join-form animate-fade-in-up" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Join the Program</h2>
                <p>Apply now and start your journey as a leader</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@university.edu" />
                </div>
                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} placeholder="linkedin.com/in/username" />
                </div>
                <div className="form-group">
                  <label>College Name</label>
                  <input type="text" name="college" required value={formData.college} onChange={handleChange} placeholder="Institute Name" />
                </div>
                <div className="form-group">
                  <label>Year of Study</label>
                  <select name="year" required value={formData.year} onChange={handleChange}>
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>Why do you want to join us?</label>
                  <textarea 
                    name="reason" 
                    required 
                    value={formData.reason} 
                    onChange={handleChange} 
                    rows="4" 
                    placeholder="Tell us about your campus reach and why you are the best fit..."
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-8 btn-lg" disabled={loading}>
                {loading ? 'Submitting Application...' : (
                  <>
                    Submit Application <Send size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;

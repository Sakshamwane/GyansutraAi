import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, Download, BookOpen, Clock, Code, X, ShoppingCart, User, Sparkles, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';
// Hero component removed – CTA now serves as the hero section
import './Internships.css';
import { Link } from 'react-router-dom';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourseInfo, setSelectedCourseInfo] = useState({ course: null, plan: null, price: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get('/api/training/admin/internships/');
        setInternships(res.data);
      } catch (err) {
        console.error("Error fetching internships:", err);
      }
    };
    fetchInternships();
  }, []);

  const handleApplyClick = (courseTitle, planName, price) => {
    setSelectedCourseInfo({ course: courseTitle, plan: planName, price: price });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');

      const payload = {
        ...formData,
        course: selectedCourseInfo.course,
        plan: selectedCourseInfo.plan,
        amount: selectedCourseInfo.price
      };

      const res = await axios.post(`${API_BASE}/api/training/register/`, payload);
      const { order_id, amount, currency, key_id, record_id, error } = res.data;

      if (error) throw new Error(error);

      const options = {
        key: key_id,
        amount: amount,
        currency: currency,
        name: 'GyanSutra AI Internships',
        description: `${selectedCourseInfo.course} - ${selectedCourseInfo.plan} Plan`,
        order_id: order_id,
        handler: async function (response) {
          await axios.post(`${API_BASE}/api/training/verify-payment/`, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            record_id: record_id
          });
          window.location.href = '/success';
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#3b82f6' }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          alert("Payment failed: " + response.error.description);
        });
        rzp.open();
      } else {
        alert('Razorpay SDK failed to load. Are you online?');
      }
    } catch (err) {
      console.error(err);
      let errorMsg = err.response?.data?.error || err.message || 'Something went wrong';
      if (typeof errorMsg === 'object') errorMsg = JSON.stringify(errorMsg);
      alert('Error processing request: ' + errorMsg);
    }
    setLoading(false);
  };

  return (
    <div className="training-page">
      <div className="container">
        {/* Internships Call‑to‑Action */}
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
                  Stop watching tutorials and start shipping real code. Our immersive industrial internships plug you directly into production‑grade projects, mentored by elite engineers from top tech companies.
                </p>
                <ul className="cta-highlights">
                  <li><CheckCircle size={18} className="highlight-icon" /> Live Enterprise Projects</li>
                  <li><CheckCircle size={18} className="highlight-icon" /> 1:1 Industry Mentorship</li>
                  <li><CheckCircle size={18} className="highlight-icon" /> Guaranteed Pre‑Placement Assistance</li>
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
        

        <div className="courses-grid mt-12 animate-fade-in-up delay-200">
          {internships.map((course) => (
            <CourseCard key={course.id} course={course} onApply={handleApplyClick} />
          ))}
        </div>

        {internships.length === 0 && (
          <div className="text-center mt-20">
            <h3 className="gradient-text">Exciting Programs Coming Soon!</h3>
            <p className="subtitle">We're finalizing our latest industrial training modules. Check back shortly.</p>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              <X size={24} />
            </button>
            <div className="payment-badge">₹{selectedCourseInfo.price} ({selectedCourseInfo.plan} Plan)</div>
            <form className="training-form" onSubmit={handleFormSubmit}>
              <h3>Register for {selectedCourseInfo.course}</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Phone Number (WhatsApp)</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>College Name</label>
                <input type="text" name="college" required value={formData.college} onChange={handleChange} placeholder="IIT, NIT, IIIT etc." />
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
              <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
                {loading ? 'Processing...' : `Secure Slot & Pay ₹${selectedCourseInfo.price}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const CourseCard = ({ course, onApply }) => {
  const [activePlan, setActivePlan] = useState('Basic');
  
  // Handle dynamic plans from API
  const plans = Array.isArray(course.plans) ? course.plans : [];
  const currentPlan = plans.find(p => p.name === activePlan) || plans[0] || { name: 'Basic', price: course.price, features: [] };
  
  // Combine core bullet points with plan features
  const allFeatures = [...(course.bullet_points || []), ...(currentPlan.features || [])];

  return (
    <div className="course-card">
      <div className="course-image-wrapper">
        <img src={course.image_url} alt={course.title} className="course-image" />
        <div className="course-bookmark">
          <Target size={18} />
        </div>
      </div>

      <div className="course-body">
        <div className="curriculum-link-wrapper">
          <span className="curriculum-link">
             <BookOpen size={14} className="mr-1" /> Training Module
          </span>
        </div>
        
        <h3 className="course-title-new">{course.title}</h3>
        
        <div className="course-meta">
          <span className="meta-item"><User size={14} className="mr-1" /> 500+ Enrolled</span>
          <span className="meta-item"><Clock size={14} className="ml-2 mr-1" /> 2 Months</span>
        </div>

        <div className="course-author">
          <div className="author-avatar">GS</div>
          <div className="author-info">
            <span className="author-name">By GyanSutra AI</span>
            <span className="author-category">Professional Track</span>
          </div>
        </div>

        {plans.length > 0 && (
          <div className="plan-selector">
            <select value={activePlan} onChange={(e) => setActivePlan(e.target.value)} className="plan-dropdown">
              {plans.map(p => (
                <option key={p.name} value={p.name}>{p.name} Plan</option>
              ))}
            </select>
          </div>
        )}

        <div className="plan-details animate-fade-in-up">
          <ul className="plan-features">
            {allFeatures.map((feat, i) => (
              <li key={i}><Sparkles size={12} className="mr-1 text-blue-400" /> {feat}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="course-footer">
        <div className="course-pricing">
          <span className="price-original">₹{(parseFloat(currentPlan.price || 0) * 1.5).toFixed(0)}</span>
          <span className="price-current">₹{parseFloat(currentPlan.price || 0).toLocaleString('en-IN')}</span>
        </div>
        <button className="btn-enroll-outline" onClick={() => onApply(course.title, currentPlan.name, currentPlan.price)}>
          <ShoppingCart size={16} className="mr-2" /> Enroll Now
        </button>
      </div>
    </div>
  );
};

export default Internships;

import React, { useState } from 'react';
import axios from 'axios';
import { Target, Download, BookOpen, Clock, Code, X, ShoppingCart, User } from 'lucide-react';
import Hero from '../components/Hero';
import './Internships.css';

const courseCatalog = [
  {
    id: 'fswd',
    title: 'Full Stack Web Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    tags: ['MERN Stack', 'React', 'Node.js'],
    students: 440,
    file: '/curriculum/Application_form_HCLTFP2043381.pdf',
    plans: {
      Basic: { price: 1, details: 'Master core frontend to backend concepts and build 1 portfolio project.', features: ['⏳ 2 Months Duration', '💻 Live Classes', '💬 Doubt Solving', '🛠️ 1 Minor Project'] },
      Pro: { price: 1500, details: 'Advanced deployment, system architecture, and intensive real-world project building.', features: ['⏳ 2 Months Duration', '💻 Live Classes', '🚀 3 Major Projects', '📜 Certification'] },
      Premium: { price: 3000, details: 'Complete placement guaranteed track with rigorous 1:1 mentorship from industry leads.', features: ['⏳ 2 Months Duration', '🤝 1:1 Mentorship', '🏢 Enterprise Projects', '💼 Placement Guarantee'] }
    }
  },
  {
    id: 'dsai',
    title: 'Data Science & GenAI',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Machine Learning', 'LLMs'],
    students: 320,
    file: '/curriculum/data-science.pdf',
    plans: {
      Basic: { price: 600, details: 'Python fundamentals, data visualization, and exploratory data analysis.', features: ['⏳ 2 Months Duration', '💻 Live Classes', '📓 Jupyter Tools', '🛠️ 1 Minor Project'] },
      Pro: { price: 1800, details: 'Deep ML pipelines, NLP fundamentals, and predictive modeling.', features: ['⏳ 2 Months Duration', '🧠 Deep Learning', '🚀 2 Major Projects', '📜 Certification'] },
      Premium: { price: 3500, details: 'Build RAG Agents, use LangChain, and get end-to-end placement assistance.', features: ['⏳ 2 Months Duration', '🤖 Build AI Agents', '🤝 1:1 Mentorship', '💼 Placement Guarantee'] }
    }
  }
];

const Internships = () => {
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
        {/* Hero Section */}
        <Hero 
          title="Industrial Internship Programs"
          subtitle="If you are an individual looking for rigorous industrial training, globally recognized certifications, and active research work, then explore our premium programs below."
          badgeText="Internships"
          badgeIcon={Target}
          showStats={false}
          showCta={false}
          minHeight="auto"
        />

        {/* Course Cards */}
        <div className="courses-grid mt-12 animate-fade-in-up delay-200">
          {courseCatalog.map((course) => (
            <CourseCard key={course.id} course={course} onApply={handleApplyClick} />
          ))}
        </div>
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

/* Sub-component for individual cards to hold their own Select logic cleanly */
const CourseCard = ({ course, onApply }) => {
  const [activePlan, setActivePlan] = useState('Basic');
  const planData = course.plans[activePlan];

  return (
    <div className="course-card">
      <div className="course-image-wrapper">
        <img src={course.image} alt={course.title} className="course-image" />
        <div className="course-bookmark">
          <Target size={18} />
        </div>
      </div>

      <div className="course-body">
        <a href={course.file} className="curriculum-link" download title="Curriculum">
          <Download size={14} className="mr-1" /> Download Curriculum
        </a>
        
        <h3 className="course-title-new">{course.title}</h3>
        
        <div className="course-meta">
          <span className="meta-item"><User size={14} className="mr-1" /> {course.students}</span>
        </div>

        <div className="course-author">
          <div className="author-avatar">GS</div>
          <div className="author-info">
            <span className="author-name">By GyanSutra AI</span>
            <span className="author-category">In Internships</span>
          </div>
        </div>

        <div className="plan-selector">
          <select value={activePlan} onChange={(e) => setActivePlan(e.target.value)} className="plan-dropdown">
            <option value="Basic">Basic Plan</option>
            <option value="Pro">Pro Plan</option>
            <option value="Premium">Premium Plan</option>
          </select>
        </div>

        <div className="plan-details animate-fade-in-up">
          <ul className="plan-features">
            {planData.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="course-footer">
        <div className="course-pricing">
          <span className="price-original">₹{(planData.price * 2).toLocaleString('en-IN')}.00</span>
          <span className="price-current">₹{planData.price.toLocaleString('en-IN')}.00</span>
        </div>
        <button className="btn-enroll-outline" onClick={() => onApply(course.title, activePlan, planData.price)}>
          <ShoppingCart size={16} className="mr-2" /> Enroll Now
        </button>
      </div>
    </div>
  );
};

export default Internships;

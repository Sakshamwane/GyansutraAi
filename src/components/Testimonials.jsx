import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Rohan Sharma",
    role: "Placed at Google",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I went from struggling with algorithms to cracking a top product-based company. The 1:1 mentorship here is literally the cheat code for your tech career."
  },
  {
    id: 2,
    name: "Priya Desai",
    role: "Software Engineer Intern",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The industrial internship program gave me real-world production experience. During technical interviews, my projects spoke far louder than my resume ever could."
  },
  {
    id: 3,
    name: "Aman Gupta",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    text: "Every single module is designed to eliminate the fluff. I learned more practical engineering in 2 months here than I did in 3 entire years of college."
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Placed at Microsoft",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "The mock interviews and resume reviews are incredibly rigorous. By the time I sat for my actual placement drive, answering complex system design questions felt like a breeze."
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "This isn't just another certification; it's a complete career ecosystem. The community and the mentors genuinely invest in pushing you beyond your limits."
  }
];

const Testimonials = () => {
  // We duplicate the testimonials to create a seamless infinite scrolling effect
  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section section">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="title">Don't Just Take Our Word For It</h2>
          <p className="subtitle mx-auto">
            Join thousands of students who have accelerated their careers and secured top placements through our programs.
          </p>
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {scrollingTestimonials.map((testimonial, idx) => (
            <div className="testimonial-card" key={`${testimonial.id}-${idx}`}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-icon" fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} className="author-img" />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

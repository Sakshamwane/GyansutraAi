import React from 'react';
import './Mentors.css';
import { Star, Building } from 'lucide-react';

const mentorData = [
  {
    name: "Rohan Sharma",
    role: "ML Engineer",
    company: "Google",
    image: "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/mentor_1_1776937082773.png",
    achievements: ["Built GenAI systems", "Ex-Amazon", "150+ mentees placed"]
  },
  {
    name: "Aisha Patel",
    role: "SDE II",
    company: "Microsoft",
    image: "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/mentor_1_1776937082773.png",
    achievements: ["Cloud infrastructure", "Top 1% Leetcode", "Interviewed 200+ candidates"]
  },
  {
    name: "Vikram Singh",
    role: "Senior SDE",
    company: "Meta",
    image: "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/mentor_1_1776937082773.png",
    achievements: ["System Design expert", "Open source contributor", "Led 50+ workshops"]
  }
];

const Mentors = () => {
  return (
    <section className="section mentors-section" id="mentors">
      <div className="container">
        <div className="text-center animate-fade-in-up">
          <h2 className="title">Our Contributors</h2>
          <p className="subtitle">Showcasing all the people who have contributed to our mission in some way or the other</p>
        </div>
        
        <div className="mentors-grid mt-4">
          {mentorData.map((mentor, index) => (
            <div className="mentor-card" key={index}>
              <div className="mentor-image-wrapper">
                <img src={mentor.image} alt={mentor.name} className="mentor-image" />
                <div className="mentor-badge">
                  <Star size={12} className="mr-1" /> Top Mentor
                </div>
              </div>
              <div className="mentor-content">
                <h3 className="mentor-name">{mentor.name}</h3>
                <div className="mentor-role">
                  <Building size={14} className="mr-1" /> {mentor.role} @ {mentor.company}
                </div>
                <ul className="mentor-achievements">
                  {mentor.achievements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;

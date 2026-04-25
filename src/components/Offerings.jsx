import React from 'react';
import './Offerings.css';
import { Bot, FileText, Calendar, Users, Briefcase, GraduationCap, Compass, BookOpen, Layers } from 'lucide-react';

const offeringData = [
  { icon: <Bot size={24} />, title: "AI Mock Interviews", desc: "Real-time feedback & performance insights" },
  { icon: <FileText size={24} />, title: "AI Resume Builder", desc: "ATS-friendly, optimized resumes" },
  { icon: <Calendar size={24} />, title: "Events", desc: "Coding challenges, hackathons, live leaderboards" },
  { icon: <Users size={24} />, title: "Workshops", desc: "Industry-relevant sessions" },
  { icon: <Briefcase size={24} />, title: "Placement Support", desc: "End-to-end preparation guidance" },
  { icon: <GraduationCap size={24} />, title: "Mentoring", desc: "1:1 + group mentorship" },
  { icon: <Compass size={24} />, title: "Career Guidance", desc: "Structured roadmaps & planning" },
  { icon: <BookOpen size={24} />, title: "Study Resources", desc: "Curated prep materials" },
  { icon: <Layers size={24} />, title: "Courses", desc: "Structured learning tracks" }
];

const Offerings = () => {
  return (
    <section className="section offerings-section" id="offerings">
      <div className="container">
        <div className="offerings-header text-center animate-fade-in-up">
          <h2 className="title">Everything You Need to Succeed</h2>
          <p className="subtitle">A complete ecosystem for your placement preparation</p>
        </div>
        
        <div className="offerings-grid mt-4">
          {offeringData.map((item, index) => (
            <div className="offering-card" key={index}>
              <div className="offering-card-header">
                <div className="offering-icon">
                  {item.icon}
                </div>
                <h3 className="offering-title">{item.title}</h3>
              </div>
              <p className="offering-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;

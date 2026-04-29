import React from 'react';
import { Briefcase, Calendar, FileText, Bot, BookOpen, Users, GraduationCap, Microscope, Code, Award, CheckCircle } from 'lucide-react';
import './Features.css';

const Features = () => {
  const featureList = [
    {
      id: "jobs",
      title: "Global Jobs Portal",
      description: "Access a curated list of job opportunities from top tech companies worldwide. Our platform connects you with roles that match your skills and career aspirations.",
      icon: <Briefcase size={24} />,
      image: "/features/jobs.png",
      color: "#6366f1",
      highlights: ["Direct Referrals", "Company Insights", "Salary Benchmarking"]
    },
    {
      id: "events",
      title: "Immersive Tech Events",
      description: "Stay ahead with our dynamic events calendar. Participate in high-stakes hackathons, competitive coding challenges, and insightful tech talks from industry leaders.",
      icon: <Calendar size={24} />,
      image: "/features/events.png",
      color: "#10b981",
      highlights: ["Global Hackathons", "Live Leaderboards", "Expert Webinars"]
    },
    {
      id: "resume",
      title: "AI-Powered Resume Builder",
      description: "Craft the perfect resume with our intelligent builder. Get real-time AI suggestions to optimize your content for Applicant Tracking Systems (ATS) and recruiters.",
      icon: <FileText size={24} />,
      image: "/features/resume.png",
      color: "#f59e0b",
      highlights: ["ATS Optimization", "Smart Suggestions", "Premium Templates"]
    },
    {
      id: "interview",
      title: "AI Mock Interviews",
      description: "Practice your interview skills with our sophisticated AI interviewer. Receive instant feedback on your technical accuracy, communication, and confidence.",
      icon: <Bot size={24} />,
      image: "/features/interview.png",
      color: "#ef4444",
      highlights: ["Behavioral Analysis", "Technical Drills", "Performance Metrics"]
    },
    {
      id: "resources",
      title: "Comprehensive Resource Library",
      description: "Unlock a treasure trove of study materials. From system design to deep learning, our curated resources help you master any topic at your own pace.",
      icon: <BookOpen size={24} />,
      image: "/features/resources.png",
      color: "#8b5cf6",
      highlights: ["Curated Roadmaps", "Practice Sets", "Video Tutorials"]
    },
    {
      id: "alumni",
      title: "Alumni Network & Mentorship",
      description: "Connect with a global community of alumni from top-tier institutions. Gain valuable career advice and mentorship from those who have already succeeded.",
      icon: <Users size={24} />,
      image: "/features/alumni.png",
      color: "#ec4899",
      highlights: ["1:1 Mentorship", "Peer Networking", "Success Stories"]
    },
    {
      id: "workshops",
      title: "Skill Building Workshops",
      description: "Join hands-on sessions led by industry experts. Master in-demand technologies and frameworks through practical, project-based learning.",
      icon: <GraduationCap size={24} />,
      image: "/features/workshops.png",
      color: "#06b6d4",
      highlights: ["Live Coding", "Certification", "Industry Use-cases"]
    },
    {
      id: "research",
      title: "Research Work Opportunities",
      description: "Contribute to cutting-edge research in AI and emerging technologies. Collaborate with mentors on high-impact papers and projects.",
      icon: <Microscope size={24} />,
      image: "/features/research.png",
      color: "#f97316",
      highlights: ["Paper Publications", "Data Science Labs", "Expert Guidance"]
    },
    {
      id: "projects",
      title: "Real-World Project Collaboration",
      description: "Work on production-grade projects in a collaborative environment. Experience the full software development lifecycle with modern tools.",
      icon: <Code size={24} />,
      image: "/features/projects.png",
      color: "#14b8a6",
      highlights: ["Agile Workflow", "Code Reviews", "Portfolio Building"]
    },
    {
      id: "leaderboard",
      title: "Global Student Leaderboard",
      description: "Compete with peers from around the world. Earn points, badges, and rankings as you learn and participate in platform activities.",
      icon: <Award size={24} />,
      image: "/features/leaderboard.png",
      color: "#a855f7",
      highlights: ["Skill Badges", "Monthly Rankings", "Exclusive Rewards"]
    }
  ];

  return (
    <div className="features-page">
      <section className="features-hero">
        <div className="container">
          <h1 className="gradient-text">Unlock Your Potential with GyanSutra</h1>
          <p>Explore the powerful tools and features designed to accelerate your learning and career growth.</p>
        </div>
      </section>

      <div className="feature-sections-container">
        {featureList.map((feature, index) => (
          <section key={feature.id} className={`feature-section ${index % 2 !== 0 ? 'reverse' : ''}`}>
            <div className="container feature-grid">
              <div className="feature-image-wrapper animate-fade-in">
                <div className="image-overlay"></div>
                <img src={feature.image} alt={feature.title} className="feature-image" />
              </div>
              <div className="feature-content animate-fade-in-up">
                <div 
                  className="feature-icon-badge" 
                  style={{ 
                    backgroundColor: `${feature.color}15`, 
                    color: feature.color,
                    border: `1px solid ${feature.color}30`
                  }}
                >
                  {feature.icon}
                </div>
                <h2 className="feature-title">{feature.title}</h2>
                <p className="feature-description">{feature.description}</p>
                <ul className="feature-highlights">
                  {feature.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>
                      <CheckCircle size={18} className="check-icon" style={{ color: feature.color }} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary mt-4">Learn More</button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Features;

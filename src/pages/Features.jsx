import React from 'react';
import { Layout, Shield, Zap, BarChart, Users, Globe, BookOpen, MessageSquare } from 'lucide-react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <Layout className="feature-icon" />,
      title: "Interactive LMS",
      description: "A seamless, intuitive learning management system designed for modern students. Track your progress with ease."
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Secure & Reliable",
      description: "Your data and progress are safe with our enterprise-grade security and cloud infrastructure."
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations and performance analytics driven by advanced AI algorithms."
    },
    {
      icon: <BarChart className="feature-icon" />,
      title: "Detailed Analytics",
      description: "Visualize your growth with comprehensive charts and metrics that help you identify strengths and weaknesses."
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Collaborative Learning",
      description: "Connect with peers and mentors through integrated discussion forums and group projects."
    },
    {
      icon: <BookOpen className="feature-icon" />,
      title: "Rich Resource Library",
      description: "Access a vast collection of study materials, courses, and practice tests curated by industry experts."
    },
    {
      icon: <MessageSquare className="feature-icon" />,
      title: "24/7 Support",
      description: "Get your doubts resolved anytime with our AI chatbot and dedicated support team."
    },
    {
      icon: <Globe className="feature-icon" />,
      title: "Access Anywhere",
      description: "Learn on the go with our mobile-responsive platform. Your classroom is wherever you are."
    }
  ];

  return (
    <div className="features-page">
      <section className="features-hero">
        <div className="container">
          <h1 className="gradient-text">Powerful Features for Modern Learning</h1>
          <p>Discover how GyanSutra LMS transforms the educational experience with cutting-edge technology.</p>
        </div>
      </section>

      <section className="features-grid-section container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card glass-panel animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;

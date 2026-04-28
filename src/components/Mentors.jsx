import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mentors.css';
import { Star, Building } from 'lucide-react';

const Mentors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await axios.get('/api/training/admin/contributors/');
        setContributors(res.data);
      } catch (err) {
        console.error("Error fetching contributors:", err);
      }
    };
    fetchContributors();
  }, []);

  return (
    <section className="section mentors-section" id="mentors">
      <div className="container">
        <div className="text-center animate-fade-in-up">
          <h2 className="title">Our Contributors</h2>
          <p className="subtitle">Showcasing all the people who have contributed to our mission in some way or the other</p>
        </div>
        
        <div className="mentors-track-container mt-8">
          <div className="mentors-track">
            {[...contributors, ...contributors].map((mentor, index) => {
              const achievementsList = typeof mentor.achievements === 'string' 
                ? mentor.achievements.split(/,|\n/).filter(a => a.trim() !== "")
                : (mentor.achievements || []);

              return (
                <div className="mentor-card" key={`${mentor.id}-${index}`}>
                  <div className="mentor-image-wrapper">
                    <img src={mentor.image_url} alt={mentor.name} className="mentor-image" />
                    <div className="mentor-badge">
                      <Star size={12} className="mr-1" /> Top Contributor
                    </div>
                  </div>
                  <div className="mentor-content">
                    <h3 className="mentor-name">{mentor.name}</h3>
                    <div className="mentor-role">
                      <Building size={14} className="mr-1" /> {mentor.position} @ {mentor.company}
                    </div>
                    <ul className="mentor-achievements">
                      {achievementsList.slice(0, 3).map((item, i) => (
                        <li key={i}>{item.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {contributors.length === 0 && (
          <div className="text-center mt-8">
            <p className="subtitle">Stay tuned! Our mission drivers are joining soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Mentors;

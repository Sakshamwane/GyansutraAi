import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Partners.css';

const Partners = () => {
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const res = await axios.get('/api/training/admin/institutes/');
        setInstitutes(res.data);
      } catch (err) {
        console.error("Error fetching institutes:", err);
      }
    };
    fetchInstitutes();
  }, []);

  return (
    <section className="section partners-section" id="partners">
      <div className="container text-center animate-fade-in-up">
        <h2 className="title" style={{fontSize: '2rem'}}>Trusted by Students Across Top Institutions</h2>
      </div>

      <div className="partners-grid-container container mt-12">
        <div className="partners-flex">
          {institutes.map((inst, index) => (
            <div className="partner-card" key={index}>
              <div className="partner-logo-wrapper">
                <img src={inst.logo_url} alt={inst.name} className="partner-logo" />
              </div>
              <span className="partner-name">{inst.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

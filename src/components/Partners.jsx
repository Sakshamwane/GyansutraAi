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

  // Duplicate logos for smooth infinite scroll if enough logos exist
  const scrollingInstitutes = institutes.length > 0 
    ? [...institutes, ...institutes, ...institutes, ...institutes]
    : [];

  if (institutes.length === 0) return null;

  return (
    <section className="section partners-section" id="partners">
      <div className="container text-center animate-fade-in-up">
        <h2 className="title" style={{fontSize: '2rem'}}>Trusted by Students Across Top Institutions</h2>
      </div>

      <div className="marquee-container mt-8">
        <div className="marquee-track partners-track">
          {scrollingInstitutes.map((inst, index) => (
            <div className="partner-logo-wrapper" key={index}>
              <img src={inst.logo_url} alt={inst.name} title={inst.name} className="partner-logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

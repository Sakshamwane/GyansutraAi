import React from 'react';
import './Partners.css';

const partnerLogos = [
  "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/partner_logo_1_1776937100487.png",
  "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/partner_logo_1_1776937100487.png",
  "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/partner_logo_1_1776937100487.png",
  "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/partner_logo_1_1776937100487.png",
  "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/partner_logo_1_1776937100487.png",
  "/@fs/Users/apple/.gemini/antigravity/brain/a104276d-4420-4d80-b386-361804e43ac8/partner_logo_1_1776937100487.png"
];

const Partners = () => {
  const baseLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];
  const scrollingLogos = [...baseLogos, ...baseLogos];

  return (
    <section className="section partners-section" id="partners">
      <div className="container text-center animate-fade-in-up">
        <h2 className="title" style={{fontSize: '2rem'}}>Trusted by Students Across Top Institutions</h2>
      </div>

      <div className="marquee-container mt-8">
        <div className="marquee-track partners-track">
          {scrollingLogos.map((logo, index) => (
            <div className="partner-logo-wrapper" key={index}>
              <img src={logo} alt={`Partner College ${index+1}`} className="partner-logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

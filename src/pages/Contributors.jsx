import React from 'react';
import Mentors from '../components/Mentors';
import CompanyLogos from '../components/CompanyLogos';
import Testimonials from '../components/Testimonials';
import Hero from '../components/Hero';
import { Users } from 'lucide-react';

const Contributors = () => {
  return (
    <div className="contributors-page">
      <Hero 
        title="LMS Experts & Contributors"
        subtitle="Meet the industry leaders and mentors powering the GyanSutra learning ecosystem."
        showStats={false}
        showCta={false}
        minHeight="auto"
      />
      <div style={{ paddingBottom: '2rem' }}>
        <Mentors />
      </div>
      <CompanyLogos />
      <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Testimonials />
      </div>
    </div>
  );
};

export default Contributors;

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
        title={
          <>
            LMS Experts & <span className="gradient-text">Contributors</span>
          </>
        }
        subtitle="Meet the industry leaders and mentors powering the GyanSutra learning ecosystem."
        showStats={false}
        showCta={false}
        minHeight="60vh"
      />
      <div style={{ marginTop: '-8rem', position: 'relative', zIndex: 20 }}>
        <Mentors hideTitle={true} />
      </div>
      <CompanyLogos />
      <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Testimonials />
      </div>
    </div>
  );
};

export default Contributors;

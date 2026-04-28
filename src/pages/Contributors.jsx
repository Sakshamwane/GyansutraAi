import React from 'react';
import Mentors from '../components/Mentors';
import Hero from '../components/Hero';
import { Users } from 'lucide-react';

const Contributors = () => {
  return (
    <div className="contributors-page">
      <Hero 
        title="LMS Experts & Contributors"
        subtitle="Meet the industry leaders and mentors powering the GyanSutra learning ecosystem."
        badgeText="Community"
        badgeIcon={Users}
        showStats={false}
        showCta={false}
        minHeight="auto"
      />
      <div style={{ paddingBottom: '4rem' }}>
        <Mentors />
      </div>
    </div>
  );
};

export default Contributors;

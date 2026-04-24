import React from 'react';
import Mentors from '../components/Mentors';
import Hero from '../components/Hero';
import { Users } from 'lucide-react';

const Contributors = () => {
  return (
    <div className="contributors-page">
      <Hero 
        title="Our Mission Drivers"
        subtitle="Meet the amazing individuals and mentors who make our vision a reality."
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

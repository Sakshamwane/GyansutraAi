import React from 'react';
import Hero from '../components/Hero';

import Partners from '../components/Partners';
const Home = () => {
  return (
    <main>
      <Hero 
        badgeText="Next-Gen Learning Management System"
        title={
          <>
            Empower Your Future with <br className="hidden-mobile" />
            <span className="gradient-text">GyanSutra LMS</span>
          </>
        }
        subtitle="A comprehensive AI-driven platform for students, mentors, and institutions to excel in the digital age."
        ctaText="Try for Free"
        ctaLink="/lms"
        secondaryCtaText="See Pricing"
        secondaryCtaLink="/pricing"
      />

      <Offerings />
      <Partners />
    </main>
  );
};

export default Home;

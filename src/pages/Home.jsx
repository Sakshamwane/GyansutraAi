import React from 'react';
import Hero from '../components/Hero';

import Partners from '../components/Partners';
import Offerings from '../components/Offerings';

const Home = () => {
  return (
    <main>
      <Hero 
        title={
          <>
            Empower Your Future with <br className="hidden-mobile" />
            <span className="gradient-text">GyanSutra LMS</span>
          </>
        }
        subtitle="A comprehensive AI-driven platform for students, mentors, and institutions to excel in the digital age."
        ctaText="Try for Free"
        ctaLink="https://lms.gyansutra.com/student-login"
        secondaryCtaText="Learn More"
        secondaryCtaLink="/features"
      />

      <Offerings />
      <Partners />
    </main>
  );
};

export default Home;

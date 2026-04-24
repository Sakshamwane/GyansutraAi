import React from 'react';
import Hero from '../components/Hero';
import InternshipCTA from '../components/InternshipCTA';
import Partners from '../components/Partners';
import Testimonials from '../components/Testimonials';
import Offerings from '../components/Offerings';

const Home = () => {
  return (
    <main>
      <Hero />
      <InternshipCTA />
      <Offerings />
      <Partners />
      <Testimonials />
    </main>
  );
};

export default Home;

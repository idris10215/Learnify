import React from 'react';
import HeroSection from '../components/landingPageComponents/HeroSection';
import BenefitsSection from '../components/landingPageComponents/BenefitsSection';
import HowItWorksSection from '../components/landingPageComponents/HowItWorksSection';
import TestimonialsSection from '../components/landingPageComponents/TestimonialsSection';

const LandingPage = () => {
  return (
    <main >
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </main>
  );
};

export default LandingPage;

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { DesignProvider } from './context/DesignContext';
import Loader from './components/ui/Loader';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/Navbar';
import Background from './components/Background';
import MouseGlow from './components/MouseGlow';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import WhyChooseUs from './sections/WhyChooseUs';
import Process from './sections/Process';
import Technologies from './sections/Technologies';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  // Page-wide scroll progress value
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <DesignProvider>
      {/* Immersive SVG Pre-Loader */}
      <Loader />

      {/* Advanced spring custom cursor */}
      <CustomCursor />

      {/* Thin gradient scroll progress indicator at absolute top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#7C3AED] to-[#06B6D4] origin-left z-[9999]"
        style={{ scaleX }}
      />

      <div className="relative min-h-screen text-white bg-bgMain font-sans overflow-x-hidden selection:bg-[#3B82F6]/30 selection:text-white">
        {/* Animated ambient background */}
        <Background />
        
        {/* Smooth mouse tracking glow halo */}
        <MouseGlow />

        {/* Header Sticky Navbar */}
        <Navbar />

        {/* Sections Wrapper */}
        <main className="relative z-10">
          <Hero />
          <div className="blend-separator" />
          <About />
          <div className="blend-separator" />
          <Services />
          <div className="blend-separator" />
          <Portfolio />
          <div className="blend-separator" />
          <WhyChooseUs />
          <div className="blend-separator" />
          <Process />
          <div className="blend-separator" />
          <Technologies />
          <div className="blend-separator" />
          <Pricing />
          <div className="blend-separator" />
          <Testimonials />
          <div className="blend-separator" />
          <FAQ />
          <div className="blend-separator" />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </DesignProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import Card from '../components/ui/Card';
import { FadeUp } from '../components/ui/Reveal';

const TESTIMONIALS = [
  {
    quote: "Aetheria built our dashboard platform in less than 8 weeks. Their attention to animation design, frontend performance, and clean code is the best I have ever seen. Highly recommended studio.",
    author: "Marcus Vance",
    role: "VP of Engineering",
    company: "Nexus Tech Corp",
    rating: 5,
    avatarColor: 'bg-gradient-to-tr from-[#3B82F6] to-[#06B6D4]',
  },
  {
    quote: "We were skeptical about cross-platform wallet speeds, but the React Native product they launched performs indistinguishably from fully native builds. Visually stunning UI design.",
    author: "Elena Rostova",
    role: "Product Lead",
    company: "Solaria Crypto Vault",
    rating: 5,
    avatarColor: 'bg-gradient-to-tr from-[#7C3AED] to-[#ec4899]',
  },
  {
    quote: "Their team has a rare combination of creative design thinking and hard-core frontend development skills. The pitch presentations and brand guide they engineered won our seed funding.",
    author: "Tyler Campbell",
    role: "Founder & CEO",
    company: "Aura Luxury Apparel",
    rating: 5,
    avatarColor: 'bg-gradient-to-tr from-[#f59e0b] to-[#ea580c]',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-[120px] relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-[30%] left-[-15%] w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Section Header */}
        <FadeUp>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-8 text-left">
            <div>
              <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Endorsements</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">What Clients Say</h2>
            </div>
            
            {/* Slider controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </FadeUp>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] sm:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute w-full h-full"
            >
              <Card
                glowColor="rgba(124, 58, 237, 0.12)"
                className="p-8 sm:p-12 text-left h-full flex flex-col justify-between border-white/5 bg-white/[0.03] shadow-2xl relative"
              >
                {/* Big Quote Symbol */}
                <Quote className="absolute top-8 right-8 text-white/5 w-20 h-20 pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#06B6D4] text-[#06B6D4]" />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <blockquote className="font-display text-lg sm:text-2xl font-medium leading-relaxed text-gray-100 max-w-4xl">
                    "{TESTIMONIALS[activeIndex].quote}"
                  </blockquote>
                </div>

                {/* Client Profile details */}
                <div className="relative z-10 flex items-center gap-4 mt-8 border-t border-white/5 pt-6 w-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-white shadow-lg ${TESTIMONIALS[activeIndex].avatarColor}`}>
                    {TESTIMONIALS[activeIndex].author.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-sm sm:text-base text-white block">
                      {TESTIMONIALS[activeIndex].author}
                    </cite>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {TESTIMONIALS[activeIndex].role} &bull; <span className="text-[#3B82F6]">{TESTIMONIALS[activeIndex].company}</span>
                    </p>
                  </div>
                </div>

              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

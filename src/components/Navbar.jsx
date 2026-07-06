import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import { useDesign } from '../context/DesignContext';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const { activeSection, setActiveSection, triggerHoverStart, triggerHoverEnd } = useDesign();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Monitor scroll for height shrink & hide/show states
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Hide/Show logic on scroll direction
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);
      if (scrollDifference < 8) return; // avoid jittering

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsNavbarVisible(false); // scrolling down, hide navbar
        setIsMobileMenuOpen(false); // auto-close mobile menu
      } else {
        setIsNavbarVisible(true); // scrolling up, show navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // IntersectionObserver for active section mapping
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // offset for floating capsule spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Floating capsule navigation bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0, x: '-50%' }}
        animate={{ 
          y: isNavbarVisible ? 0 : -120, // Slide up/down scroll physics
          opacity: 1,
          x: '-50%'
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className={`fixed top-6 left-1/2 z-50 w-[calc(100%-48px)] max-w-[1400px] flex items-center justify-between rounded-full border transition-all duration-700 ease-[0.16,1,0.3,1] px-6 sm:px-8 ${
          isScrolled
            ? 'py-3 bg-bgMain/75 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl'
            : 'py-4.5 bg-white/[0.03] border-white/5 shadow-[0_10px_35px_rgba(0,0,0,0.2),inset_0_1px_1.5px_rgba(255,255,255,0.08)] backdrop-blur-lg'
        }`}
      >
        {/* Left Side: Logo + Animated Geometric Diamond Icon */}
        <div
          onClick={() => scrollToSection('home')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToSection('home');
            }
          }}
          onMouseEnter={() => {
            setIsLogoHovered(true);
            triggerHoverStart('hovered');
          }}
          onMouseLeave={() => {
            setIsLogoHovered(false);
            triggerHoverEnd();
          }}
          className="flex items-center gap-3 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60 rounded-xl px-2 py-1"
          role="button"
          tabIndex="0"
          aria-label="Aetheria Home"
        >
          {/* Pulsing rotating outline diamond icon */}
          <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
              className="text-[#3B82F6] group-hover:text-[#7C3AED] transition-colors duration-500"
            >
              <rect x="5" y="5" width="14" height="14" rx="2" transform="rotate(45 12 12)" />
            </motion.svg>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
          </div>

          {/* Gradient text branding with animated letter spacing */}
          <motion.span 
            animate={{ letterSpacing: isLogoHovered ? '0.22em' : '0.15em' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="font-display font-bold text-lg sm:text-xl bg-gradient-to-r from-[#3B82F6] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent transition-all"
          >
            AETHERIA
          </motion.span>
        </div>

        {/* Center: Desktop Navigation items */}
        <div className="hidden lg:flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => triggerHoverStart('hovered')}
              onMouseLeave={triggerHoverEnd}
              className={`relative px-4.5 py-2.5 rounded-full text-[10px] font-display font-semibold uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60 ${
                activeSection === item.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white hover:-translate-y-0.5'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              
              {/* Premium SaaS slide active indicator */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeCapsulePill"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/5 -z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Side: CTA Button "Get Free Quote" (Desktop) */}
        <div className="hidden lg:block">
          <Button
            variant="primary"
            rounded="full"
            onClick={() => scrollToSection('contact')}
            className="!py-2.5 !px-6 text-[10px] font-display font-bold uppercase tracking-[0.15em] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60"
          >
            Get Free Quote
            <ArrowRight size={12} />
          </Button>
        </div>

        {/* Mobile Hamburger menu icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onMouseEnter={() => triggerHoverStart('hovered')}
          onMouseLeave={triggerHoverEnd}
          className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {/* Custom SVG lines morphing to X */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.line
              x1="4" y1="6" x2="20" y2="6"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={isMobileMenuOpen ? { rotate: 45, y: 6, x: 2 } : { rotate: 0, y: 0, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{ originX: '4px', originY: '6px' }}
            />
            <motion.line
              x1="4" y1="12" x2="20" y2="12"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line
              x1="4" y1="18" x2="20" y2="18"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={isMobileMenuOpen ? { rotate: -45, y: -6, x: 2 } : { rotate: 0, y: 0, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{ originX: '4px', originY: '18px' }}
            />
          </svg>
        </button>

        {/* Floating glass dropdown panel for mobile view */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 z-40 bg-[#030712]/90 border border-white/10 rounded-[32px] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl flex flex-col gap-5 text-left"
            >
              {/* Dropdown Links stagger container */}
              <div className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-xs font-display font-bold tracking-[0.18em] uppercase text-left py-3 px-4.5 rounded-2xl border transition-all ${
                      activeSection === item.id 
                        ? 'text-white bg-white/5 border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]' 
                        : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Quote CTA Button */}
              <div className="border-t border-white/5 pt-4 mt-1">
                <Button
                  variant="primary"
                  rounded="full"
                  onClick={() => scrollToSection('contact')}
                  className="w-full justify-center !py-3.5 text-xs font-display font-bold uppercase tracking-[0.15em] shadow-xl"
                >
                  Get Free Quote
                  <ArrowRight size={13} />
                </Button>
              </div>
              
              {/* Noise overlay inside drop-panel */}
              <div className="absolute inset-0 noise-overlay pointer-events-none rounded-[32px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;

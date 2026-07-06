import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Check, Database, Server, Cpu, Cloud, Terminal, Activity } from 'lucide-react';
import Button from '../components/ui/Button';
import { useDesign } from '../context/DesignContext';

// CountUp Component for statistics
const Counter = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) {
      setCount(value); // fallback for non-numeric (e.g. 24/7)
      return;
    }
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  if (isNaN(parseInt(value))) {
    return <span ref={ref}>{value}</span>;
  }
  return <span ref={ref}>{count}{suffix}</span>;
};

// Capabilities Typewriter Words
const TYPING_PHRASES = [
  '🌐 Web Application Development',
  '📱 Mobile App Development',
  '📈 Digital Marketing Solutions',
  '📚 Premium eBook Production',
  '🎨 Interactive Pitch Decks',
];

const Hero = () => {
  const { triggerHoverStart, triggerHoverEnd } = useDesign();

  // Typewriter Loop Logic
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIdx];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
        setTypingSpeed(80); // typing speed
        
        if (typedText === currentPhrase) {
          setIsDeleting(true);
          setTypingSpeed(2200); // delay before backspacing
        }
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
        setTypingSpeed(45); // backspace speed
        
        if (typedText === '') {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % TYPING_PHRASES.length);
          setTypingSpeed(450); // delay before next word starts typing
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx, typingSpeed]);

  // Parallax Mouse coordinates tracker
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 45, stiffness: 180, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Map offsets to -30px -> 30px
    const offsetX = ((clientX / innerWidth) - 0.5) * 60;
    const offsetY = ((clientY / innerHeight) - 0.5) * 60;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax transforms for visual layers
  const depthShallowX = useTransform(smoothMouseX, (x) => x * 0.6);
  const depthShallowY = useTransform(smoothMouseY, (y) => y * 0.6);
  const depthOppositeX = useTransform(smoothMouseX, (x) => x * -0.5);
  const depthOppositeY = useTransform(smoothMouseY, (y) => y * -0.5);
  const depthForegroundX = useTransform(smoothMouseX, (x) => x * 1.15);
  const depthForegroundY = useTransform(smoothMouseY, (y) => y * 1.15);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen w-full relative flex items-center justify-center pt-36 pb-20 overflow-hidden"
    >
      {/* Immersive radial glows */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary/5 blur-[130px] pointer-events-none" />

      {/* Reusable container alignment */}
      <div className="ds-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Heading, Badge, Typewriter, CTAs, Trust, Stats */}
        <div className="lg:col-span-7 flex flex-col items-start gap-7 text-left">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
          >
            <Sparkles size={13} className="text-highlight animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              🚀 Premium Digital Solutions
            </span>
          </motion.div>

          {/* Large Header Title with animated text gradients */}
          <div className="flex flex-col gap-2.5">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] text-white"
            >
              Build <br />
              <span className="text-gradient-animated">Powerful Digital</span> <br />
              <span className="text-gradient-animated">Experiences</span> <br />
              That Inspire.
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed font-sans"
          >
            I engineer high-performance Web Applications, native Mobile Apps, SEO-driven Digital Marketing pipelines, authority eBooks, and high-stakes Investor Presentations to accelerate corporate growth.
          </motion.p>

          {/* Typewriter capabilities */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wide h-6 text-gray-400"
          >
            <span className="text-gray-500">I specialize in:</span>
            <span className="text-white relative">
              {typedText}
              <span className="absolute -right-1 top-0 bottom-0 w-0.5 bg-highlight animate-[blink_0.8s_infinite] shadow-[0_0_8px_#06B6D4]" />
            </span>
          </motion.div>

          {/* Two-Button CTA Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <Button
              variant="primary"
              rounded="full"
              onClick={scrollToContact}
              className="!py-3 !px-7 text-xs font-display font-bold uppercase tracking-[0.15em] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Get Free Quote
              <ArrowRight size={13} />
            </Button>
            
            <Button
              variant="secondary"
              rounded="full"
              onClick={scrollToPortfolio}
              className="!py-3 !px-7 text-xs font-display font-bold uppercase tracking-[0.15em] hover:-translate-y-0.5"
            >
              View Portfolio
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } }
            }}
            className="flex flex-wrap items-center gap-3.5 mt-4"
          >
            {['Modern UI', 'Fast Delivery', 'Responsive Design', 'SEO Friendly', 'Clean Code'].map((badge) => (
              <motion.div
                key={badge}
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
              >
                <Check size={11} className="text-[#3B82F6]" />
                <span className="font-mono text-[9px] font-semibold text-gray-300 uppercase tracking-widest">{badge}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Right Column: Parallax Illustration & Floating Cards */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[420px] sm:h-[480px] lg:h-[550px] w-full">
          
          {/* Base Glow ring behind visual */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-[80px] pointer-events-none" />

          {/* 1. Deep Parallax Layer: Base Grid Dashboard Grid (Opposite direction) */}
          <motion.div
            style={{ x: depthOppositeX, y: depthOppositeY }}
            className="absolute w-[80%] aspect-[4/3] rounded-3xl bg-white/[0.01] border border-white/5 shadow-2xl p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center opacity-30">
              <span className="w-8 h-1.5 bg-white/10 rounded" />
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              </div>
            </div>
            
            {/* CSS Wave lines */}
            <div className="w-full h-24 relative opacity-10 flex items-end">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="url(#wave-grad-ref)" />
                <defs>
                  <linearGradient id="wave-grad-ref" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* 2. Shallow Parallax Layer: Terminal & Code Frame */}
          <motion.div
            style={{ x: depthShallowX, y: depthShallowY }}
            className="absolute w-[290px] h-[190px] rounded-2xl glass-panel p-4 shadow-[0_20px_45px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] border-white/10 top-6 left-2 sm:left-6 flex flex-col justify-between"
          >
            {/* Window header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-danger" />
                <span className="w-2 h-2 rounded-full bg-warning" />
                <span className="w-2 h-2 rounded-full bg-success" />
              </div>
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">engine.jsx</span>
            </div>

            {/* Code Lines */}
            <div className="font-mono text-[10px] text-left flex flex-col gap-1.5 my-3 text-gray-400">
              <p className="text-gray-500">1 <span className="text-[#7C3AED]">const</span> aetheria = () =&gt; &#123;</p>
              <p className="text-gray-300">2   <span className="text-highlight">build</span>(&#123; speed: <span className="text-[#22c55e]">99</span> &#125;);</p>
              <p className="text-gray-300">3   <span className="text-[#3B82F6]">render</span>(&lt;DesignSystem /&gt;);</p>
              <p className="text-gray-500">4 &#125;;</p>
            </div>

            {/* Terminal status bar */}
            <div className="flex justify-between items-center text-[8px] font-mono text-gray-600 border-t border-white/5 pt-2">
              <span className="flex items-center gap-1"><Terminal size={10} className="text-highlight" /> compiled</span>
              <span>100% SECURE</span>
            </div>
          </motion.div>

          {/* 3. Opposite Parallax Layer: Analytics Chart Drop-Card */}
          <motion.div
            style={{ x: depthOppositeX, y: depthOppositeY }}
            className="absolute w-[230px] h-[150px] rounded-2xl glass-panel p-4 shadow-[0_20px_45px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] border-[#06B6D4]/20 bottom-12 right-2 sm:right-6 flex flex-col justify-between"
          >
            {/* Chart Header */}
            <div className="flex justify-between items-start">
              <div className="text-left">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block">Diagnostics</span>
                <span className="font-display font-bold text-sm text-white">Conversion Index</span>
              </div>
              <Activity size={14} className="text-highlight animate-pulse" />
            </div>

            {/* Micro Line Chart */}
            <div className="w-full h-12 flex items-end">
              <svg width="100%" height="100%" viewBox="0 0 100 40" className="text-highlight">
                <motion.path
                  d="M0 35 Q 20 10, 40 25 T 80 5 T 100 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
              <span>Performance</span>
              <span className="text-[#22c55e] font-semibold">+342.1%</span>
            </div>
          </motion.div>

          {/* 4. Foreground Parallax Layer: Central Laptop Shell Frame (Drifts fast) */}
          <motion.div
            style={{ x: depthForegroundX, y: depthForegroundY }}
            className="absolute w-[180px] h-[120px] rounded-xl bg-[#030712]/80 border border-white/10 shadow-2xl p-3 flex flex-col justify-between items-center z-20 pointer-events-none"
          >
            <div className="w-full flex items-center justify-between border-b border-white/5 pb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#7C3AED]"><Cpu size={7} /></span>
              <div className="w-16 h-1 bg-white/10 rounded-full" />
            </div>
            
            {/* Centered outline circle */}
            <div className="w-12 h-12 rounded-full border border-dashed border-[#7C3AED]/40 flex items-center justify-center animate-[spin_15s_linear_infinite]">
              <div className="w-6 h-6 rounded-full border border-[#3B82F6]/60 flex items-center justify-center animate-[spin_8s_linear_infinite_reverse]">
                <Server size={10} className="text-[#3B82F6]" />
              </div>
            </div>

            <div className="w-full flex justify-between text-[7px] font-mono text-gray-600">
              <span>core_v4</span>
              <span>128-bit</span>
            </div>
          </motion.div>

          {/* Foreground Parallax Layer: Database Nodes */}
          <motion.div
            style={{ x: depthForegroundX, y: depthForegroundY }}
            onMouseEnter={() => triggerHoverStart('hovered')}
            onMouseLeave={triggerHoverEnd}
            className="absolute bottom-6 left-12 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white z-20 shadow-lg cursor-pointer hover:border-white/20 transition-colors"
          >
            <Database size={16} className="text-secondary" />
          </motion.div>

          <motion.div
            style={{ x: depthShallowX, y: depthShallowY }}
            onMouseEnter={() => triggerHoverStart('hovered')}
            onMouseLeave={triggerHoverEnd}
            className="absolute top-1/3 right-8 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white z-20 shadow-lg cursor-pointer hover:border-white/20 transition-colors"
          >
            <Cloud size={14} className="text-primary" />
          </motion.div>

          {/* Drifting technology badges (floating cycle loops) */}
          {/* React */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 4, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 right-24 bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3 py-1 rounded-full text-[10px] font-mono text-[#3B82F6]"
          >
            React
          </motion.div>

          {/* Next.js */}
          <motion.div
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-24 left-6 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-white"
          >
            Next.js
          </motion.div>

          {/* Flutter */}
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 6, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-[45%] left-1/2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-3 py-1 rounded-full text-[10px] font-mono text-[#06B6D4]"
          >
            Flutter
          </motion.div>

          {/* Tailwind */}
          <motion.div
            animate={{ 
              y: [0, -9, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-8 right-24 bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full text-[10px] font-mono text-[#7C3AED]"
          >
            Tailwind CSS
          </motion.div>

        </div>

      </div>

      {/* Statistics counters strip */}
      <div className="absolute bottom-28 left-0 right-0 z-10 w-full hidden md:block">
        <div className="ds-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full grid grid-cols-4 gap-4 border-t border-white/5 pt-8"
          >
            <div className="text-left">
              <div className="font-display text-3xl xl:text-4xl font-extrabold text-white">
                <Counter value="100" suffix="+" />
              </div>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-mono">Projects Completed</p>
            </div>
            <div className="text-left border-l border-white/5 pl-8">
              <div className="font-display text-3xl xl:text-4xl font-extrabold text-white">
                <Counter value="50" suffix="+" />
              </div>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-mono">Happy Clients</p>
            </div>
            <div className="text-left border-l border-white/5 pl-8">
              <div className="font-display text-3xl xl:text-4xl font-extrabold text-white">
                <Counter value="5" suffix="+" />
              </div>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-mono">Professional Services</p>
            </div>
            <div className="text-left border-l border-white/5 pl-8">
              <div className="font-display text-3xl xl:text-4xl font-extrabold text-white">
                <Counter value="24/7" />
              </div>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-mono">Dedicated Support</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated scroll explorer mouse indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 rounded-full border border-white/20 p-1.5 flex justify-center items-start"
        >
          <motion.div 
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            className="w-1 h-1.5 rounded-full bg-white" 
          />
        </motion.div>
        <span className="font-mono text-[8px] text-gray-500 uppercase tracking-[0.2em]">
          Scroll to Explore
        </span>
      </div>

      {/* Typing animation cursor blink animation helper */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesign } from '../../context/DesignContext';

const Loader = () => {
  const { isLoading, loadingProgress } = useDesign();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader-container"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100vh', 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#030712] z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Immersive mesh glows */}
          <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-secondary/15 blur-[90px]" />

          {/* SVG Animated Logo */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <svg 
              width="100" 
              height="100" 
              viewBox="0 0 100 100" 
              className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              <defs>
                <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              
              {/* Outer Diamond */}
              <motion.path
                d="M 50 10 L 90 50 L 50 90 L 10 50 Z"
                fill="none"
                stroke="url(#loader-grad)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
              />

              {/* Inner Diamond */}
              <motion.path
                d="M 50 25 L 75 50 L 50 75 L 25 50 Z"
                fill="none"
                stroke="url(#loader-grad)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.3, repeat: Infinity, repeatType: 'reverse' }}
              />

              {/* Center Core dot */}
              <motion.circle
                cx="50"
                cy="50"
                r="4"
                fill="#ffffff"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>

            {/* Loading text details */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-display font-bold tracking-widest text-lg text-white">
                AETHERIA
              </span>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                System Syncing...
              </span>
            </div>

            {/* Load bar and percentage indicator */}
            <div className="flex flex-col items-center gap-2 mt-4">
              {/* Progress counter text */}
              <span className="font-mono text-2xl font-bold text-gradient-primary">
                {loadingProgress}%
              </span>
              
              {/* Thin progress track */}
              <div className="w-48 h-1 bg-white/5 border border-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-highlight"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Noise overlay */}
          <div className="absolute inset-0 noise-overlay pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

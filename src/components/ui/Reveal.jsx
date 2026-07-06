import React from 'react';
import { motion } from 'framer-motion';

// Standard viewport margin to trigger animations once comfortably in view
const VIEWPORT_CONFIG = { once: true, margin: '-100px 0px -100px 0px' };

// Fade Up Reveal
export const FadeUp = ({ children, delay = 0, duration = 0.8, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Fade Left Reveal
export const FadeLeft = ({ children, delay = 0, duration = 0.8, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Fade Right Reveal
export const FadeRight = ({ children, delay = 0, duration = 0.8, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale In Reveal
export const ScaleIn = ({ children, delay = 0, duration = 0.8, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Blur / Filter Reveal (Perfect for high-end titles)
export const BlurReveal = ({ children, delay = 0, duration = 1, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger Container mapping for listing maps
export const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.1, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_CONFIG}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item (To be child of StaggerContainer)
export const StaggerItem = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

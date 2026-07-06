import React from 'react';
import { motion } from 'framer-motion';

const GlowIcon = ({
  children,
  color = '#3B82F6', // default electric blue glow
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  ...props
}) => {
  // Sizing definitions
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.1,
        rotate: 8,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`relative flex items-center justify-center bg-white/5 border border-white/10 text-white shrink-0 group transition-colors duration-300 hover:border-white/20 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {/* Soft back-glow shadow layer */}
      <div 
        className="absolute inset-0 rounded-full blur-[10px] opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
        }}
      />
      
      {/* SVG Icon Child */}
      <span className="relative z-10 text-white transition-colors duration-300">
        {children}
      </span>
    </motion.div>
  );
};

export default GlowIcon;

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useDesign } from '../../context/DesignContext';

const Card = ({
  children,
  className = '',
  hoverGlow = true,
  tilt = true,
  glowColor = 'rgba(59, 130, 246, 0.15)', // soft Indigo/Blue default
  ...props
}) => {
  const cardRef = useRef(null);
  const { triggerHoverStart, triggerHoverEnd } = useDesign();
  
  // Coordinate tracking for glow highlights
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion values for 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Map values to degrees (-6 to 6 degrees for subtle lux tilt)
  const rX = useTransform(springRotateX, [-0.5, 0.5], [6, -6]);
  const rY = useTransform(springRotateY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalized cursor coordinate from center
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    
    if (tilt) {
      rotateX.set(relativeY - 0.5);
      rotateY.set(relativeX - 0.5);
    }
    
    if (hoverGlow) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerHoverStart('hovered');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    triggerHoverEnd();
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ y: -6 }} // Hover Lift
      className={`glass-panel rounded-2xl relative overflow-hidden transition-all duration-500 bg-cardBg border border-cardBorder shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${
        isHovered ? 'shadow-[0_20px_50px_rgba(3,7,18,0.5)] border-white/20' : ''
      } ${className}`}
      {...props}
    >
      {/* Radial Hover Glow Layer */}
      {hoverGlow && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      
      {/* Transparent Adaptive border glowing trace */}
      {hoverGlow && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl border border-transparent transition-colors duration-300"
          style={{
            background: isHovered
              ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 70%)`
              : 'none',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Internal Content Wrapper */}
      <div 
        className="relative z-10 w-full h-full"
        style={{ transform: 'translateZ(15px)' }} // Lift children content inside 3D space
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Card;

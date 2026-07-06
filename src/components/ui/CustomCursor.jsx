import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useDesign } from '../../context/DesignContext';

const CustomCursor = () => {
  const { cursorVariant, cursorColor } = useDesign();
  const [isVisible, setIsVisible] = useState(false);

  // Mouse positions motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for outer trailing ring
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate cursor if precise pointer is available
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Scale variables for custom hover states
  const isHovered = cursorVariant === 'hovered';
  
  return (
    <>
      {/* Inner solid dot (Fast tracking) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          backgroundColor: cursorColor,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* Outer trailing ring (Spring physics) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 border"
        style={{
          x: trailX,
          y: trailY,
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          borderColor: cursorColor,
          backgroundColor: isHovered ? `${cursorColor}10` : 'transparent', // alpha opacity fill on hover
          boxShadow: isHovered ? `0 0 25px ${cursorColor}40` : 'none',
        }}
        animate={{
          scale: isHovered ? 1.25 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
    </>
  );
};

export default CustomCursor;

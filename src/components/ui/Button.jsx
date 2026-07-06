import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useDesign } from '../../context/DesignContext';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'glass'
  rounded = 'xl', // 'xl' | 'full' | 'lg' | 'md'
  className = '',
  magnetic = true,
  ...props
}) => {
  const buttonRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  
  // Safe design system hook access
  let design = null;
  try {
    design = useDesign();
  } catch (e) {
    // context not present, ignore cursor triggers
  }

  // Magnetic values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetic || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    
    // Magnetic pull factor (pull up to 12px)
    const pullFactor = 0.25;
    x.set(distanceX * pullFactor);
    y.set(distanceY * pullFactor);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (design) design.triggerHoverEnd();
  };

  const handleMouseEnter = () => {
    if (design) design.triggerHoverStart('hovered');
  };

  // Click ripple effect
  const handleClick = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const clickX = e.clientX - rect.left - size / 2;
    const clickY = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      x: clickX,
      y: clickY,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
    if (onClick) onClick(e);
  };

  // Clean up ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timeout = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timeout);
  }, [ripples]);

  // Rounded mappings
  const roundedClasses = {
    full: 'rounded-full',
    xl: 'rounded-xl',
    lg: 'rounded-lg',
    md: 'rounded-md',
  };

  // Style variations
  let styleClasses = '';
  if (variant === 'primary') {
    // Gradient shift layout (smooth shift on hover)
    styleClasses = 'bg-[linear-gradient(135deg,#3B82F6_0%,#7C3AED_50%,#3B82F6_100%)] bg-[length:200%_auto] text-white hover:bg-[100%_center] hover:shadow-[0_0_30px_rgba(59,130,246,0.45)] border-none transition-[background-position_0.8s_ease,box-shadow_0.3s_ease]';
  } else if (variant === 'secondary') {
    styleClasses = 'glass-panel text-white border border-white/10 hover:border-white/30 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]';
  } else if (variant === 'glass') {
    styleClasses = 'bg-white/5 backdrop-blur-md text-white border border-white/10 hover:border-accent/40 hover:text-accent hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all';
  }

  const roundedVal = roundedClasses[rounded] || 'rounded-xl';

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden px-6 py-3 font-medium tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${roundedVal} ${styleClasses} ${className}`}
      {...props}
    >
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Ripples container */}
      <span className={`absolute inset-0 pointer-events-none overflow-hidden ${roundedVal}`}>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/20 rounded-full animate-ripple pointer-events-none"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              transform: 'scale(0)',
              animation: 'ripple 600ms linear',
            }}
          />
        ))}
      </span>

      {/* Ripple Animation styles */}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(3);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 600ms linear;
        }
      `}</style>
    </motion.button>
  );
};

export default Button;

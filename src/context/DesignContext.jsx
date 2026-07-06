import React, { createContext, useContext, useState, useEffect } from 'react';

const DesignContext = createContext(undefined);

// Map section IDs to design accent colors
const SECTION_COLORS = {
  home: '#3B82F6',       // Electric Blue
  about: '#7C3AED',      // Royal Purple
  services: '#06B6D4',   // Cyan
  portfolio: '#3B82F6',  // Electric Blue
  process: '#7C3AED',    // Royal Purple
  pricing: '#06B6D4',    // Cyan
  faq: '#3B82F6',        // Electric Blue
  contact: '#7C3AED',    // Royal Purple
};

export const DesignProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [activeSection, setActiveSection] = useState('home');
  const [cursorColor, setCursorColor] = useState('#3B82F6');

  // Sync active section to cursor accent color
  useEffect(() => {
    const color = SECTION_COLORS[activeSection] || '#3B82F6';
    setCursorColor(color);
  }, [activeSection]);

  // Loading Simulation
  useEffect(() => {
    if (!isLoading) return;
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 1; // random increment
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 800); // smooth exit transition delay
      }
      setLoadingProgress(current);
    }, 45); // simulated load speed

    return () => clearInterval(interval);
  }, [isLoading]);

  // Mouse hover listeners mapping
  const triggerHoverStart = (variant = 'hovered') => {
    setCursorVariant(variant);
  };

  const triggerHoverEnd = () => {
    setCursorVariant('default');
  };

  return (
    <DesignContext.Provider
      value={{
        isLoading,
        loadingProgress,
        cursorVariant,
        cursorColor,
        activeSection,
        setActiveSection,
        triggerHoverStart,
        triggerHoverEnd,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};

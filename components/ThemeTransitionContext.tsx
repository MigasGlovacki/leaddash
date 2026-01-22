"use client";

import { createContext, useContext, useRef, ReactNode } from 'react';

interface ThemeTransitionContextType {
  overlayRef: React.RefObject<HTMLDivElement>;
  triggerTransition: (newTheme: 'light' | 'dark', setTheme: (theme: string) => void) => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | null>(null);

export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const triggerTransition = (newTheme: 'light' | 'dark', setTheme: (theme: string) => void) => {
    const overlay = overlayRef.current;
    const body = document.body;
    
    if (overlay) {
      // Remove active class first to reset animation
      overlay.classList.remove('active');
      
      // Force reflow to ensure reset
      void overlay.offsetHeight;
      
      // Set direction class
      overlay.classList.remove('to-dark', 'to-light');
      overlay.classList.add(newTheme === 'dark' ? 'to-dark' : 'to-light');
      
      // Make body background transparent temporarily
      const originalBg = body.style.background;
      body.style.background = 'transparent';
      
      // Small delay to ensure color is set
      requestAnimationFrame(() => {
        // Start animation
        overlay.classList.add('active');
        
        // Change theme at midpoint
        setTimeout(() => {
          setTheme(newTheme);
        }, 200);
        
        // Remove overlay and restore body background after animation completes
        setTimeout(() => {
          overlay.classList.remove('active');
          body.style.background = originalBg;
        }, 400);
      });
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeTransitionContext.Provider value={{ overlayRef, triggerTransition }}>
      {children}
      <div ref={overlayRef} className="theme-transition-overlay" />
    </ThemeTransitionContext.Provider>
  );
}

export function useThemeTransition() {
  const context = useContext(ThemeTransitionContext);
  if (!context) {
    throw new Error('useThemeTransition must be used within ThemeTransitionProvider');
  }
  return context;
}

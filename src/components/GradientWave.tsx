
import { useEffect, useRef } from 'react';

interface GradientWaveProps {
  scrollY: number;
}

const GradientWave = ({ scrollY }: GradientWaveProps) => {
  const waveRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const wave = waveRef.current;
    if (!wave) return;
    
    // Subtle movement based on scroll position
    const handleScroll = () => {
      if (!wave) return;
      const scrollOffset = scrollY * 0.03;
      wave.style.transform = `translateY(${scrollOffset}px)`;
    };
    
    handleScroll();
    
    return () => {
      // Cleanup if needed
    };
  }, [scrollY]);
  
  return (
    <div 
      ref={waveRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary gradient wave */}
      <div className="absolute -bottom-[40%] left-0 w-full h-[70%] opacity-40 animate-slow-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/15 to-primary/10 rounded-[100%] blur-3xl transform-gpu"></div>
      </div>
      
      {/* Secondary gradient wave - offset and different colors */}
      <div className="absolute -bottom-[50%] left-0 w-full h-[80%] opacity-30 animate-slow-pulse-reverse">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-primary/15 to-secondary/10 rounded-[100%] blur-3xl transform-gpu"></div>
      </div>
      
      {/* Tertiary gradient wave - smaller and faster */}
      <div className="absolute -bottom-[30%] left-0 w-full h-[60%] opacity-20 animate-slow-pulse-delay">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-[100%] blur-3xl transform-gpu"></div>
      </div>
    </div>
  );
};

export default GradientWave;

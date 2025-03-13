
import { useEffect, useState } from 'react';
import FloatingParticles from './FloatingParticles';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

const ParallaxBackground = ({ children }: ParallaxBackgroundProps) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fixed background elements with parallax effect */}
      <div 
        className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl opacity-70"
          style={{ transform: `translate(-50%, ${scrollY * 0.1}px)` }}
        />
        
        {/* Additional background element with opposite parallax direction */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] aspect-square bg-gradient-to-t from-primary/15 to-transparent rounded-full blur-3xl opacity-60"
          style={{ transform: `translate(-50%, ${scrollY * -0.05}px)` }}
        />
      </div>

      {/* Grid background with parallax effect */}
      <div 
        className="fixed inset-0 grid-background pointer-events-none -z-10"
        aria-hidden="true"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Content */}
      {children}
    </div>
  );
};

export default ParallaxBackground;

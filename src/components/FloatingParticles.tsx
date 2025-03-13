
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const FloatingParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create particles
    const particleCount = 20;
    const particles: Particle[] = [];
    
    const createParticles = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * containerWidth,
          y: Math.random() * containerHeight,
          size: Math.random() * 4 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      
      particlesRef.current = particles;
    };
    
    const renderParticles = () => {
      if (!container) return;
      
      // Clear previous particles
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Render current particles
      particlesRef.current.forEach(particle => {
        const element = document.createElement('div');
        element.className = 'particle';
        element.style.width = `${particle.size}px`;
        element.style.height = `${particle.size}px`;
        element.style.left = `${particle.x}px`;
        element.style.top = `${particle.y}px`;
        element.style.opacity = particle.opacity.toString();
        container.appendChild(element);
      });
    };
    
    const updateParticles = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > containerWidth) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > containerHeight) {
          particle.speedY *= -1;
        }
      });
      
      renderParticles();
      rafRef.current = requestAnimationFrame(updateParticles);
    };
    
    createParticles();
    updateParticles();
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default FloatingParticles;

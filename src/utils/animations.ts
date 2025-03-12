
import { useEffect, useState } from 'react';

export function useAnimateIn() {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);
  
  return animate;
}

export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });
    
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return { ref: setRef, isIntersecting };
}

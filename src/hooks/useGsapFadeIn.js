import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Fade-in + slide-up animation on mount.
 * Respects prefers-reduced-motion.
 * @returns {React.RefObject} — attach to the element to animate.
 */
export function useGsapFadeIn(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.7,
          ease: options.ease ?? 'power2.out',
          delay: options.delay ?? 0,
        }
      );
    });

    return () => ctx.revert();
  }, [options.delay, options.duration, options.ease]);

  return ref;
}

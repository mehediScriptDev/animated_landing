import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGsapFadeIn } from '../../../../hooks/useGsapFadeIn';

export default function HeroBanner() {
  const textRef = useGsapFadeIn({ duration: 1 });
  const lineRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !lineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });

      tl.fromTo(
        lineRef.current,
        { scaleY: 0, opacity: 1, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.5, ease: 'power2.inOut' }
      ).to(lineRef.current, { opacity: 0, duration: 0.25, ease: 'none' });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full h-[85vh] flex flex-col justify-center pl-8 md:pl-10 lg:pl-24 xl:pl-24 2xl:pl-48 pr-6"
    >
      <h1
        id="hero-heading"
        ref={textRef}
        className="hero-text uppercase transition-colors duration-200"
      >
        Making Cents of Real Estate<br />
        and Sense of Your Finance.
      </h1>

      {/* Animated vertical scroll indicator */}
      <div className="absolute bottom-30 md:bottom-40 left-1/2 -translate-x-1/2 w-0.5">
        <div
          ref={lineRef}
          className="hero-line w-full h-10"
          style={{ opacity: 0, transform: 'scaleY(0)', transformOrigin: 'top center' }}
        />
      </div>
    </section>
  );
}

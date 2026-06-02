import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGsapFadeIn } from '../../../../hooks/useGsapFadeIn';

export default function HeroBanner({ isDark = false }) {
  const textRef = useGsapFadeIn({ duration: 1 });
  const lineRef = useRef(null);
  const [hasStroke, setHasStroke] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateStroke = (event) => setHasStroke(event.matches);

    setHasStroke(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateStroke);

    return () => mediaQuery.removeEventListener('change', updateStroke);
  }, []);

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
      className="relative z-10 w-full h-[95vh] flex flex-col justify-center"
    >
      <h1
        id="hero-heading"
        ref={textRef}
        className="-mt-3 uppercase transition-colors max-[650px]:leading-relaxed! tracking-widest sm:tracking-normal duration-200 w-[90%] md:w-[75%] mx-auto font-anton! lg:text-[90px]! xl:text-[100px]!"
        style={{
          fontWeight: 900,
          fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
          lineHeight: 1,
          letterSpacing: '0.00em',
          color: isDark ? '#fff' : '#000',
          WebkitTextStroke: hasStroke ? (isDark ? '3px #fff' : '3px #000') : '0px transparent',
        }}
      >
        MAKING CENTS OF REAL ESTATE
AND SENSE OF YOUR FINANCE.
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

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function HeroSection({ isDark }) {
  const headingRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-labelledby="about-heading"
      className="relative min-h-screen flex items-end md:items-center pb-28 md:pb-0"
    >
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto">
        <h1
          id="about-heading"
          ref={headingRef}
          className={`
            about-hero-heading
            uppercase max-w-[90%] md:max-w-[58%] leading-snug text-[100px]! tracking-tighter font-anton! transition-colors 
          `}
          style={{
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
            lineHeight: 1,
            letterSpacing: '0.00em',
            color: isDark ? '#fff' : '#000',
            // THE TRICK: Add a 2px outline of the exact same color to make it look fatter
            WebkitTextStroke: isDark ? '2px #fff' : '2px #000', 
          }}
        >
          Guiding You Through Every Step of your Property Journey.
        </h1>
      </div>
    </section>
  );
}

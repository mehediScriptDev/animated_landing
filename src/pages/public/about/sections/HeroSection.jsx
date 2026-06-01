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
      className="relative min-h-screen flex items-center"
    >
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto">
        <h1
          id="about-heading"
          ref={headingRef}
          className={`
            uppercase max-w-[48%] leading-snug transition-colors duration-300
          `}
          style={{
            fontFamily: "'Sequel', 'Unbounded', sans-serif",
            fontWeight: 1000,
            fontStyle: 'italic',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
            lineHeight: 1,
            letterSpacing: '-0.00em',
            color: isDark ? '#fff' : '#000',
          }}
        >
          COMPETITION<br />
          AND CREATIVITY<br />
          RUNS HARD IN<br />
          HIS VEINS.
        </h1>
      </div>
    </section>
  );
}

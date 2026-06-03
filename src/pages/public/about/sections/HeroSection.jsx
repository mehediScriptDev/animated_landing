import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function HeroSection({ isDark }) {
  const headingRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );
  const [strokeWidth, setStrokeWidth] = useState(
    () => (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches ? 2 : 1.4)
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateStroke = (event) => {
      setIsDesktop(event.matches);
      setStrokeWidth(event.matches ? 2 : 1);
    };

    setIsDesktop(mediaQuery.matches);
    setStrokeWidth(mediaQuery.matches ? 2 : 1);
    mediaQuery.addEventListener('change', updateStroke);

    return () => mediaQuery.removeEventListener('change', updateStroke);
  }, []);

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

  const useDarkThemeForHeading = isDesktop ? isDark : true;

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
            uppercase max-w-[90%] md:max-w-[58%] tracking-widest sm:tracking-normal lg:text-[90px]! xl:text-[100px]! font-anton! transition-colors 
          `}
          style={{
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
            lineHeight: 1,
            letterSpacing: '0.00em',
            color: useDarkThemeForHeading ? '#fff' : '#000',
            WebkitTextStroke: `${strokeWidth}px ${useDarkThemeForHeading ? '#fff' : '#000'}`,
          }}
        >
          Guiding You Through Every Step of your Property Journey.
        </h1>
      </div>
    </section>
  );
}

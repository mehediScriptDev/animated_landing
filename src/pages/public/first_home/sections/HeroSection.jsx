import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FIRST_HOME_CONTENT } from './content';

export default function HeroSection() {
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const btnRef = useRef(null);
  const { hero } = FIRST_HOME_CONTENT;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 })
        .fromTo(bodyRef.current,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo(btnRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-[60vh] md:min-h-[68vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${hero.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      <div className="relative w-[90%] md:w-[75%] max-w-4xl mx-auto text-center text-white py-24 md:py-32 flex flex-col items-center">
        <h1
          ref={headingRef}
          className="font-anton! uppercase tracking-tight leading-[0.95] text-white"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.4rem)' }}
        >
          {hero.title}
        </h1>

        <div ref={bodyRef} className="mt-5 md:mt-7 flex justify-center">
          <p className="w-full max-w-2xl text-center text-[0.85rem] md:text-[0.95rem] leading-relaxed text-white/85 font-light">
            {hero.body}
          </p>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="mt-8 md:mt-10 inline-flex items-center justify-center px-9 py-3 bg-white text-black uppercase text-[0.65rem] md:text-[0.72rem] tracking-[0.22em] font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105! hover:shadow-lg"
        >
          {hero.cta}
        </button>
      </div>
    </section>
  );
}

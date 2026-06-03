import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FIRST_HOME_CONTENT } from './content';

gsap.registerPlugin(ScrollTrigger);

export default function SupportSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const { support } = FIRST_HOME_CONTENT;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text slides in from left
      const textEls = textRef.current.querySelectorAll('.support-text-animate');
      gsap.fromTo(
        textEls,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      // Image slides in from right
      gsap.fromTo(
        imgRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-black py-14 md:py-20 text-white overflow-hidden">
      <div
        ref={sectionRef}
        className="w-[90%] md:w-[75%] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* Text */}
        <div ref={textRef} className="flex flex-col justify-center py-2 md:py-4">
          <h2
            className="support-text-animate font-anton! uppercase leading-[0.95] text-white"
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}
          >
            {support.title[0]}
            <br />
            {support.title[1]}
          </h2>

          {/* Gold accent divider */}
          <div className="support-text-animate mt-5 h-0.75 w-12 bg-white/40 rounded-full" />

          <p className="support-text-animate mt-5 text-[0.84rem] md:text-[0.92rem] leading-relaxed text-white/70 max-w-lg">
            {support.body}
          </p>
        </div>

        {/* Image */}
        <div ref={imgRef} className="relative overflow-hidden rounded-tr-[20px] rounded-bl-[20px]">
          <img
            src={support.image}
            alt="Mortgage support"
            className="w-full h-64 md:h-80 object-cover object-center"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

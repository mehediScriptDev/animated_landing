import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FIRST_HOME_CONTENT } from './content';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const { intro } = FIRST_HOME_CONTENT;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // Split heading lines for stagger animation
      const lines = headingRef.current.querySelectorAll('.intro-line');
      gsap.fromTo(
        lines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#efefef] py-16 md:py-22 border-t border-black/8">
      <div className="w-[90%] md:w-[75%] max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2
          ref={headingRef}
          className="font-black uppercase leading-[0.96] tracking-tight"
          style={{ fontSize: 'clamp(1.6rem, 5.2vw, 3.5rem)', color: '#111111' }}
        >
          <span className="intro-line block">{intro.titleTop}</span>
          <span className="intro-line block">{intro.titleBottom}</span>
        </h2>
      </div>
    </section>
  );
}

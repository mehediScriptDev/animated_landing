import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FIRST_HOME_CONTENT } from './content';

gsap.registerPlugin(ScrollTrigger);

export default function PurchaseSection() {
  const sectionRef = useRef(null);
  const { purchase } = FIRST_HOME_CONTENT;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll('.purchase-animate');
      gsap.fromTo(
        els,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.18,
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
    <section className="bg-[#efefef] py-18 md:py-26 border-t border-black/8">
      <div ref={sectionRef} className="w-[90%] md:w-[75%] max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2
          className="purchase-animate font-anton! uppercase leading-[0.96] tracking-tight text-[#111111]!"
          style={{ fontSize: 'clamp(1.65rem, 4.4vw, 3.4rem)' }}
        >
          {purchase.title}
        </h2>

        {/* Accent divider */}
        <div className="purchase-animate mt-6 h-0.75 w-14 bg-black/80 rounded-full" />

        <p className="purchase-animate mt-6 text-[0.86rem] md:text-[1rem] leading-relaxed text-black/75 max-w-3xl">
          {purchase.body}
        </p>
      </div>
    </section>
  );
}

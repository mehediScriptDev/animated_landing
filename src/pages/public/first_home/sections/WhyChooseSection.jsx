import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FIRST_HOME_CONTENT } from './content';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const { whyChoose } = FIRST_HOME_CONTENT;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animates in
      const title = sectionRef.current.querySelector('.why-title');
      gsap.fromTo(
        title,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger up
      const cards = sectionRef.current.querySelectorAll('.why-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.14,
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
    <section className="bg-[#efefef] py-14 md:py-20 border-t border-black/8">
      <div ref={sectionRef} className="w-[90%] md:w-[75%] max-w-5xl mx-auto">
        <h2
          className="why-title text-center font-anton! uppercase text-[#111111]! leading-none mb-10 md:mb-14"
          style={{ fontSize: 'clamp(1.65rem, 3.1vw, 2.9rem)' }}
        >
          {whyChoose.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {whyChoose.cards.map((card) => (
            <article
              key={card.label}
              className="why-card group bg-white border border-black/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-44 md:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <p className="px-4 py-4 text-[0.73rem] md:text-[0.78rem] leading-snug font-semibold uppercase tracking-wider text-black/85 text-left">
                {card.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

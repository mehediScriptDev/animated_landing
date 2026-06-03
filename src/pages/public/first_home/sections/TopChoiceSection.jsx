import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FIRST_HOME_CONTENT } from './content';

gsap.registerPlugin(ScrollTrigger);

export default function TopChoiceSection() {
  const sectionRef = useRef(null);
  const imagesRef = useRef(null);
  const textRef = useRef(null);
  const { topChoice } = FIRST_HOME_CONTENT;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Images slide in from left
      gsap.fromTo(
        imagesRef.current,
        { x: -60, opacity: 0 },
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

      // Text content animates in from right with stagger on children
      const textEls = textRef.current.querySelectorAll('.text-animate');
      gsap.fromTo(
        textEls,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#efefef] pb-18 md:pb-26">
      <div
        ref={sectionRef}
        className="w-[90%] md:w-[75%] max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center"
      >
        {/* Images */}
        <div ref={imagesRef} className="grid grid-cols-2 gap-3 md:gap-5">
          <img
            src={topChoice.leftImage}
            alt="First home guidance"
            className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-tr-[26px] shadow-md"
          />
          <img
            src={topChoice.middleImage}
            alt="Modern property"
            className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-tr-[26px] rounded-bl-[26px] shadow-md"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3
            className="text-animate font-anton uppercase leading-[0.95] tracking-tight text-[#111111]"
            style={{ fontSize: 'clamp(1.5rem, 3.8vw, 2rem)' }}
          >
            {topChoice.title[0]}
            <br />
            {topChoice.title[1]}
            <br />
            {topChoice.title[2]}
          </h3>

          {/* Accent divider */}
          <div className="text-animate mt-5 h-0.75 w-14 bg-black/80 rounded-full" />

          <p className="text-animate mt-5 text-[0.86rem] md:text-[0.97rem] leading-relaxed text-black/75 max-w-xl">
            {topChoice.body}
          </p>
        </div>
      </div>
    </section>
  );
}

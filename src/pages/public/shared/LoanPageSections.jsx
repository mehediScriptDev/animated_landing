/**
 * Shared section components reused across all loan pages
 * (Next Home, Investment, Construction, SMSF, Refinancing).
 *
 * Each section accepts a `content` prop with the relevant data
 * from the page's own content.js file.
 */
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── HeroSection ───────────────────────────────────────────── */
export function SharedHeroSection({ content }) {
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 })
        .fromTo(bodyRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo(btnRef.current,     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-[60vh] md:min-h-[68vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${content.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      <div className="relative w-[90%] md:w-[75%] max-w-4xl mx-auto text-center text-white py-24 md:py-32 flex flex-col items-center">
        <h1
          ref={headingRef}
          className="font-anton! uppercase tracking-tight leading-[0.95] text-white"
          style={{ fontSize: 'clamp(2rem, 4.8vw, 4.2rem)' }}
        >
          {content.title}
        </h1>
        <div ref={bodyRef} className="mt-5 md:mt-7 flex justify-center">
          <p className="w-full max-w-2xl text-center text-[0.85rem] md:text-[0.95rem] leading-relaxed text-white/85 font-light">
            {content.body}
          </p>
        </div>
        <button
          ref={btnRef}
          type="button"
          className="mt-8 md:mt-10 inline-flex items-center justify-center px-9 py-3 bg-white text-black uppercase text-[0.65rem] md:text-[0.72rem] tracking-[0.22em] font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          {content.cta}
        </button>
      </div>
    </section>
  );
}

/* ─── IntroSection ──────────────────────────────────────────── */
export function SharedIntroSection({ content }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !headingRef.current) return;
    const ctx = gsap.context(() => {
      const lines = headingRef.current.querySelectorAll('.intro-line');
      gsap.fromTo(lines, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
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
          <span className="intro-line block">{content.titleTop}</span>
          <span className="intro-line block">{content.titleBottom}</span>
        </h2>
      </div>
    </section>
  );
}

/* ─── TopSection (images left + text right) ─────────────────── */
export function SharedTopSection({ content }) {
  const sectionRef = useRef(null);
  const imagesRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imagesRef.current, { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      const textEls = textRef.current.querySelectorAll('.text-animate');
      gsap.fromTo(textEls, { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#efefef] pb-18 md:pb-26">
      <div ref={sectionRef} className="w-[90%] md:w-[75%] max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
        <div ref={imagesRef} className="grid grid-cols-2 gap-3 md:gap-5">
          <img src={content.leftImage} alt="" className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-tr-[26px] shadow-md" />
          <img src={content.middleImage} alt="" className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-tr-[26px] rounded-bl-[26px] shadow-md" />
        </div>
        <div ref={textRef} className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3
            className="text-animate font-black uppercase leading-[0.95] tracking-tight text-[#111111]"
            style={{ fontSize: 'clamp(1.5rem, 3.8vw, 3rem)' }}
          >
            {content.title.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h3>
          <div className="text-animate mt-5 h-[3px] w-14 bg-black/80 rounded-full" />
          <p className="text-animate mt-5 text-[0.86rem] md:text-[0.97rem] leading-relaxed text-black/75 max-w-xl">
            {content.body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── SecondarySection (centered text) ──────────────────────── */
export function SharedSecondarySection({ content }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll('.secondary-animate');
      gsap.fromTo(els, { y: 45, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#efefef] py-18 md:py-26 border-t border-black/8">
      <div ref={sectionRef} className="w-[90%] md:w-[75%] max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2
          className="secondary-animate font-black uppercase leading-[0.96] tracking-tight text-[#111111]"
          style={{ fontSize: 'clamp(1.65rem, 4.4vw, 3.2rem)' }}
        >
          {content.title}
        </h2>
        <div className="secondary-animate mt-6 h-[3px] w-14 bg-black/80 rounded-full" />
        {content.body.split('\n\n').map((para, i) => (
          <p key={i} className="secondary-animate mt-6 text-[0.86rem] md:text-[1rem] leading-relaxed text-black/75 max-w-3xl">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

/* ─── SupportSection (dark bg, text + image) ────────────────── */
export function SharedSupportSection({ content }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const textEls = textRef.current.querySelectorAll('.support-text-animate');
      gsap.fromTo(textEls, { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.85, stagger: 0.16, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
      gsap.fromTo(imgRef.current, { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-black py-14 md:py-20 text-white overflow-hidden">
      <div ref={sectionRef} className="w-[90%] md:w-[75%] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div ref={textRef} className="flex flex-col justify-center py-2 md:py-4">
          <h2
            className="support-text-animate font-anton! uppercase leading-[0.95] text-white"
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}
          >
            {content.title[0]}<br />{content.title[1]}
          </h2>
          <div className="support-text-animate mt-5 h-[3px] w-12 bg-white/40 rounded-full" />
          <p className="support-text-animate mt-5 text-[0.84rem] md:text-[0.92rem] leading-relaxed text-white/70 max-w-lg">
            {content.body}
          </p>
        </div>
        <div ref={imgRef} className="relative overflow-hidden rounded-tr-[20px] rounded-bl-[20px]">
          <img src={content.image} alt="" className="w-full h-64 md:h-80 object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

/* ─── WhyChooseSection (cards grid) ─────────────────────────── */
export function SharedWhyChooseSection({ content }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const title = sectionRef.current.querySelector('.why-title');
      gsap.fromTo(title, { y: 35, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      const cards = sectionRef.current.querySelectorAll('.why-card');
      gsap.fromTo(cards, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#efefef] py-14 md:py-20 border-t border-black/8">
      <div ref={sectionRef} className="w-[90%] md:w-[75%] max-w-5xl mx-auto">
        <h2
          className="why-title text-center font-anton! uppercase text-[#111111] leading-none mb-10 md:mb-14"
          style={{ fontSize: 'clamp(1.65rem, 3.1vw, 2.9rem)' }}
        >
          {content.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {content.cards.map((card) => (
            <article key={card.label} className="why-card group bg-white border border-black/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <img src={card.image} alt={card.label} className="w-full h-44 md:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <p className="px-4 py-4 text-[0.73rem] md:text-[0.78rem] leading-snug font-semibold uppercase tracking-[0.05em] text-black/85 text-left">
                {card.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

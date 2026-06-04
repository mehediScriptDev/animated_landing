/**
 * Shared loan-page section components.
 * All 6 loan pages (First Home, Next Home, Investment, Construction, SMSF, Refinancing)
 * use these identical components — same fonts, sizes, animations, and layout
 * as the original First Home page.
 *
 * Each component accepts a `content` prop instead of reading from a fixed import.
 */
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "../../../components/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   HeroSection
   Dark hero with bg image, animated heading / body / CTA
───────────────────────────────────────────────────────────── */
export function HeroSection({ content }) {
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 },
      )
        .fromTo(
          bodyRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5",
        )
        .fromTo(
          btnRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-[60vh] md:min-h-[68vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${content.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      <div className="relative w-[90%] md:w-[75%] max-w-4xl mx-auto text-center text-white py-24 md:py-32 flex flex-col items-center">
        <h1
          ref={headingRef}
          className="font-anton! uppercase tracking-tight leading-[0.95] text-white"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.4rem)" }}
        >
          {content.title}
        </h1>

        <div ref={bodyRef} className="mt-5 md:mt-7 flex justify-center">
          <p className="w-full max-w-2xl text-center text-[0.85rem] md:text-[0.95rem] leading-relaxed text-white/85 font-light">
            {content.body}
          </p>
        </div>

        <a
          ref={btnRef}
          href="tel:0413657314"
          className="mt-8 md:mt-10 inline-flex items-center justify-center px-9 py-3 bg-white text-black uppercase text-[0.65rem] md:text-[0.72rem] tracking-[0.22em] font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105! hover:shadow-lg no-underline"
        >
          {content.cta}
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   IntroSection
   Large centred heading on light grey, lines stagger in on scroll
───────────────────────────────────────────────────────────── */
export function IntroSection({ content }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !headingRef.current) return;

    const ctx = gsap.context(() => {
      const lines = headingRef.current.querySelectorAll(".intro-line");
      gsap.fromTo(
        lines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#efefef] py-16 md:py-22 border-t border-black/8"
    >
      <div className="w-[90%] md:w-[75%] max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2
          ref={headingRef}
          className="font-black font-anton! uppercase leading-[0.96] tracking-tight"
          style={{ fontSize: "clamp(1.6rem, 5.2vw, 3.5rem)", color: "#111111" }}
        >
          <span className="intro-line block">{content.titleTop}</span>
          <span className="intro-line block">{content.titleBottom}</span>
        </h2>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TopChoiceSection  (= TopSection on other pages)
   Two images on the left, heading + body on the right.
   Mirrors FirstHome's TopChoiceSection exactly.
───────────────────────────────────────────────────────────── */
export function TopChoiceSection({ content }) {
  const sectionRef = useRef(null);
  const imagesRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      // Text content animates in from right with stagger on children
      const textEls = textRef.current.querySelectorAll(".text-animate");
      gsap.fromTo(
        textEls,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
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
            src={content.leftImage}
            alt=""
            className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-tr-[26px] shadow-md"
          />
          <img
            src={content.middleImage}
            alt=""
            className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-tr-[26px] rounded-bl-[26px] shadow-md"
          />
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <h3
            className="text-animate font-anton uppercase leading-[0.95] tracking-tight text-[#111111]"
            style={{ fontSize: "clamp(1.5rem, 3.8vw, 2rem)" }}
          >
            {content.title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h3>

          {/* Accent divider */}
          <div className="text-animate mt-5 h-0.75 w-14 bg-black/80 rounded-full" />

          <p className="text-animate mt-5 text-[0.86rem] md:text-[0.97rem] leading-relaxed text-black/75 max-w-xl">
            {content.body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PurchaseSection  (= SecondarySection on other pages)
   Centred heading + body on light grey. Stagger on scroll.
   Mirrors FirstHome's PurchaseSection exactly.
───────────────────────────────────────────────────────────── */
export function PurchaseSection({ content }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll(".purchase-animate");
      gsap.fromTo(
        els,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#efefef] py-18 md:py-26 border-t border-black/8">
      <div
        ref={sectionRef}
        className="w-[90%] md:w-[75%] max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <h2
          className="purchase-animate font-anton! uppercase leading-[0.96] tracking-tight text-[#111111]!"
          style={{ fontSize: "clamp(1.65rem, 4.4vw, 3.4rem)" }}
        >
          {content.title}
        </h2>

        {/* Accent divider */}
        <div className="purchase-animate mt-6 h-0.75 w-14 bg-black/80 rounded-full" />

        {/* Support multi-paragraph bodies (split on \n\n) */}
        {content.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="purchase-animate mt-6 text-[0.86rem] md:text-[1rem] leading-relaxed text-black/75 max-w-3xl"
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SupportSection
   Dark black bg, text left + image right. Mirrors FirstHome exactly.
───────────────────────────────────────────────────────────── */
export function SupportSection({ content }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text slides in from left
      const textEls = textRef.current.querySelectorAll(".support-text-animate");
      gsap.fromTo(
        textEls,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        },
      );

      // Image slides in from right
      gsap.fromTo(
        imgRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
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
        <div
          ref={textRef}
          className="flex flex-col justify-center py-2 md:py-4"
        >
          <h2
            className="support-text-animate font-anton! uppercase leading-[0.95] text-white"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}
          >
            {content.title[0]}
            <br />
            {content.title[1]}
          </h2>

          {/* Accent divider */}
          <div className="support-text-animate mt-5 h-0.75 w-12 bg-white/40 rounded-full" />

          <p className="support-text-animate mt-5 text-[0.84rem] md:text-[0.92rem] leading-relaxed text-white/70 max-w-lg">
            {content.body}
          </p>
        </div>

        {/* Image */}
        <div
          ref={imgRef}
          className="relative overflow-hidden rounded-tr-[20px] rounded-bl-[20px]"
        >
          <img
            src={content.image}
            alt=""
            className="w-full h-64 md:h-80 object-cover object-center"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WhyChooseSection
   Light grey, 3-card grid with images. Mirrors FirstHome exactly.
───────────────────────────────────────────────────────────── */
export function WhyChooseSection({ content }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animates in
      const title = sectionRef.current.querySelector(".why-title");
      gsap.fromTo(
        title,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      // Cards stagger up
      const cards = sectionRef.current.querySelectorAll(".why-card");
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#efefef] py-14 md:py-20 border-t border-black/8">
      <div ref={sectionRef} className="w-[90%] md:w-[75%] max-w-5xl mx-auto">
        <h2
          className="why-title text-center font-anton! uppercase text-[#111111]! leading-none mb-10 md:mb-14"
          style={{ fontSize: "clamp(1.65rem, 3.1vw, 2.9rem)" }}
        >
          {content.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {content.cards.map((card) => (
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

/* ─────────────────────────────────────────────────────────────
   CalculatorBanner
   Dark gradient banner linking to /calculators.
   Placed between the last content section and the bottom CTA.
───────────────────────────────────────────────────────────── */
export function CalculatorBanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll(".calc-banner-animate");
      gsap.fromTo(
        els,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#efefef] py-8 md:py-12 border-t border-black/8">
      <div ref={sectionRef} className="w-[90%] md:w-[75%] max-w-5xl mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl md:rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, #050505 0%, #101010 50%, #171717 100%)",
          }}
        >
          {/* Decorative grid dots */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-center gap-6 md:gap-10 px-8 md:px-12 py-10 md:py-14">
            {/* Icon */}
            <div
              className="calc-banner-animate shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="8" y1="10" x2="10" y2="10" />
                <line x1="14" y1="10" x2="16" y2="10" />
                <line x1="8" y1="14" x2="10" y2="14" />
                <line x1="14" y1="14" x2="16" y2="14" />
                <line x1="8" y1="18" x2="16" y2="18" />
              </svg>
            </div>

            {/* Text */}
            <div className="calc-banner-animate flex-1 text-center lg:text-left flex flex-col gap-y-1.5 md:gap-y-2">
              <h3
                className="font-anton! uppercase text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
              >
                How much can you borrow?
              </h3>
              <p className="text-[0.82rem] md:text-[0.88rem] text-white/55 max-w-lg">
                Use our free calculators to estimate your borrowing power and
                monthly repayments — no sign‑up required.
              </p>
            </div>

            {/* CTA */}
            <TransitionLink
              to="/calculators"
              className="calc-banner-animate inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[0.72rem] md:text-[0.76rem] font-bold uppercase tracking-[0.14em] no-underline transition-all duration-300 hover:scale-105! hover:shadow-lg shrink-0"
              style={{
                background: "#ffffff",
                color: "#000000",
              }}
            >
              Try Calculators
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FloatingCalculatorButton
   Small fixed pill button at bottom-right that appears after
   scrolling. Links to /calculators.
───────────────────────────────────────────────────────────── */
export function FloatingCalculatorButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <TransitionLink
      to="/calculators"
      aria-label="Open calculators"
      className="no-underline"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 20px",
        background: "rgba(10, 10, 10, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(201, 168, 76, 0.25)",
        borderRadius: 50,
        color: "#ffffff",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="10" y2="10" />
        <line x1="14" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="10" y2="14" />
        <line x1="14" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
      Calculator
    </TransitionLink>
  );
}

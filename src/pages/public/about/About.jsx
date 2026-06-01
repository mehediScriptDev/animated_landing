import { useRef, useEffect } from "react";
import SEO from "../../../components/SEO";
import { useScrolled } from "../../../hooks/useScrolled";
import bgImage from "../../../assets/about/removebg.png";

import HeroSection from "./sections/HeroSection";
import BioSection from "./sections/BioSection";
import ExpertiseSection from "./sections/ExpertiseSection";
import ClientsSection from "./sections/ClientsSection";
import AwardsSection from "./sections/AwardsSection";
import CtaSection from "./sections/CtaSection";

export default function About() {
  const isDark = useScrolled(50);
  const whiteSectionRef = useRef(null);

  // Watch the white Expertise section — when it reaches the navbar area,
  // dispatch an event so the RootLayout can flip the navbar back to dark logo/text
  useEffect(() => {
    const el = whiteSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When white section is visible at the top → navbar should be dark (black logo)
        window.dispatchEvent(
          new CustomEvent("about-nav-theme", {
            detail: { dark: !entry.isIntersecting },
          }),
        );
      },
      {
        // rootMargin: negative top = only trigger when section reaches navbar height (64px)
        rootMargin: "-64px 0px -80% 0px",
        threshold: 0,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="About | Michael Traikos"
        description="Learn about Michael Traikos — competition and creativity runs hard in his veins."
        canonical="https://example.com/about"
      />

      {/* ── Fixed portrait image (right side, behind everything) ──── */}
      <div
        className="fixed top-0 right-0 w-1/2 h-screen z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* ── WHITE overlay: fades image into white bg (visible initially) ── */}
      <div
        className={`
          fixed inset-0 z-0 pointer-events-none
          transition-opacity duration-300 ease-in-out
          ${isDark ? "opacity-0" : "opacity-100"}
        `}
        aria-hidden="true"
        // style={{
        //   background:
        //     "linear-gradient(to right, #ffffff 0%, #ffffff 45%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0) 100%)",
        // }}
      />

      {/* ── DARK overlay: single uniform dark tint (fades in on scroll) ── */}
      <div
        className={`
          fixed inset-0 z-0 pointer-events-none
          bg-black/85
          transition-opacity duration-300 ease-in-out
          ${isDark ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden="true"
      />

      {/* ── Page content ──────────────────────────────────────────── */}
      <main id="main-content" tabIndex={-1} className="relative z-1">
        <HeroSection isDark={isDark} />
        <BioSection isDark={isDark} />
        {/* Ref wraps the white section so IntersectionObserver can detect it */}
        <div ref={whiteSectionRef}>
          <ExpertiseSection />
        </div>
        <ClientsSection />
        <AwardsSection />
        <CtaSection />
      </main>
    </>
  );
}

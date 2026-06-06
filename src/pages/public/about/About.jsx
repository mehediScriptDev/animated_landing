import { useRef, useEffect } from "react";
import SEO from "../../../components/SEO";
import { useScrolled } from "../../../hooks/useScrolled";
import bgImage from "../../../assets/about/About-me.jpg";
import BioSection from "./sections/BioSection";
import CtaSection from "./sections/CtaSection";
import HeroSection from "./sections/HeroSection";

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

      {/* ── Fixed portrait image (full-width on mobile, right half on desktop) ── */}
      <div
        className="fixed top-0 right-0 w-full md:w-1/2 h-screen z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover object-top"
        />
        {/* Mobile gradient: fades image to dark at the bottom for text legibility */}
        <div className="absolute inset-0 md:hidden bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* ── WHITE overlay: hidden on mobile (photo must show), fades on desktop scroll ── */}
      <div
        className={`
          fixed inset-0 z-0 pointer-events-none
          transition-opacity duration-300 ease-in-out
          hidden md:block
          ${isDark ? "opacity-0" : "opacity-100"}
        `}
        aria-hidden="true"
      />

      {/* ── DARK overlay (mobile only): always visible for legibility ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-black/60 md:hidden"
        aria-hidden="true"
      />

      {/* ── DARK overlay (desktop only): scroll-driven fade in ── */}
      <div
        className={`
          fixed inset-0 z-0 pointer-events-none
          bg-black/85
          transition-opacity duration-300 ease-in-out
          hidden md:block
          ${isDark ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden="true"
      />

      {/* ── Page content ──────────────────────────────────────────── */}
      <main id="main-content" tabIndex={-1} className="relative z-1">
        <HeroSection isDark={isDark} />
        <BioSection isDark={isDark} />
        {/* Ref wraps the white section so IntersectionObserver can detect it */}
        {/* <div ref={whiteSectionRef}>
          <ExpertiseSection />
        </div> */}
        {/* <ClientsSection /> */}
        {/* <AwardsSection /> */}
        <CtaSection />
      </main>
    </>
  );
}

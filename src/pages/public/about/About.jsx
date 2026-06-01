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
        style={{
          background:
            "linear-gradient(to right, #ffffff 0%, #ffffff 45%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* ── DARK overlay: single uniform dark tint (fades in on scroll) ── */}
      <div
        className={`
          fixed inset-0 z-0 pointer-events-none
          bg-black/80
          transition-opacity duration-300 ease-in-out
          ${isDark ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden="true"
      />

      {/* ── Page content ──────────────────────────────────────────── */}
      <main id="main-content" tabIndex={-1} className="relative z-1">
        <HeroSection isDark={isDark} />
        <BioSection isDark={isDark} />
        <ExpertiseSection />
        <ClientsSection />
        <AwardsSection />
        <CtaSection />
      </main>
    </>
  );
}

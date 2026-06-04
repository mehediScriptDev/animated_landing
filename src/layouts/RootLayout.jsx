import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageWipeOverlay, {
  pageRef,
  lenisRef,
} from "../components/PageWipeOverlay";
import { useScrolled } from "../hooks/useScrolled";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout() {
  const scrolled = useScrolled(50);
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 650px)").matches,
  );
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis with ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  // About page dispatches 'about-nav-theme' events when white sections
  // enter/leave the viewport. This lets the navbar switch back to dark
  // logo/text on white sections (e.g. Expertise).
  const [aboutNavDark, setAboutNavDark] = useState(true);

  useEffect(() => {
    if (!isAbout) return;
    const handler = (e) => setAboutNavDark(e.detail.dark);
    window.addEventListener("about-nav-theme", handler);
    return () => window.removeEventListener("about-nav-theme", handler);
  }, [isAbout]);

  // Reset aboutNavDark when navigating away from the about page
  useEffect(() => {
    if (!isAbout) setAboutNavDark(true);
  }, [isAbout]);

  const isContact = pathname === "/contact";
  const isCalculators = pathname === "/calculators";

  // Navbar color logic:
  // - Home: follows scroll state on all devices
  // - About: always dark on mobile; on desktop follows scroll AND section theme
  // - Contact: dark at top, white on scroll (hero image behind sticky nav)
  // - Calculators: always dark (white text) since page is black
  // - Other pages: always light (unscrolled)
  const navScrolledByPage = isHome
    ? scrolled
    : isAbout
      ? isMobile || (scrolled && aboutNavDark)
      : isContact
        ? scrolled
        : isCalculators
          ? true
          : false;

  const navScrolled = navScrolledByPage;

  // bg transition only applies on the home page (about handles its own overlays)
  // Calculators page is dark midnight navy theme
  const bgClass =
    isHome && scrolled
      ? "bg-black dark-theme"
      : isCalculators
        ? "bg-[#0d0b21] dark-theme"
        : "bg-white";

  return (
    <>
      {/* Overlay is rendered OUTSIDE the page wrapper so it is never
          unmounted during route changes — the GSAP timeline can safely
          run its full two-phase sequence across every navigation. */}
      <PageWipeOverlay />
      <div
        ref={(el) => {
          pageRef.current = el;
        }}
        className={`min-h-screen flex flex-col transition-colors duration-200 ease-in-out ${bgClass}`}
      >
        <Navbar scrolled={navScrolled} />
        <Outlet />
        <Footer scrolled={scrolled} />
      </div>
    </>
  );
}

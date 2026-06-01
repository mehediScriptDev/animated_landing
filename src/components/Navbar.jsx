import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TransitionLink from "./TransitionLink";
import logo from "../assets/logo.png";
import logoDark from "../assets/logo_dark_1.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ scrolled = false }) {
  const [logoScrolled, setLogoScrolled] = useState(false);
  const [logoIntroVisible, setLogoIntroVisible] = useState(false);
  const [logoHoverMode, setLogoHoverMode] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrolled) {
      // Going dark: wait for bg transition to complete, then swap logo
      const timer = setTimeout(() => setLogoScrolled(true), 200);
      return () => clearTimeout(timer);
    } else {
      // Going light: swap logo immediately so dark logo is visible as bg turns white
      setLogoScrolled(false);
    }
  }, [scrolled]);

  useEffect(() => {
    let timeoutId;
    const rafId = requestAnimationFrame(() => {
      setLogoIntroVisible(true);
      timeoutId = setTimeout(() => {
        setLogoIntroVisible(false);
        setLogoHoverMode(true);
      }, 2000);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="w-[98%] mx-auto h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <TransitionLink
          to="/"
          aria-label="Home — Traikos Finance"
          className="group flex items-center gap-3"
        >
          <img
            src={logoScrolled ? logoDark : logo}
            alt="Traikos Finance logo"
            className="h-8 w-auto object-contain transition-all duration-200"
          />
          <span
            className={`text-xs font-black uppercase tracking-widest whitespace-nowrap flex items-center gap-1.5 overflow-hidden transition-all duration-300 ease-in-out ${
              scrolled ? "text-white" : "text-black"
            }`}
          >
            {["Michael", "Traikos"].map((word, index) => (
              <span
                key={word}
                className={`inline-block transition-all duration-500 ease-out motion-reduce:transition-none ${
                  logoHoverMode
                    ? "opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
                    : logoIntroVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-3"
                }`}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                {word}
              </span>
            ))}
          </span>
        </TransitionLink>

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          {/* Desktop nav links removed */}

          {/* Contextual right-corner link: show next page (About on Home, Contact on About) */}
          {pathname === '/' && (
            <TransitionLink
              to="/about"
              className={`flex items-center gap-2 text-[12px] tracking-widest font-normal px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-70 focus-visible:outline-2 ${
                scrolled ? 'border-white text-white' : 'text-black'
              }`}
              aria-label="About"
            >
              About
            </TransitionLink>
          )}
          {pathname === '/about' && (
            <TransitionLink
              to="/contact"
              className={`flex items-center gap-2 text-[12px] tracking-widest font-normal px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-70 focus-visible:outline-2 ${
                scrolled ? 'border-white text-white' : 'text-black'
              }`}
              aria-label="Contact us"
            >
              Contact Us
            </TransitionLink>
          )}

          {/* Mobile menu removed */}
        </div>
      </nav>

      {/* Mobile dropdown removed */}
    </header>
  );
}

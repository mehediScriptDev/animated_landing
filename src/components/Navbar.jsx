import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TransitionLink from './TransitionLink';
import logo from '../assets/logo.png';
import logoDark from '../assets/logo_dark.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoScrolled, setLogoScrolled] = useState(false);
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
            className={`text-xs font-black uppercase tracking-widest overflow-hidden max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap ${
              scrolled ? 'text-white' : 'text-black'
            }`}
          >
            Michael Traikos
          </span>
        </TransitionLink>

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {links.map(({ to, label }) => {
              const isActive = pathname === to;
              return (
                <li key={to}>
                  <TransitionLink
                    to={to}
                    className={`block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
                      isActive
                        ? scrolled
                          ? 'border-white text-white'
                          : 'border-black text-black'
                        : 'border-transparent text-(--text) hover:text-(--text-h)'
                    }`}
                  >
                    {label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>

          {/* Call Now */}
          <a
            href="tel:+1234567890"
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-70 focus-visible:outline-2 ${
              scrolled ? 'border-white text-white' : 'text-black'
            }`}
            aria-label="Call us now"
          >
            Call Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          {/* Mobile-only menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`md:hidden flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-200 hover:opacity-70 focus-visible:outline-2 ${
              scrolled ? 'border-white text-white' : 'border-black text-black'
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Navigation menu"
          className="px-3 pb-3"
        >
          <ul className="flex flex-col gap-1 list-none m-0 p-0" role="list">
            {links.map(({ to, label }) => {
              const isActive = pathname === to;
              return (
                <li key={to}>
                  <TransitionLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-(--accent-bg) text-(--accent)'
                        : scrolled
                        ? 'text-white/80 hover:bg-white/10 hover:text-white'
                        : 'text-(--text) hover:bg-black/5 hover:text-(--text-h)'
                    }`}
                  >
                    {label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

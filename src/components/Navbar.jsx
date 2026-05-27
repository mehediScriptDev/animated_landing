import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink
          to="/"
          className="flex items-center"
          aria-label="Home — MyApp"
        >
          <img
            src={logoScrolled ? logoDark : logo}
            alt="MyApp logo"
            className="h-8 w-auto object-contain transition-all duration-200"
          />
        </NavLink>

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          {/* Call Now */}
          <a
            href="tel:+1234567890"
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 hover:opacity-70 focus-visible:outline-2 ${
              scrolled ? 'border-white text-white' : 'border-black text-black'
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

          {/* Menu button — circular */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-200 hover:opacity-70 focus-visible:outline-2 ${
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
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                        : scrolled
                        ? 'text-white/80 hover:bg-white/10 hover:text-white'
                        : 'text-[var(--text)] hover:bg-black/5 hover:text-[var(--text-h)]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

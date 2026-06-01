import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageWipeOverlay, { pageRef } from '../components/PageWipeOverlay';
import { useScrolled } from '../hooks/useScrolled';

export default function RootLayout() {
  const scrolled = useScrolled(50);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';

  // About page dispatches 'about-nav-theme' events when white sections
  // enter/leave the viewport. This lets the navbar switch back to dark
  // logo/text on white sections (e.g. Expertise).
  const [aboutNavDark, setAboutNavDark] = useState(true);

  useEffect(() => {
    if (!isAbout) return;
    const handler = (e) => setAboutNavDark(e.detail.dark);
    window.addEventListener('about-nav-theme', handler);
    return () => window.removeEventListener('about-nav-theme', handler);
  }, [isAbout]);

  // Reset aboutNavDark when navigating away from the about page
  useEffect(() => {
    if (!isAbout) setAboutNavDark(true);
  }, [isAbout]);

  const isContact = pathname === '/contact';

  // Navbar color logic:
  // - Home: follows scroll state
  // - About: follows scroll state AND whether a dark section is behind the navbar
  // - Contact: dark at top, white on scroll (hero image behind sticky nav)
  // - Other pages: always light (unscrolled)
  const navScrolled = isHome
    ? scrolled
    : isAbout
    ? scrolled && aboutNavDark
    : isContact
    ? scrolled
    : false;

  // bg transition only applies on the home page (about handles its own overlays)
  const bgClass = isHome && scrolled ? 'bg-black dark-theme' : 'bg-white';

  return (
    <>
      {/* Overlay is rendered OUTSIDE the page wrapper so it is never
          unmounted during route changes — the GSAP timeline can safely
          run its full two-phase sequence across every navigation. */}
      <PageWipeOverlay />
      <div
        ref={(el) => { pageRef.current = el; }}
        className={`min-h-screen flex flex-col transition-colors duration-200 ease-in-out ${bgClass}`}
      >
        <Navbar scrolled={navScrolled} />
        <Outlet />
        <Footer scrolled={scrolled} />
      </div>
    </>
  );
}

import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrolled } from '../hooks/useScrolled';

export default function RootLayout() {
  const scrolled = useScrolled(50);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // On non-home pages the navbar always stays in the light (unscrolled) state
  const navScrolled = isHome ? scrolled : false;

  // bg transition only applies on the home page
  const bgClass = isHome && scrolled ? 'bg-black dark-theme' : 'bg-white';

  return (
    <>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-200 ease-in-out ${bgClass}`}
      >
        <Navbar scrolled={navScrolled} />
        <Outlet />
        <Footer scrolled={scrolled} />
      </div>
    </>
  );
}

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrolled } from '../hooks/useScrolled';

export default function RootLayout() {
  const scrolled = useScrolled(5);

  return (
    <>

      <div
        className={`min-h-screen flex flex-col transition-colors duration-200 ease-in-out  ${
          scrolled ? 'bg-black dark-theme' : 'bg-white'
        }`}
      >
        <Navbar scrolled={scrolled} />
        <Outlet />
        <Footer scrolled={scrolled} />
      </div>
    </>
  );
}

import SEO from '../../../components/SEO';
import { useScrolled } from '../../../hooks/useScrolled';
import HeroBanner from './components/HeroBanner';
import ClientsGrid from './components/ClientsGrid';
import LendersCarousel from './components/LendersCarousel';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import CtaSection from '../about/sections/CtaSection';

export default function Home() {
  const isDark = useScrolled(50);

  return (
    <>
      <SEO
        title="Traikos Finance | Real Estate Insight to Financial Foresight"
        description="Making cents of real estate and sense of your finance."
        canonical="https://example.com/"
      />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <HeroBanner isDark={isDark} />
        <ClientsGrid />
        <AboutSection />
        <LendersCarousel />
        <ReviewsSection />
        <CtaSection/>
      </main>
    </>
  );
}

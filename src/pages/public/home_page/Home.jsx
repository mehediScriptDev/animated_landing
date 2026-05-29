import SEO from '../../../components/SEO';
import HeroBanner from './components/HeroBanner';
import ClientsGrid from './components/ClientsGrid';
import LendersCarousel from './components/LendersCarousel';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Making cents of real estate and sense of your finance."
        canonical="https://example.com/"
      />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <HeroBanner />
        <ClientsGrid />
        <LendersCarousel />
        <AboutSection />
        <ReviewsSection />
      </main>
    </>
  );
}

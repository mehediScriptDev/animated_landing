import SEO from '../../../components/SEO';
import HeroSection from './sections/HeroSection';
import IntroSection from './sections/IntroSection';
import TopChoiceSection from './sections/TopChoiceSection';
import PurchaseSection from './sections/PurchaseSection';
import SupportSection from './sections/SupportSection';
import WhyChooseSection from './sections/WhyChooseSection';

export default function FirstHome() {
  return (
    <>
      <SEO
        title="First Home Buyer Loans | Traikos Finance"
        description="First home buyer loan support with clear guidance, practical options, and end-to-end help from Traikos Finance."
        canonical="https://example.com/first-home"
      />

      <main id="main-content" tabIndex={-1} className=" text-black flex-1">
        <HeroSection />
        <IntroSection />
        <TopChoiceSection />
        <PurchaseSection />
        <SupportSection />
        <WhyChooseSection />
      </main>
    </>
  );
}
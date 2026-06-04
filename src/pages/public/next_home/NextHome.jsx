import SEO from '../../../components/SEO';
import CtaSection from '../about/sections/CtaSection';
import { NEXT_HOME_CONTENT } from './sections/content';
import {
  HeroSection,
  IntroSection,
  TopChoiceSection,
  PurchaseSection,
  SupportSection,
  WhyChooseSection,
  CalculatorBanner,
  FloatingCalculatorButton,
} from '../shared/LoanPageSections';

const c = NEXT_HOME_CONTENT;

export default function NextHome() {
  return (
    <>
      <SEO
        title="Next Home Buyer Loans | Traikos Finance"
        description="Moving to your next home? Traikos Finance helps you secure a better loan for your next purchase with personalised advice and competitive rates."
        canonical="https://example.com/next-home"
      />

      <main id="main-content" tabIndex={-1} className="text-black flex-1">
        <HeroSection       content={c.hero} />
        <IntroSection      content={c.intro} />
        <TopChoiceSection  content={c.topSection} />
        <PurchaseSection   content={c.secondary} />
        <SupportSection    content={c.support} />
        <WhyChooseSection  content={c.whyChoose} />
        <CalculatorBanner />
        <div className='bg-black'>
                 <CtaSection />
               </div>
      </main>

      <FloatingCalculatorButton />
    </>
  );
}

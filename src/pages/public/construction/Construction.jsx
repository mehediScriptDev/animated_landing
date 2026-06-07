import SEO from '../../../components/SEO';
import CtaSection from '../about/sections/CtaSection';
import { CONSTRUCTION_CONTENT } from './sections/content';
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

const c = CONSTRUCTION_CONTENT;

export default function Construction() {
  return (
    <>
      <SEO
        title="Construction & Renovation Loans | Mortgage Broker"
        description="Build or renovate your dream home with construction and renovation loans from Traikos Finance. Expert guidance from concept to completion."
        canonical="https://example.com/construction"
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

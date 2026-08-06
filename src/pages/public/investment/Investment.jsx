import SEO from '../../../components/SEO';
import CtaSection from '../about/sections/CtaSection';
import { INVESTMENT_CONTENT } from './sections/content';
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

const c = INVESTMENT_CONTENT;

export default function Investment() {
  return (
    <>
      <SEO
        title="Investment Property Loans | Traikos Finance"
        description="Grow your property portfolio with tailored investment loan solutions from Traikos Finance. Expert guidance on structuring your investment loans."
        canonical="https://example.com/investment"
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

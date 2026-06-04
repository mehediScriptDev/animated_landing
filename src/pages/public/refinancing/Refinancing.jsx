import SEO from '../../../components/SEO';
import CtaSection from '../about/sections/CtaSection';
import { REFINANCING_CONTENT } from './sections/content';
import {
  HeroSection,
  IntroSection,
  TopChoiceSection,
  PurchaseSection,
  SupportSection,
  WhyChooseSection,
} from '../shared/LoanPageSections';

const c = REFINANCING_CONTENT;

export default function Refinancing() {
  return (
    <>
      <SEO
        title="Refinancing Home Loans & Mortgages | Traikos Finance"
        description="Secure a better rate and reduce your repayments by refinancing your home loan with Traikos Finance. Personalised support from start to finish."
        canonical="https://example.com/refinancing"
      />

      <main id="main-content" tabIndex={-1} className="text-black flex-1">
        <HeroSection       content={c.hero} />
        <IntroSection      content={c.intro} />
        <TopChoiceSection  content={c.topSection} />
        <PurchaseSection   content={c.secondary} />
        <SupportSection    content={c.support} />
        <WhyChooseSection  content={c.whyChoose} />
        <div className='bg-black'>
                 <CtaSection />
               </div>
      </main>
    </>
  );
}

import SEO from '../../../components/SEO';
import CtaSection from '../about/sections/CtaSection';
import { SMSF_CONTENT } from './sections/content';
import {
  HeroSection,
  IntroSection,
  TopChoiceSection,
  PurchaseSection,
  SupportSection,
  WhyChooseSection,
} from '../shared/LoanPageSections';

const c = SMSF_CONTENT;

export default function Smsf() {
  return (
    <>
      <SEO
        title="SMSF Loans | Traikos Finance"
        description="Invest in property through your self-managed super fund with expert SMSF loan guidance from Traikos Finance."
        canonical="https://example.com/smsf"
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

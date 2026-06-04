import SEO from '../../../components/SEO';
import CtaSection from '../about/sections/CtaSection';
import { FIRST_HOME_CONTENT } from './sections/content';
import {
  HeroSection,
  IntroSection,
  TopChoiceSection,
  PurchaseSection,
  SupportSection,
  WhyChooseSection,
} from '../shared/LoanPageSections';

const c = FIRST_HOME_CONTENT;

export default function FirstHome() {
  return (
    <>
      <SEO
        title="First Home Buyer Loans | Traikos Finance"
        description="First home buyer loan support with clear guidance, practical options, and end-to-end help from Traikos Finance."
        canonical="https://example.com/first-home"
      />

      <main id="main-content" tabIndex={-1} className="text-black flex-1">
        <HeroSection       content={c.hero} />
        <IntroSection      content={c.intro} />
        <TopChoiceSection  content={c.topChoice} />
        <PurchaseSection   content={c.purchase} />
        <SupportSection    content={c.support} />
        <WhyChooseSection  content={c.whyChoose} />
       <div className='bg-black'>
         <CtaSection />
       </div>
      </main>
    </>
  );
}
import SEO from '../../../components/SEO';
import { REFINANCING_CONTENT } from './sections/content';
import {
  SharedHeroSection,
  SharedIntroSection,
  SharedTopSection,
  SharedSecondarySection,
  SharedSupportSection,
  SharedWhyChooseSection,
} from '../shared/LoanPageSections';

export default function Refinancing() {
  const c = REFINANCING_CONTENT;
  return (
    <>
      <SEO
        title="Refinancing Home Loans & Mortgages | Traikos Finance"
        description="Secure a better rate and reduce your repayments by refinancing your home loan with Traikos Finance. Personalised support from start to finish."
        canonical="https://example.com/refinancing"
      />
      <main id="main-content" tabIndex={-1} className="text-black flex-1">
        <SharedHeroSection content={c.hero} />
        <SharedIntroSection content={c.intro} />
        <SharedTopSection content={c.topSection} />
        <SharedSecondarySection content={c.secondary} />
        <SharedSupportSection content={c.support} />
        <SharedWhyChooseSection content={c.whyChoose} />
      </main>
    </>
  );
}

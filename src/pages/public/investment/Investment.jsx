import SEO from '../../../components/SEO';
import { INVESTMENT_CONTENT } from './sections/content';
import {
  SharedHeroSection,
  SharedIntroSection,
  SharedTopSection,
  SharedSecondarySection,
  SharedSupportSection,
  SharedWhyChooseSection,
} from '../shared/LoanPageSections';

export default function Investment() {
  const c = INVESTMENT_CONTENT;
  return (
    <>
      <SEO
        title="Investment Property Loans | Traikos Finance"
        description="Grow your property portfolio with tailored investment loan solutions from Traikos Finance. Expert guidance on structuring your investment loans."
        canonical="https://example.com/investment"
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

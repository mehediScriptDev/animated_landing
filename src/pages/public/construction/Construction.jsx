import SEO from '../../../components/SEO';
import { CONSTRUCTION_CONTENT } from './sections/content';
import {
  SharedHeroSection,
  SharedIntroSection,
  SharedTopSection,
  SharedSecondarySection,
  SharedSupportSection,
  SharedWhyChooseSection,
} from '../shared/LoanPageSections';

export default function Construction() {
  const c = CONSTRUCTION_CONTENT;
  return (
    <>
      <SEO
        title="Construction & Renovation Loans | Traikos Finance"
        description="Build or renovate your dream home with construction and renovation loans from Traikos Finance. Expert guidance from concept to completion."
        canonical="https://example.com/construction"
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

import SEO from '../../../components/SEO';
import { NEXT_HOME_CONTENT } from './sections/content';
import {
  SharedHeroSection,
  SharedIntroSection,
  SharedTopSection,
  SharedSecondarySection,
  SharedSupportSection,
  SharedWhyChooseSection,
} from '../shared/LoanPageSections';

export default function NextHome() {
  const c = NEXT_HOME_CONTENT;
  return (
    <>
      <SEO
        title="Next Home Buyer Loans | Traikos Finance"
        description="Moving to your next home? Traikos Finance helps you secure a better loan for your next purchase with personalised advice and competitive rates."
        canonical="https://example.com/next-home"
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

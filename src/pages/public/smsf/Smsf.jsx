import SEO from '../../../components/SEO';
import { SMSF_CONTENT } from './sections/content';
import {
  SharedHeroSection,
  SharedIntroSection,
  SharedTopSection,
  SharedSecondarySection,
  SharedSupportSection,
  SharedWhyChooseSection,
} from '../shared/LoanPageSections';

export default function Smsf() {
  const c = SMSF_CONTENT;
  return (
    <>
      <SEO
        title="SMSF Loans | Traikos Finance"
        description="Invest in property through your self-managed super fund with expert SMSF loan guidance from Traikos Finance."
        canonical="https://example.com/smsf"
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

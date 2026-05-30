import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function DisclaimerPage() {
  return (
    <>
      <SEO
        title="Disclaimer"
        description="Traikos Finance Disclaimer — general information only, not legal, tax or financial advice."
        canonical="https://traikosfinance.com.au/disclaimer"
      />

      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">

        {/* ── Disclaimer section ────────────────────────────────────────────── */}
        <div className="flex-1 bg-white">
          <div className="w-[90%] md:w-[75%] mx-auto">
            <div className="py-8 md:py-14 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-10">
              <h1 className="text-sm font-bold tracking-[0.22em] uppercase text-black! leading-snug">
                DISCLAIMER
              </h1>
              <p className="text-sm text-gray-700 leading-relaxed">
                This page provides general information only and has been prepared without taking into
                account your objectives, financial situation or needs. We recommend that you consider
                whether it is appropriate for your circumstances and your full financial situation will
                need to be reviewed prior to acceptance of any offer or product. It does not constitute
                legal, tax or financial advice and you should always seek professional advice in relation
                to your individual circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA bar ───────────────────────────────────────────────────────── */}
        <div className="bg-[#eaeaea]">
          <div className="w-[90%] md:w-[75%] mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-black text-sm leading-relaxed">
              Are you interested to book a free consultation or have any other inquiries?
            </p>
            <Link
              to="/contact"
              className="shrink-0 bg-black text-white text-xs font-bold tracking-[0.18em] uppercase px-7 py-3 hover:bg-black/80 transition-colors"
            >
              CONTACT US
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}

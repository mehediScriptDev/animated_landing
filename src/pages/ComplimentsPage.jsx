import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const SECTIONS = [
  {
    id: 'intro',
    heading: 'COMPLIMENTS AND CONCERNS',
    content: (
      <>
        <p>
          We always work hard to build strong and lasting relationships with our valued customers.
          By listening to your feedback, not only can we address any immediate concerns you may
          have, we will also continually improve our products and services.
        </p>
        <p>
          We know there are times when you may wish to compliment us on something we have done
          well and other times when you may wish to tell us we have not met your expectations.
        </p>
      </>
    ),
  },
  {
    id: 'compliments',
    heading: 'COMPLIMENTS',
    content: (
      <p>
        Our representatives are always delighted to know that they have succeeded in making your
        experience a pleasant and successful one. If one of our representatives has provided you
        with exceptional service in any way, please let us know using the details below, so that
        we can further encourage them via this feedback process.
      </p>
    ),
  },
  {
    id: 'concerns',
    heading: 'CONCERNS',
    content: (
      <>
        <p>
          If, for any reason, you do not feel that you have received the highest standard of care
          from us, we likewise encourage you to share this with us. We have developed a process
          that we believe makes it easy for you to tell us of your concerns and for them to be
          addressed quickly and fairly.
        </p>
        <p>
          If you choose to contact us by mail or email, please make sure you provide as much
          detail as possible about your complaint.
        </p>
      </>
    ),
  },
  {
    id: 'update',
    heading: 'NEED AN UPDATE ON YOUR COMPLAINT',
    content: (
      <p>
        If you have lodged a complaint with us, you can contact us at any time to ask for an
        update on its status. Contact us through any of the methods listed above and please be
        sure to refer to your earlier communication so that we can respond effectively.
      </p>
    ),
  },
  {
    id: 'resolution',
    heading: 'RESOLUTION',
    content: (
      <>
        <p>
          We will write to you to acknowledge your complaint within 24 hours to ensure we treat
          you fairly and will work to resolve your complaint as soon as possible. In the rare
          event, we are still investigating your complaint after 30 days we will write to you to
          explain why and to let you know when we expect to have completed our investigation. In
          the event, you are not satisfied with our response, you can lodge your complaint with
          AFCA.
        </p>
        <p>
          When we have completed our investigation, we will write to let you know the outcome
          and the reasons for our decision.
        </p>
      </>
    ),
  },
  {
    id: 'further',
    heading: 'TAKING IT FURTHER',
    content: (
      <>
        <p>
          We hope that you will be satisfied with how we deal with your complaint. However, if
          your concerns remain unresolved, or you have not heard from us within 30 days, then
          you can have your complaint heard by an independent party, the Australian Financial
          Complaints Authority:
        </p>
        <ul className="flex flex-col gap-1">
          <li>
            Online:{' '}
            <a
              href="https://www.afca.org.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70 transition-opacity"
            >
              www.afca.org.au
            </a>
          </li>
          <li>
            Email:{' '}
            <a
              href="mailto:info@afca.org.au"
              className="underline hover:opacity-70 transition-opacity"
            >
              info@afca.org.au
            </a>
          </li>
          <li>
            Phone:{' '}
            <a href="tel:0413657314" className="underline hover:opacity-70 transition-opacity">
              0413 657 314
            </a>
          </li>
        </ul>
        <p>
          Time limits may apply to complain to AFCA and so you should act promptly or otherwise
          consult the AFCA website to find out if or when the time limit relevant to your
          circumstances expires.
        </p>
      </>
    ),
  },
];

export default function ComplimentsPage() {
  return (
    <>
      <SEO
        title="Compliments & Concern"
        description="Share your feedback with Traikos Finance — compliments, concerns, and complaints resolution process."
        canonical="https://traikosfinance.com.au/compliments"
      />

      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">

        {/* ── Content sections ──────────────────────────────────────────────── */}
        <div className="flex-1 bg-white">
          <div className="w-[90%] md:w-[75%] mx-auto">
            {SECTIONS.map((section, i) => (
              <div
                key={section.id}
                className={`${i !== 0 ? 'border-t border-gray-200' : ''} py-8 md:py-14 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-10`}
              >
                <h2 className="text-sm font-bold tracking-[0.22em] uppercase text-black! leading-snug">
                  {section.heading}
                </h2>
                <div className="text-sm text-gray-700 leading-relaxed flex flex-col gap-4">
                  {section.content}
                </div>
              </div>
            ))}
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
              className="shrink-0 bg-black text-white text-xs font-bold tracking-[0.18em] uppercase px-7 py-3 transition-colors hover:bg-black/80"
            >
              CONTACT US
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}

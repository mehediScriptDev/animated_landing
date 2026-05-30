import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

// ─── Accordion data ───────────────────────────────────────────────────────────
const ACCORDION_ITEMS = [
  {
    id: "collect",
    question: "What information do we collect and how do we use it?",
    answer: (
      <>
        <p>
          We will ask you for your personal information when we assist you with
          your finance. Personal information may include any sensitive
          information (including health information) and may include any
          information you tell us about any vulnerability you may have. We use
          the information you provide to advise about and assist with your
          credit needs. We only provide your information to the companies with
          whom you choose to deal (and their representatives).
        </p>
        <p>
          We also use your information to send you requested product information
          and to enable us to manage your ongoing relationship with us e.g.
          invoicing, client surveys etc. We will do so by mail or electronically
          unless you tell us you do not wish to receive electronic
          communications.
        </p>
        <p>
          We may occasionally notify you about promotions, new services and
          special offers, events or articles we think will be of interest to
          you. We may send you regular updates by email or by post. If you would
          rather not receive this information, email or write to us.
        </p>
        <p>
          We may also use your information internally to help us improve our
          services and help resolves any problems.
        </p>
      </>
    ),
  },
  {
    id: "no-provide",
    question: "What if you don't provide some information to us?",
    answer: (
      <p>
        If you don&apos;t provide us with full information, we can&apos;t
        properly advise or assist you with your credit needs.
      </p>
    ),
  },
  {
    id: "hold-protect",
    question: "How do we hold and protect your information?",
    answer: (
      <>
        <p>
          We strive to maintain the reliability, accuracy, completeness, and
          currency of the personal information we hold and to protect its
          privacy and security. We keep personal information only for as long as
          is reasonably necessary for the purpose for which it was collected or
          to comply with any applicable legal or ethical reporting or document
          retention requirements.
        </p>
        <p>
          We hold the information we collect from you. Your file may be archived
          and stored with Australian-based providers regulated by the Privacy
          Act.
        </p>
        <p>
          We ensure that your information is safe. We safeguard our data with
          robust security measures and advanced systems to ensure its
          protection.
        </p>
      </>
    ),
  },
  {
    id: "disclose",
    question:
      "How do we hold and will we disclose the information we collect to anyone?",
    answer: (
      <>
        <p>
          We do not sell, trade, or rent your personal information to others.
        </p>
        <p>
          We may need to provide your information to our credit licensee e.g.
          for administration and supervisory activities, contractors who supply
          services to us e.g. to handle mailings on our behalf, or to other
          companies in the event of a corporate sale, merger, re-organisation,
          dissolution or similar event. However, we will do our best to ensure
          that they protect your information in the same way that we do.
        </p>
        <p>
          We may also provide information to others if we are required to do so
          by law or under some unusual other circumstances which the Privacy Act
          permits.
        </p>
        <p className="font-semibold">Disclosures to overseas recipients</p>
        <p>
          Some of the recipients to whom we disclose your personal information
          may be based overseas. It is not practicable to list every country in
          which such recipients are located but it is likely that such countries
          will include the Philippines, India, and Nepal.
        </p>
        <p>
          From time to time, we will use your contact details to send you direct
          marketing communications including offers, updates and newsletters
          that are relevant to the services we provide. We may do so by mail or
          electronically unless you tell us that you do not wish to receive
          electronic communications.
        </p>
        <ul className="list-disc list-inside">
          <li>
            You can unsubscribe/opt-out by notifying us and we will no longer
            send information to you.
          </li>
        </ul>
        <p>
          The information we collect and hold about you is in compliance with
          Australia&apos;s privacy and credit reporting laws, only for the
          purposes listed in this Consent and is not disclosed to any other
          person except with your permission or as permitted, or required, by
          law.
        </p>
      </>
    ),
  },
  {
    id: "check",
    question:
      "How can you check, update or change the information we are holding?",
    answer: (
      <>
        <p>
          Upon receipt of your written request and enough information to allow
          us to identify the information, we will disclose to you the personal
          information we hold about you. We will also correct or delete any
          information on request that we agree is inaccurate.
        </p>
        <p>
          If you wish to access or correct your personal information please
          write to Michael Traikos at{" "}
          <a
            href="mailto:michael@traikosfinance.com"
            className="underline hover:opacity-70 transition-opacity"
          >
            michael@traikosfinance.com
          </a>
          .
        </p>
        <p>
          We do not charge for receiving a request for access to personal
          information or for complying with a correction request.
        </p>
      </>
    ),
  },
];

// ─── Static content sections ──────────────────────────────────────────────────
const STATIC_SECTIONS = [
  {
    id: "consent",
    heading: "YOUR CONSENT",
    content: (
      <p>
        By asking us to assist with your credit needs, you consent to the
        collection and use of the information you have provided to us for the
        purposes described above.
      </p>
    ),
  },
  {
    id: "think",
    heading: "TELL US WHAT YOU THINK",
    content: (
      <p>
        We welcome your questions and comments about privacy. If you have any
        concerns or complaints, Michael Traikos at{" "}
        <a
          href="mailto:michael@traikosfinance.com"
          className="underline hover:opacity-70 transition-opacity"
        >
          michael@traikosfinance.com
        </a>
        .
      </p>
    ),
  },
  {
    id: "dispute",
    heading: "INTERNAL DISPUTE RESOLUTION",
    content: (
      <>
        <p>
          If you do have a complaint, please let us know by email, because if we
          don&apos;t know about it we can&apos;t fix it. You may also contact us
          by email addressed to: The Complaints Officer at Traikos Finance is
          Michael Traikos at{" "}
          <a
            href="mailto:michael@traikosfinance.com"
            className="underline hover:opacity-70 transition-opacity"
          >
            michael@traikosfinance.com
          </a>
          , please make sure you include as much information as you can.
        </p>
        <p>
          You should explain the details of your complaint as clearly as you
          can. Ideally, this should be in writing, however you can lodge your
          complaint via telephone, in person or online. When we receive a
          complaint, we will attempt to resolve it promptly.
        </p>
      </>
    ),
  },
];

// ─── Accordion item component ─────────────────────────────────────────────────
function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-t border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${item.id}`}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="text-sm text-[#1a5276] font-medium leading-snug">
          {item.question}
        </span>
        <span
          className="shrink-0 w-6 h-6 border border-gray-400 flex items-center justify-center text-gray-500 text-sm select-none"
          aria-hidden="true"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div
          id={`accordion-body-${item.id}`}
          className="pb-6 text-sm text-gray-600 leading-relaxed flex flex-col gap-3"
        >
          {item.answer}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PrivacyPage() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Traikos Finance Privacy Policy — how we collect, hold, and protect your personal information."
        canonical="https://traikosfinance.com.au/privacy"
      />

      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">

        {/* ── Content wrapper ───────────────────────────────────────────────── */}
        <div className="flex-1 bg-white">

        {/* ── Intro section ─────────────────────────────────────────────────── */}
        <div className="w-[90%] md:w-[75%] mx-auto">
          <div className=" py-14 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
            <h1 className="text-sm font-bold tracking-[0.22em] uppercase text-black! leading-snug">
              PRIVACY POLICY
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed">
              At <strong>Traikos Finance</strong>, we are committed to
              protecting your privacy in accordance with the Privacy Act 1988
              (Cth). This Privacy Policy describes our current policies and
              practices in relation to the handling and use of personal
              information.
            </p>
          </div>
        </div>

        {/* ── Accordion section ─────────────────────────────────────────────── */}
        <div className="w-[90%] md:w-[75%] mx-auto pb-14">
          {ACCORDION_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
          <div className="border-t border-gray-200" aria-hidden="true" />
        </div>

        {/* ── Static sections ───────────────────────────────────────────────── */}
        {STATIC_SECTIONS.map((section, i) => (
          <div key={section.id} className="w-[90%] md:w-[75%] mx-auto">
            <div
              className={`${i !== 0 ? "border-t border-gray-200" : ""} py-14 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10`}
            >
              <h2 className="text-sm font-bold tracking-[0.22em] uppercase text-black! leading-snug">
                {section.heading}
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed flex flex-col gap-4">
                {section.content}
              </div>
            </div>
          </div>
        ))}

        </div>{/* end content wrapper */}

        {/* ── CTA bar ───────────────────────────────────────────────────────── */}
        <div className="bg-[#eaeaea]">
          <div className="w-[90%] md:w-[75%] mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-black text-sm leading-relaxed">
              Are you interested to book a free consultation or have any other inquiries?
            </p>
            <Link
              to="/contact"
              className="shrink-0 bg-black text-white text-xs font-bold tracking-[0.18em] uppercase px-7 py-3 hover:bg-white/85 transition-colors"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

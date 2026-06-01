import { useState } from 'react';
import SEO from '../../../components/SEO';
import contactImg from '../../../assets/contact/contact.webp';

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function RateMyAgentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const CONTACT_ITEMS = [
  {
    icon: <PhoneIcon />,
    label: 'PHONE NUMBER',
    value: '0413 657 314',
    href: 'tel:0413657314',
  },
  {
    icon: <EmailIcon />,
    label: 'EMAIL US',
    value: 'michael@traikosfinance.com',
    href: 'mailto:michael@traikosfinance.com',
  },
  {
    icon: <MapPinIcon />,
    label: 'ADDRESS',
    value: 'Templestowe, Vic 3106',
    href: null,
  },
];

const SOCIALS = [
  { icon: <FacebookIcon />, label: 'Facebook', href: 'https://facebook.com' },
  { icon: <InstagramIcon />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <RateMyAgentIcon />, label: 'RateMyAgent', href: 'https://ratemyagent.com.au' },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to backend / email service
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Contact | Traikos Finance"
        description="Get in touch with Traikos Finance. Call, email, or send us a message and we'll get back to you."
        canonical="https://example.com/contact"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative h-[74vh] min-h-64 overflow-hidden">
        <img
          src={contactImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white font-black uppercase tracking-widest"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            Contact
          </h1>
        </div>
      </section>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main id="main-content" tabIndex={-1} className="bg-black flex-1">
        <div className="w-[90%] md:w-[75%] mx-auto py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left — info */}
          <div className="flex-1 flex flex-col gap-8">
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              We'd love to hear from you! Whether you have questions about our services,
              need expert advice, or want to discuss your financial goals, don't hesitate
              to reach out. Contact us today, and let's start your journey together!
            </p>

            {/* Contact details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-widest text-white/50 uppercase mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/80">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <hr className="border-white/10" />

            {/* Follow us */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-black uppercase tracking-widest text-white/70">
                Follow Us
              </p>
              <div className="flex gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form card */}
          <div className="w-full lg:w-150 shrink-0 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-white font-black uppercase tracking-wider text-center mb-8"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)' }}>
              Get In Touch With Us
            </h2>

            {submitted ? (
              <div className="text-center py-10">
                <p className="text-white font-semibold text-lg mb-2">Thank you!</p>
                <p className="text-white/60 text-sm">We'll be in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30 resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold text-sm py-4 rounded-lg transition-colors duration-200 uppercase tracking-wider"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

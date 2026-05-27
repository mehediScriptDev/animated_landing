import SEO from '../components/SEO';
import { useGsapFadeIn } from '../hooks/useGsapFadeIn';

export default function ContactPage() {
  const formRef = useGsapFadeIn({ duration: 0.7, delay: 0.1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with the MyApp team."
        canonical="https://example.com/contact"
      />

      <main id="main-content" tabIndex={-1} className="flex-1 px-4 py-16">
        <section
          ref={formRef}
          aria-labelledby="contact-heading"
          className="max-w-lg mx-auto"
        >
          <h1
            id="contact-heading"
            className="text-4xl font-bold text-[var(--text-h)] mb-6"
          >
            Contact Us
          </h1>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
            aria-label="Contact form"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-[var(--text-h)]"
              >
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className="border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                aria-required="true"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[var(--text-h)]"
              >
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                aria-required="true"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="text-sm font-medium text-[var(--text-h)]"
              >
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Your message…"
                className="border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm resize-y focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="bg-[var(--accent)] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

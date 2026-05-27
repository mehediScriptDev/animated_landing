import SEO from '../components/SEO';
import { useGsapFadeIn } from '../hooks/useGsapFadeIn';

export default function AboutPage() {
  const contentRef = useGsapFadeIn({ duration: 0.7, delay: 0.1 });

  return (
    <>
      <SEO
        title="About"
        description="Learn more about MyApp and what we do."
        canonical="https://example.com/about"
      />

      <main id="main-content" tabIndex={-1} className="flex-1 px-4 py-16">
        <section
          ref={contentRef}
          aria-labelledby="about-heading"
          className="max-w-3xl mx-auto"
        >
          <h1
            id="about-heading"
            className="text-4xl font-bold text-[var(--text-h)] mb-6"
          >
            About Us
          </h1>
          <p className="text-[var(--text)] leading-relaxed mb-4">
            MyApp is a demo project showcasing a modern React stack with
            performance, accessibility, and SEO built in from the ground up.
          </p>
          <p className="text-[var(--text)] leading-relaxed">
            The stack: <strong>Vite</strong>, <strong>Tailwind CSS v4</strong>,{' '}
            <strong>React Router</strong>, and <strong>GSAP</strong> for
            buttery-smooth animations.
          </p>
        </section>
      </main>
    </>
  );
}

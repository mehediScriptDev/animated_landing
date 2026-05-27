import SEO from '../components/SEO';
import { useGsapFadeIn } from '../hooks/useGsapFadeIn';

export default function HomePage() {
  const heroRef = useGsapFadeIn({ duration: 0.9 });

  return (
    <>
      <SEO
        title="Home"
        description="Welcome to MyApp — fast, accessible and SEO-friendly."
        canonical="https://example.com/"
      />

      <main id="main-content" tabIndex={-1} className="flex-1 px-4 py-16">
        <section
          ref={heroRef}
          aria-labelledby="hero-heading"
          className="max-w-3xl mx-auto text-center"
        >
          <h1
            id="hero-heading"
            className="text-5xl font-bold text-[var(--text-h)] mb-6 leading-tight"
          >
            Welcome to{' '}
            <span className="text-[var(--accent)]">MyApp</span>
          </h1>
          <p className="text-lg text-[var(--text)] mb-8">
            A blazing-fast React app built with Vite, Tailwind v4, React Router,
            and GSAP animations.
          </p>
          <a
            href="/about"
            className="inline-block bg-[var(--accent)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2"
          >
            Learn More
          </a>
        </section>
        <div className="min-h-screen"></div>
        <div className="min-h-screen"></div>
        <div className="min-h-screen"></div>
        <div className="min-h-screen"></div>
        <div className="min-h-screen"></div>
        <div className="min-h-screen"></div>
      </main>
    </>
  );
}

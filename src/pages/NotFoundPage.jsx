import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist."
      />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center"
        aria-labelledby="notfound-heading"
      >
        <p
          className="text-8xl font-extrabold text-[var(--accent)] mb-4"
          aria-hidden="true"
        >
          404
        </p>
        <h1
          id="notfound-heading"
          className="text-3xl font-bold text-[var(--text-h)] mb-4"
        >
          Page Not Found
        </h1>
        <p className="text-[var(--text)] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-[var(--accent)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2"
        >
          Go Home
        </Link>
      </main>
    </>
  );
}

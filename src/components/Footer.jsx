export default function Footer({ scrolled = false }) {
  return (
    <footer
      className={`mt-auto border-t py-6 text-center text-sm transition-colors duration-700 ${
        scrolled
          ? 'border-white/10 text-white/50'
          : 'border-[var(--border)] text-[var(--text)]'
      }`}
      role="contentinfo"
    >
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
}

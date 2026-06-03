import { useState, useEffect } from 'react';

export function useScrolled(threshold = 80) {
  // Initialize with the real current scroll position so navigating to a new
  // page (which scrolls to top) starts with scrolled = false immediately,
  // rather than inheriting a stale true value from the previous page.
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > threshold
  );

  useEffect(() => {
    // Re-check on mount in case scrollTo(0,0) ran before this effect
    setScrolled(window.scrollY > threshold);

    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * SEO component — injects/updates meta tags in <head>.
 * Works with Vite + React (no SSR). For SSR use react-helmet-async.
 *
 * Props:
 *   title       — page title (appended with site name)
 *   description — meta description
 *   canonical   — canonical URL for this page
 *   ogImage     — Open Graph image URL
 */
export default function SEO({
  title = 'My App',
  description = 'A fast, accessible and SEO-friendly React application.',
  canonical = 'https://example.com/',
  ogImage = 'https://example.com/og-image.jpg',
}) {
  const siteName = 'My App';
  const fullTitle = title !== siteName ? `${title} | ${siteName}` : title;

  // Update <title>
  document.title = fullTitle;

  // Helper to upsert a <meta> tag
  const setMeta = (selector, attrKey, attrVal, content) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrKey, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Helper to upsert a <link> tag
  const setLink = (rel, href) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  setMeta('meta[name="description"]', 'name', 'description', description);
  setLink('canonical', canonical);

  // Open Graph
  setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
  setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);

  // Twitter
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

  return null;
}

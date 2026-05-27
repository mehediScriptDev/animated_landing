import { useEffect } from 'react';

const DEFAULT_TITLE = 'My App';
const SEPARATOR = ' | ';

/**
 * Dynamically updates the document title.
 * @param {string} title - Page-specific title segment.
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title
      ? `${title}${SEPARATOR}${DEFAULT_TITLE}`
      : DEFAULT_TITLE;

    return () => {
      document.title = prev;
    };
  }, [title]);
}

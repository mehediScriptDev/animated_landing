// import { useNavigate } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { overlayRef, pageRef } from './PageWipeOverlay';

// /**
//  * TransitionLink
//  * ────────────────────────────────────────────────────────────────────────────
//  * A drop-in replacement for React Router's <Link> that wraps every route
//  * change in a GPU-accelerated, two-phase "page wipe" (curtain) animation.
//  *
//  * ─── Animation Timeline ──────────────────────────────────────────────────────
//  *
//  *  Phase 1 — WIPE IN   (origin: left)
//  *    scaleX: 0 → 1  |  duration: 0.45 s  |  ease: power2.inOut
//  *    The curtain slides in from the left edge until it covers the full screen.
//  *    `onComplete` → navigate(to) fires here. React swaps the page DOM under
//  *    the opaque overlay — the user sees nothing but the solid curtain color.
//  *
//  *  Phase 2 — WIPE OUT  (origin: right)
//  *    transformOrigin switches to 'right center' so the curtain now retreats
//  *    toward the right edge rather than collapsing back to the left.
//  *    scaleX: 1 → 0  |  duration: 0.45 s  |  ease: power2.inOut
//  *    The fresh page is revealed as the curtain slides away.
//  *
//  * ─── GPU Performance ─────────────────────────────────────────────────────────
//  *    Only `transform: scaleX()` is animated — a compositor-only property.
//  *    No width, left, or clip-path changes → zero layout reflows, zero paint
//  *    layers, guaranteed 60 fps even on mid-range mobile devices.
//  *
//  * ─── Accessibility ───────────────────────────────────────────────────────────
//  *    `prefers-reduced-motion` is respected: when the user has enabled this OS
//  *    setting the animation is skipped entirely and navigation is instant.
//  *
//  * @param {string}    to          Destination route path (e.g. '/about').
//  * @param {string}   [wipeColor='#000000']  Curtain background color.
//  * @param {string}   [className]  Tailwind / CSS classes forwarded to the <a>.
//  * @param {Function} [onClick]    Optional extra side-effect (e.g. close a menu).
//  * @param {ReactNode} children    Link label / content.
//  */
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { pageRef, overlayRef, lenisRef } from './PageWipeOverlay';

export default function TransitionLink({
  to,
  children,
  className = '',
  onClick,
  ...rest
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        document.documentElement.style.scrollBehavior = '';
      }
      navigate(to);
      return;
    }

    const page = pageRef.current;
    if (!page) { navigate(to); return; }

    // Block pointer events during transition
    const overlay = overlayRef.current;
    if (overlay) overlay.style.pointerEvents = 'auto';

    const vw = window.innerWidth;
    const scrollY = window.scrollY;
    const DURATION = 1.5;
    const EASE = 'power2.inOut';

    // ── Step 1: Clone the current page content and pin it fixed ──────────
    // This "snapshot" represents the OLD page during the transition.
    // It stays visible while the real page wrapper gets swapped by React.
    const snapshot = page.cloneNode(true);
    Object.assign(snapshot.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: `${vw}px`,
      height: '100vh',
      overflow: 'hidden',
      zIndex: '9998',
      pointerEvents: 'none',
      margin: '0',
      padding: '0',
    });

    // Offset the clone so the currently visible portion of the page
    // (not the top) is what shows inside the fixed snapshot.
    // This way scrollTo(0,0) happens completely invisibly underneath.
    snapshot.children[0] && (snapshot.children[0].style.marginTop = `-${scrollY}px`);

    // Dark overlay that sits on top of the snapshot and fades in as it slides
    const dimmer = document.createElement('div');
    Object.assign(dimmer.style, {
      position: 'absolute',
      inset: '0',
      background: '#000',
      opacity: '0',
      zIndex: '1',
      pointerEvents: 'none',
    });
    snapshot.appendChild(dimmer);
    document.body.appendChild(snapshot);

    // Prevent horizontal scroll bar and smooth scrolling during slide
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.scrollBehavior = 'auto';

    // ── Step 2: Move real page wrapper off-screen RIGHT immediately ───────
    // New content will render here (invisible to user until animation brings it in)
    gsap.set(page, { x: vw });

    // ── Step 3: Navigate — React renders new route content inside `page` ──
    // Since `page` is at x: vw, new content is off-screen. User sees snapshot.
    // Scroll to top so the new page always starts from the beginning.
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    navigate(to);

    // ── Step 4: Animate both simultaneously ───────────────────────────────
    //  snapshot (old page) → slides OUT to the left
    //  page wrapper (new page) → slides IN from the right
    gsap.to(snapshot, {
      x: -vw,
      duration: DURATION,
      ease: EASE,
      onComplete: () => snapshot.remove(),
    });

    // Dimmer starts fading in after the slide is ~20% through
    gsap.to(dimmer, {
      opacity: 1,
      duration: DURATION * 0.8,
      delay: DURATION * 0.2,
      ease: 'power1.in',
    });

    gsap.to(page, {
      x: 0,
      duration: DURATION,
      ease: EASE,
      onComplete: () => {
        gsap.set(page, { clearProps: 'transform' });
        document.documentElement.style.overflowX = '';
        document.body.style.overflowX = '';
        document.documentElement.style.scrollBehavior = '';
        lenisRef.current?.resize();
        if (overlay) overlay.style.pointerEvents = 'none';
      },
    });
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
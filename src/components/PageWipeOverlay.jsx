/**
 * PageWipeOverlay
 * ────────────────────────────────────────────────────────────────────────────
 * A single, fixed-position "curtain" div that covers the entire viewport
 * during page wipe transitions.
 *
 * WHY it lives here (not inside a route component):
 *   It must never be unmounted while a transition is in flight.  Placing it
 *   in RootLayout — above the <Outlet> — guarantees it persists across every
 *   route change.  GSAP can therefore drive the full two-phase timeline
 *   (wipe-in → navigate → wipe-out) without the animation target disappearing
 *   mid-flight.
 *
 * HOW it is shared with TransitionLink:
 *   A module-level singleton object (`overlayRef`) holds the DOM reference.
 *   This avoids React Context overhead and prop drilling — TransitionLink
 *   simply imports `overlayRef` and reads `.current`.
 */


export const overlayRef = { current: null };
export const pageRef   = { current: null };
export const lenisRef  = { current: null };

export default function PageWipeOverlay() {
  return (
    <div
      ref={(el) => { overlayRef.current = el; }}
      aria-hidden="true"
      style={{
        // Start off-screen to the right. translateX slides the panel as a solid
        // block — no stretching, no squishing. Pure compositor animation.
        transform: 'translateX(100%)',
        pointerEvents: 'none',
      }}
      className="fixed inset-0 z-9999"
    />
  );
}
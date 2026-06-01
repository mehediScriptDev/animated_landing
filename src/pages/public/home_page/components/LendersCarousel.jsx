import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import bendigoImg    from '@/assets/leading_lenders/bendigo.webp';
import commoImg      from '@/assets/leading_lenders/commo.webp';
import connectiveImg from '@/assets/leading_lenders/connective.webp';
import depositImg    from '@/assets/leading_lenders/Deposit.webp';
import pepperImg     from '@/assets/leading_lenders/pepeer.webp';
import suncorpImg    from '@/assets/leading_lenders/Suncorp.webp';
import teacherImg    from '@/assets/leading_lenders/teacher.webp';
import ubankImg      from '@/assets/leading_lenders/ubank.webp';

const LENDERS = [
  { id: 0, name: 'Bendigo Bank',          img: bendigoImg },
  { id: 1, name: 'Commonwealth Bank',     img: commoImg },
  { id: 2, name: 'Connective Home Loans', img: connectiveImg },
  { id: 3, name: 'Deposit Assure',        img: depositImg },
  { id: 4, name: 'Pepper Money',          img: pepperImg },
  { id: 5, name: 'Suncorp Bank',          img: suncorpImg },
  { id: 6, name: 'Teachers Mutual Bank',  img: teacherImg },
  { id: 7, name: 'ubank',                 img: ubankImg },
];

// Duplicate for seamless loop
const ITEMS = [...LENDERS, ...LENDERS];

export default function LendersCarousel() {
  const trackRef   = useRef(null);
  const tweenRef   = useRef(null);
  const dragRef    = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of one full set of cards
    const totalWidth = track.scrollWidth / 2;

    // Auto-scroll tween (infinite)
    tweenRef.current = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 70,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x) % totalWidth;
          return `${val}px`;
        },
      },
    });

    // ---- Drag support ----
    const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const onDown = (e) => {
      dragRef.current.dragging  = true;
      dragRef.current.startX    = getClientX(e);
      dragRef.current.scrollX   = gsap.getProperty(track, 'x');
      tweenRef.current.pause();
      track.style.cursor = 'grabbing';
    };

    const onMove = (e) => {
      if (!dragRef.current.dragging) return;
      const dx = getClientX(e) - dragRef.current.startX;
      let newX = dragRef.current.scrollX + dx;
      // keep within modulus bounds
      newX = ((newX % totalWidth) + totalWidth) % totalWidth - totalWidth;
      gsap.set(track, { x: newX });
    };

    const onUp = () => {
      if (!dragRef.current.dragging) return;
      dragRef.current.dragging = false;
      track.style.cursor = 'grab';
      // Resume auto-scroll from current position
      const currentX = gsap.getProperty(track, 'x');
      gsap.killTweensOf(track);
      tweenRef.current = gsap.to(track, {
        x: `${parseFloat(currentX) - totalWidth}`,
        duration: 30 * (Math.abs(parseFloat(currentX)) / totalWidth || 1),
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x) => {
            const val = parseFloat(x) % totalWidth;
            return `${val}px`;
          },
        },
      });
    };

    track.addEventListener('mousedown',  onDown);
    track.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchend',  onUp);

    return () => {
      tweenRef.current?.kill();
      track.removeEventListener('mousedown',  onDown);
      track.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchend',  onUp);
    };
  }, []);

  return (
    <section aria-label="Leading lenders" className="relative z-10 py-16 w-[90%] md:w-[75%] mx-auto">
      <p className="text-center text-white text-xs md:text-xl font-semibold tracking-[0.25em] uppercase opacity-70 mb-8 px-4" style={{ marginBottom: '20px' }}>
        Access to competitive rates from leading lenders
      </p>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ width: 'max-content', cursor: 'grab' }}
        >
        {ITEMS.map((lender, i) => (
          <div
            key={i}
            aria-label={lender.name}
            className="shrink-0 bg-white rounded flex items-center justify-center "
            style={{ width: '320px', height: '200px', padding: '16px 24px' }}
          >
            <img
              src={lender.img}
              alt={lender.name}
              className="max-w-full max-h-full object-contain"
              draggable="false"
            />
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

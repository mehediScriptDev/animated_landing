import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import ampImg from '@/assets/leading_lenders/amp.png';
import anzImg from '@/assets/leading_lenders/anz.jpg';
import auswidebankImg from '@/assets/leading_lenders/auswidebank.png';
import bankImg from '@/assets/leading_lenders/bank.png';
import bankofImg from '@/assets/leading_lenders/bankof.png';
import banksaImg from '@/assets/leading_lenders/banksa.png';
import bankwestImg from '@/assets/leading_lenders/bankwest.png';
import bluestoneImg from '@/assets/leading_lenders/bluestone.jpg';
import depositpowerImg from '@/assets/leading_lenders/depositpower.png';
import firstmateImg from '@/assets/leading_lenders/firstmate.webp';
import graniteImg from '@/assets/leading_lenders/granite.png';
import heritageImg from '@/assets/leading_lenders/heritage.png';
import inglogoImg from '@/assets/leading_lenders/inglogo.jpg';
import latrobeImg from '@/assets/leading_lenders/latrobe.jpg';
import macquarieImg from '@/assets/leading_lenders/macquarie.png';
import militarybankImg from '@/assets/leading_lenders/militarybank.jpg';
import nabImg from '@/assets/leading_lenders/nab.svg';
import ordeeImg from '@/assets/leading_lenders/ordee.png';
import ownhomeImg from '@/assets/leading_lenders/ownhome.png';
import paramountImg from '@/assets/leading_lenders/paramount.jpg';
import peppermoneyImg from '@/assets/leading_lenders/peppermoney.png';
import redzedImg from '@/assets/leading_lenders/redzed.png';
import resimacImg from '@/assets/leading_lenders/resimac.png';
import suncropImg from '@/assets/leading_lenders/suncrop.png';
import teachersImg from '@/assets/leading_lenders/teachers.png';
import thinktankImg from '@/assets/leading_lenders/thinktank.png';
import ubankImg from '@/assets/leading_lenders/ubank.png';
import westpacImg from '@/assets/leading_lenders/westpac.webp';

const LENDERS = [
  { id: 0, name: 'AMP', img: ampImg },
  { id: 1, name: 'ANZ', img: anzImg },
  { id: 2, name: 'Auswide Bank', img: auswidebankImg },
  { id: 3, name: 'Bank', img: bankImg },
  { id: 4, name: 'Bank of', img: bankofImg },
  { id: 5, name: 'BankSA', img: banksaImg },
  { id: 6, name: 'Bankwest', img: bankwestImg },
  { id: 7, name: 'Bluestone', img: bluestoneImg },
  { id: 8, name: 'Deposit Power', img: depositpowerImg },
  { id: 9, name: 'FirstMate', img: firstmateImg },
  { id: 10, name: 'Granite', img: graniteImg },
  { id: 11, name: 'Heritage', img: heritageImg },
  { id: 12, name: 'ING', img: inglogoImg },
  { id: 13, name: 'La Trobe', img: latrobeImg },
  { id: 14, name: 'Macquarie', img: macquarieImg },
  { id: 15, name: 'Military Bank', img: militarybankImg },
  { id: 16, name: 'NAB', img: nabImg },
  { id: 17, name: 'Ordee', img: ordeeImg },
  { id: 18, name: 'Own Home', img: ownhomeImg },
  { id: 19, name: 'Paramount', img: paramountImg },
  { id: 20, name: 'Pepper Money', img: peppermoneyImg },
  { id: 21, name: 'RedZed', img: redzedImg },
  { id: 22, name: 'Resimac', img: resimacImg },
  { id: 23, name: 'Suncrop', img: suncropImg },
  { id: 24, name: 'Teachers', img: teachersImg },
  { id: 25, name: 'Think Tank', img: thinktankImg },
  { id: 26, name: 'ubank', img: ubankImg },
  { id: 27, name: 'Westpac', img: westpacImg },
];

// Duplicate for seamless loop
const ITEMS = [...LENDERS, ...LENDERS];
const AUTO_SCROLL_DURATION = 120;

export default function LendersCarousel() {
  const trackRef   = useRef(null);
  const tweenRef   = useRef(null);
  const isHoveringRef = useRef(false);
  const dragRef    = useRef({ dragging: false, startX: 0, scrollLeft: 0, stoppedByTouch: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of one full set of cards
    const totalWidth = track.scrollWidth / 2;

    const createAutoplayTween = (toX) => gsap.to(track, {
      x: toX,
      duration: AUTO_SCROLL_DURATION,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x) % totalWidth;
          return `${val}px`;
        },
      },
    });

    // Auto-scroll tween (infinite)
    tweenRef.current = createAutoplayTween(`-=${totalWidth}`);

    // ---- Drag support ----
    const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const pauseAutoplay = () => {
      tweenRef.current?.pause();
    };

    const resumeAutoplay = () => {
      if (dragRef.current.dragging || dragRef.current.stoppedByTouch) return;
      const currentX = parseFloat(gsap.getProperty(track, 'x')) || 0;
      tweenRef.current?.kill();
      gsap.killTweensOf(track);
      tweenRef.current = createAutoplayTween(`${currentX - totalWidth}`);
    };

    const onMouseEnter = () => {
      isHoveringRef.current = true;
      pauseAutoplay();
    };

    const onMouseLeave = () => {
      isHoveringRef.current = false;
      resumeAutoplay();
    };

    const onDown = (e) => {
      const isTouch = e.type.startsWith('touch');
      dragRef.current.dragging  = true;
      dragRef.current.startX    = getClientX(e);
      dragRef.current.scrollX   = gsap.getProperty(track, 'x');
      if (isTouch) dragRef.current.stoppedByTouch = true;
      pauseAutoplay();
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

      // Resume after drag only if cursor is not hovering and interaction was not touch.
      if (!isHoveringRef.current && !dragRef.current.stoppedByTouch) {
        resumeAutoplay();
      }
    };

    track.addEventListener('mouseenter', onMouseEnter);
    track.addEventListener('mouseleave', onMouseLeave);
    track.addEventListener('mousedown',  onDown);
    track.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchend',  onUp);

    return () => {
      tweenRef.current?.kill();
      track.removeEventListener('mouseenter', onMouseEnter);
      track.removeEventListener('mouseleave', onMouseLeave);
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

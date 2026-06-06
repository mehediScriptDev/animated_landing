import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// import ampImg from '@/assets/leading_lenders/amp.png';
// import anzImg from '@/assets/leading_lenders/anz.jpg';
// import auswidebankImg from '@/assets/leading_lenders/auswidebank.png';
// import bankImg from '@/assets/leading_lenders/bank.png';
// import bankofImg from '@/assets/leading_lenders/bankof.png';
// import banksaImg from '@/assets/leading_lenders/banksa.png';
// import bankwestImg from '@/assets/leading_lenders/bankwest.png';
// import bluestoneImg from '@/assets/leading_lenders/bluestone.jpg';
// import depositpowerImg from '@/assets/leading_lenders/depositpower.png';
// import firstmateImg from '@/assets/leading_lenders/firstmate.webp';
// import graniteImg from '@/assets/leading_lenders/granite.png';
// import heritageImg from '@/assets/leading_lenders/heritage.png';
// import inglogoImg from '@/assets/leading_lenders/inglogo.jpg';
// import latrobeImg from '@/assets/leading_lenders/latrobe.jpg';
// import macquarieImg from '@/assets/leading_lenders/macquarie.png';
// import militarybankImg from '@/assets/leading_lenders/militarybank.jpg';
// import nabImg from '@/assets/leading_lenders/nab.svg';
// import ordeeImg from '@/assets/leading_lenders/ordee.png';
// import ownhomeImg from '@/assets/leading_lenders/ownhome.png';
// import paramountImg from '@/assets/leading_lenders/paramount.jpg';
// import peppermoneyImg from '@/assets/leading_lenders/peppermoney.png';
// import redzedImg from '@/assets/leading_lenders/redzed.png';
// import resimacImg from '@/assets/leading_lenders/resimac.png';
// import suncropImg from '@/assets/leading_lenders/suncrop.png';
// import teachersImg from '@/assets/leading_lenders/teachers.png';
// import thinktankImg from '@/assets/leading_lenders/thinktank.png';
// import ubankImg from '@/assets/leading_lenders/ubank.png';
// import westpacImg from '@/assets/leading_lenders/westpac.webp';

const clientLogoModules = import.meta.glob('/src/assets/leading_lenders/clients/*.{png,jpg,jpeg,webp,svg}', { eager: true });
const LENDERS = Object.entries(clientLogoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, module], index) => {
    const filename = path.split('/').pop() || '';
    const name = filename.replace(/\.[^/.]+$/, '');

    return {
      id: index,
      name,
      img: module.default,
    };
  });

// Duplicate for seamless loop
const ITEMS = [...LENDERS, ...LENDERS];
const AUTO_SCROLL_DURATION = 120;

export default function LendersCarousel() {
  const trackRef   = useRef(null);
  const tweenRef   = useRef(null);

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

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <section aria-label="Leading lenders" className="relative z-10 py-16 w-[90%] md:w-[75%] mx-auto">
      <p className="text-center text-white text-xs md:text-xl font-semibold tracking-[0.25em] uppercase opacity-70 mb-8 px-4" style={{ marginBottom: '20px' }}>
        Access to competitive rates from leading lenders
      </p>

      <div className="overflow-hidden pointer-events-none select-none">
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ width: 'max-content' }}
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

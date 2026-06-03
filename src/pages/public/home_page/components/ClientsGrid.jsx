import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import motivImg from '@/assets/grid_image/firsthome.png';
import acImg from '@/assets/simple.png';
import nesteaImg from '@/assets/grid_image/refinancing.png';
import espnImg from '@/assets/grid_image/nexthome.png';
import lafcImg from '@/assets/grid_image/loans.png';
import foxImg from '@/assets/grid_image/construction.png';

const CLIENTS = [
  {
    id: 0,
    name: 'FIRST HOME',
    sub: 'loans',
    pageColor: '#2B2E2E',
    imgStyle: { backgroundImage: `url(${motivImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 1,
    name: 'NEXT HOME',
    sub: 'loans',
    pageColor: '#BFBDB2',
    imgStyle: { backgroundImage: `url(${espnImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 2,
    name: 'INVESTMENT',
    sub: 'loans',
    pageColor: '#069EDA',
    imgStyle: { backgroundImage: `url(${acImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 3,
    name: 'CONSTRUCTION',
    sub: 'loans',
    pageColor: '#941608',
    imgStyle: { backgroundImage: `url(${foxImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 4,
    name: 'SMSF',
    sub: 'loans',
    pageColor: '#000000',
    imgStyle: { backgroundImage: `url(${lafcImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 5,
    name: 'REFINANCING',
    sub: 'loans',
    pageColor: '#E6E147',
    imgStyle: { backgroundImage: `url(${nesteaImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
];

function ClientCard({ client, index, onEnter, onLeave, isActive, onToggle }) {
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const loopRef = useRef(null);
  const articleRef = useRef(null);
  const wasActiveRef = useRef(isActive);

  useEffect(() => () => {
    if (loopRef.current) loopRef.current.kill();
  }, []);

  const startLoop = useCallback(() => {
    if (loopRef.current) {
      loopRef.current.kill();
      loopRef.current = null;
    }
    if (!textRef.current || !imgRef.current) return;

    const chars = Array.from(textRef.current.querySelectorAll('.char'));
    const tl = gsap.timeline();

    tl.to(chars, {
      x: '-12px',
      opacity: 0,
      duration: 0.22,
      stagger: { each: 0.02, from: 'end' },
      ease: 'power2.in',
    })
      .to(imgRef.current, { opacity: 1, duration: 0.22, ease: 'power1.out' }, '<0')
      .fromTo(
        chars,
        { x: '12px', opacity: 0 },
        { x: '0px', opacity: 1, duration: 0.3, stagger: { each: 0.02, from: 'start' }, ease: 'power2.out' },
      );

    loopRef.current = tl;
  }, []);

  const stopLoop = useCallback(() => {
    if (loopRef.current) {
      loopRef.current.kill();
      loopRef.current = null;
    }
    if (!textRef.current || !imgRef.current) return;

    const chars = Array.from(textRef.current.querySelectorAll('.char'));
    gsap.killTweensOf([...chars, imgRef.current]);

    gsap.to(imgRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' });
    gsap.to(chars, { opacity: 1, x: 0, duration: 0.15, stagger: { each: 0.03, from: 'start' } });
  }, []);

  useEffect(() => {
    if (wasActiveRef.current === isActive) return;
    wasActiveRef.current = isActive;

    if (isActive) startLoop();
    else stopLoop();
  }, [isActive, startLoop, stopLoop]);

  const handleEnter = useCallback((e) => {
    if (e.pointerType !== 'mouse') return;
    if (isActive) return;
    startLoop();
    onEnter(client.pageColor);
  }, [isActive, startLoop, onEnter, client.pageColor]);

  const handleLeave = useCallback((e) => {
    if (e.pointerType !== 'mouse') return;
    if (isActive) return;
    stopLoop();
    onLeave();
  }, [isActive, stopLoop, onLeave]);

  const handleClick = useCallback(() => {
    onToggle(client.id, client.pageColor);
  }, [onToggle, client.id, client.pageColor]);

  return (
    <article
      ref={articleRef}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onClick={handleClick}
      aria-label={client.sub ? `${client.name} ${client.sub}` : client.name}
      className={`relative overflow-hidden client-card cursor-pointer select-none${index > 0 ? ' client-card-reveal' : ''}`}
      style={{ aspectRatio: '8 / 8', zIndex: 51 }}
    >
      <div
        ref={imgRef}
        className="absolute inset-0 opacity-0"
        style={client.imgStyle}
        aria-hidden="true"
      />

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 md:px-10"
      >
        <span className="text-white font-light tracking-[0.14em] sm:tracking-[0.22em] uppercase text-center whitespace-nowrap leading-none text-[clamp(0.52rem,1.25vw,1.6rem)] max-w-full">
          {client.name.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </span>
        {client.sub && (
          <span className="mt-1 text-white/40 tracking-[0.18em] sm:tracking-[0.25em] uppercase whitespace-nowrap leading-none text-[clamp(0.38rem,0.85vw,0.82rem)] max-w-full">
            {client.sub.split('').map((char, i) => (
              <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </span>
        )}
      </div>
    </article>
  );
}

export default function ClientsGrid() {
  const [activeCardId, setActiveCardId] = useState(null);

  const handleEnter = useCallback((color) => {
    gsap.to(document.getElementById('page-overlay'), {
      backgroundColor: color,
      duration: 0.45,
      ease: 'power2.out',
    });
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(document.getElementById('page-overlay'), {
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 0.45,
      ease: 'power2.out',
    });
  }, []);

  const handleToggle = useCallback((id, color) => {
    if (activeCardId === id) {
      setActiveCardId(null);
      handleLeave();
      return;
    }

    setActiveCardId(id);
    handleEnter(color);
  }, [activeCardId, handleEnter, handleLeave]);

  return (
    <section aria-label="Client portfolio" className="relative clients-section pt-0.5 pb-25">
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 w-[90%] md:w-[75%] md:gap-8 mx-auto clients-grid"
        style={{ marginTop: '-100px' }}
      >
        {CLIENTS.map((client, i) => (
          <ClientCard
            key={client.id}
            client={client}
            index={i}
            onEnter={handleEnter}
            onLeave={handleLeave}
            isActive={activeCardId === client.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
}

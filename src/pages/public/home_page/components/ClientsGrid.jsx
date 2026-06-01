import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import motivImg  from '@/assets/grid_image/motiv.webp';
import acImg     from '@/assets/grid_image/ac.webp';
import nesteaImg from '@/assets/grid_image/nestea.webp';
import espnImg   from '@/assets/grid_image/espn.webp';
import lafcImg   from '@/assets/grid_image/lafc.webp';
import foxImg    from '@/assets/grid_image/fox.webp';

const CLIENTS = [
  {
    id: 0,
    name: 'MOTIV',
    pageColor: '#2B2E2E',
    imgStyle: { backgroundImage: `url(${motivImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 1,
    name: 'AC Hotels',
    sub: 'Marriott',
    pageColor: '#BFBDB2',
    imgStyle: { backgroundImage: `url(${acImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 2,
    name: 'Nestea',
    pageColor: '#069EDA',
    imgStyle: { backgroundImage: `url(${nesteaImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 3,
    name: 'ESPN',
    pageColor: '#941608',
    imgStyle: { backgroundImage: `url(${espnImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 4,
    name: 'LA Football Club',
    pageColor: '#000000',
    imgStyle: { backgroundImage: `url(${lafcImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 5,
    name: 'FOX',
    pageColor: '#E6E147',
    imgStyle: { backgroundImage: `url(${foxImg})`, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
];

function ClientCard({ client, index, onEnter, onLeave }) {
  const textRef   = useRef(null);
  const imgRef     = useRef(null);
  const loopRef    = useRef(null);
  const articleRef = useRef(null);

  useEffect(() => () => { if (loopRef.current) loopRef.current.kill(); }, []);

  const startLoop = useCallback(() => {
    if (loopRef.current) loopRef.current.kill();

    const chars = textRef.current
      ? Array.from(textRef.current.querySelectorAll('.char'))
      : [];

    const tl = gsap.timeline({ repeat: -1 });
    // Typewriter erase: chars disappear right → left
    tl.to(chars, {
        opacity: 0,
        duration: 0.03,
        stagger: { each: 0.04, from: 'end' },
        ease: 'none',
      })
      // Image fades in after text erased
      .to(imgRef.current, { opacity: 1, duration: 0.4, ease: 'power1.out' }, '<0.1')
      .to({}, { duration: 1 })
      // Typewriter type: chars appear left → right WHILE image is still showing
      .to(chars, {
        opacity: 1,
        duration: 0.03,
        stagger: { each: 0.04, from: 'start' },
        ease: 'none',
      })
      // Image fades out AFTER text is fully typed back
      .to(imgRef.current, { opacity: 0, duration: 0.5, ease: 'power1.in' })
      .to({}, { duration: 0.5 });

    loopRef.current = tl;
  }, []);

  const stopLoop = useCallback(() => {
    if (loopRef.current) { loopRef.current.kill(); loopRef.current = null; }
    if (!textRef.current || !imgRef.current) return;
    const chars = Array.from(textRef.current.querySelectorAll('.char'));
    gsap.killTweensOf([...chars, imgRef.current]);
    gsap.to(imgRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(chars, { opacity: 1, duration: 0.15, stagger: { each: 0.03, from: 'start' } });
  }, []);

  const handleEnter = useCallback(() => {
    startLoop();
    onEnter(client.pageColor);
  }, [startLoop, onEnter, client.pageColor]);

  const handleLeave = useCallback(() => {
    stopLoop();
    onLeave();
  }, [stopLoop, onLeave]);

  return (
    <article
      ref={articleRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={client.sub ? `${client.name} ${client.sub}` : client.name}
      className={`relative overflow-hidden client-card cursor-pointer select-none${index > 0 ? ' client-card-reveal' : ''}`}
      style={{ aspectRatio: '8 / 8', zIndex: 51 }}
    >
      {/* Image / color reveal layer */}
      <div
        ref={imgRef}
        className="absolute inset-0 opacity-0"
        style={client.imgStyle}
        aria-hidden="true"
      />

      {/* Brand name layer */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8"
      >
        <span className="text-white font-light tracking-[0.3em] uppercase text-center text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl leading-relaxed flex flex-wrap justify-center">
          {client.name.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </span>
        {client.sub && (
          <span className="text-white/40 text-[0.65rem] sm:text-sm tracking-[0.25em] uppercase flex flex-wrap justify-center">
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

  return (
    <>
      <section
        aria-label="Client portfolio"
        className="relative clients-section pt-0.5 pb-25"
      >
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 w-[90%] md:w-[75%] md:gap-8 mx-auto clients-grid"
          style={{marginTop: '-100px' }}
        >
          {CLIENTS.map((client, i) => (
            <ClientCard
              key={client.id}
              client={client}
              index={i}
              onEnter={handleEnter}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </section>
    </>
  );
}

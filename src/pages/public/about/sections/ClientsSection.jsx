import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Lender / client logos */
import bendigoImg from '../../../../assets/leading_lenders/bendigo.webp';
import commoImg from '../../../../assets/leading_lenders/commo.webp';
import connectiveImg from '../../../../assets/leading_lenders/connective.webp';
import depositImg from '../../../../assets/leading_lenders/Deposit.webp';
import pepperImg from '../../../../assets/leading_lenders/pepeer.webp';
import suncorpImg from '../../../../assets/leading_lenders/Suncorp.webp';
import teacherImg from '../../../../assets/leading_lenders/teacher.webp';
import ubankImg from '../../../../assets/leading_lenders/ubank.webp';

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  // Row 1
  { name: 'Bendigo Bank', img: bendigoImg },
  { name: 'Commonwealth Bank', img: commoImg },
  { name: 'Connective', img: connectiveImg },
  { name: 'Deposit Assure', img: depositImg },
  { name: 'Pepper Money', img: pepperImg },
  { name: 'Suncorp Bank', img: suncorpImg },
  // Row 2
  { name: 'Teachers Mutual', img: teacherImg },
  { name: 'Ubank', img: ubankImg },
  // Text-only clients (no logo image)
  { name: 'ANZ' },
  { name: 'NAB' },
  { name: 'Westpac' },
  { name: 'Macquarie' },
  // Row 3
  { name: 'ING' },
  { name: 'BOQ' },
  { name: 'St.George' },
  { name: 'AMP' },
  { name: 'Liberty' },
  { name: 'Athena' },
  // Row 4
  { name: 'La Trobe' },
  { name: 'Resimac' },
  { name: 'ME Bank' },
  { name: 'Virgin Money' },
  { name: 'HSBC' },
  { name: 'Citibank' },
];

export default function ClientsSection() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = ref.current.querySelectorAll('.client-logo');
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Clients" ref={ref} className="relative z-1 py-20 md:py-28">
      <div className="w-[90%] md:w-[75%] max-w-[1400px] mx-auto">
        {/* CLIENTS watermark heading */}
        <h2
          aria-hidden="true"
          className="font-sequel font-black italic text-transparent leading-[0.9] tracking-tighter uppercase mb-14 select-none"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            WebkitTextStroke: '2px rgba(255,255,255,0.12)',
          }}
        >
          CLIENTS
        </h2>

        {/* Logo grid — 6 columns, no borders, free-floating */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-4">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="client-logo flex items-center justify-center h-16 md:h-20 px-3 group"
            >
              {client.img ? (
                <img
                  src={client.img}
                  alt={client.name}
                  className="max-h-10 md:max-h-12 w-auto object-contain brightness-0 invert opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                />
              ) : (
                <span
                  className="font-sequel font-extrabold text-white/40 uppercase tracking-wide text-center group-hover:text-white/80 transition-colors duration-300"
                  style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)' }}
                >
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

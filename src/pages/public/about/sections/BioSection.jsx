import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  { role: 'Principal, Creative Director', company: 'Ad Victorem, 2017–' },
  { role: 'Creative Director', company: 'Azubilty, 2015–2017' },
  { role: 'Independent Creative Director', company: 'Consensus Inc., 2013–2015' },
  { role: 'Creative Director', company: 'Starmen Design Group, 2008–2014' },
  { role: 'Marketing Art Director', company: "Sotheby's Real Estate, 2006–2008" },
];

export default function BioSection({ isDark }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const els = ref.current.querySelectorAll('.bio-animate');
      gsap.fromTo(
        els,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const textColor = isDark ? 'text-white/60' : 'text-[#555]';
  const boldColor = isDark ? 'text-white' : 'text-black';
  const labelColor = isDark ? 'text-white/35' : 'text-[#999]';
  const valueColor = isDark ? 'text-white/75' : 'text-[#333]';
  const linkColor = isDark ? 'text-white/70' : 'text-[#333]';

  return (
    <section aria-label="Biography" ref={ref} className="relative z-1 py-16 md:py-20">
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">

          {/* Left — Bio text */}
          <div className="flex flex-col gap-7 w-full md:w-[50%]">
            <p className={`bio-animate font-sans text-sm md:text-base text-white/70 leading-[1.85] transition-colors duration-300 `}>
              Given that Michael grew up in Melbourne rooting for sports legends like{' '}
              <strong className={`font-sequel font-extrabold italic text-[18px] decoration-2 transition-colors duration-300 ${boldColor} ${isDark ? 'decoration-white/40' : 'decoration-black/30'}`}>
                MICHAEL JORDAN
              </strong>{' '}and{' '}
              <strong className={`font-sequel font-black italic text-[18px] decoration-2 transition-colors duration-300 ${boldColor} ${isDark ? 'decoration-white/40' : 'decoration-black/30'}`}>
                WALTER PAYTON
              </strong>{' '}that's no surprise.
            </p>

            <p className={`bio-animate font-sans text-sm md:text-base leading-[1.85] transition-colors duration-300 text-white/70`}>
              Michael brings that competitive spirit to his finance and brokerage work,
              leading to shelves full of awards, and being listed in Web Designer
              Magazine's{' '}
              <strong className={`font-sequel font-black italic text-[18px] decoration-2 transition-colors duration-300 ${boldColor} ${isDark ? 'decoration-white/40' : 'decoration-black/30'}`}>
                "HOT 100"
              </strong>{' '}list twice.
            </p>

            <p className={`bio-animate font-sans text-sm leading-[1.85] transition-colors duration-300 text-white/70`}>
              Case in point: Michael's recent work for his clients won a{' '}
              <strong className={`font-sequel font-black italic text-[18px] decoration-2 transition-colors duration-300 ${boldColor} ${isDark ? 'decoration-white/40' : 'decoration-black/30'}`}>
                WEBBY AWARD
              </strong>{' '}and helped generate the company's first thousand sales
              with almost zero advertising.
            </p>

            <p className={`bio-animate font-sans text-sm leading-[1.85] transition-colors duration-300 text-white/70`}>
              In addition to helping clients like ESPN and Netflix rise to victory
              against their competitors, Michael shares his passion with future
              finance professionals, leading creative workshops at{' '}
              <strong className={`font-sequel font-black italic text-[18px] decoration-2 transition-colors duration-300 ${boldColor} ${isDark ? 'decoration-white/40' : 'decoration-black/30'}`}>
                USC's
              </strong>{' '}Annenberg Digital Lounge, serving on the board of AIGA
              Los Angeles and as an expert panelist for the annual GlobalTrend Marketing Awards.
            </p>

            <a
              href="#"
              className={`bio-animate font-sequel font-bold text-[18px] tracking-wide uppercase underline underline-offset-4 decoration-1 transition-colors duration-300 mt-2 ${isDark ? 'text-white' : 'text-black'} hover:opacity-70`}
            >
              DOWNLOAD RESUME
            </a>
          </div>

          {/* Right — Education, Experience, Contact */}
          <div className="bio-animate flex flex-col gap-8 w-full md:w-[30%]">

            {/* Education */}
            <div className="flex flex-col gap-2.5">
              <span className={`font-heading font-semibold text-sm tracking-[0.25em] uppercase transition-colors duration-300 text-white/70`}>
                EDUCATION
              </span>
              <p className={`font-sequel font-extrabold text-sm leading-relaxed uppercase tracking-wide transition-colors duration-300 text-white`}>
                WOODBURY UNIVERSITY<br />
                BFA GRAPHIC DESIGN, 2006
              </p>
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-2.5">
              <span className={`font-heading font-semibold text-sm tracking-[0.25em] uppercase transition-colors duration-300 text-white/70`}>
                EXPERIENCE
              </span>
              {EXPERIENCE.map((exp, i) => (
                <p key={i} className={`font-sequel font-extrabold text-sm leading-relaxed uppercase tracking-wide transition-colors duration-300 mb-1 text-white`}>
                  {exp.role}<br />
                  {exp.company}
                </p>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2.5">
              <span className={`font-heading font-semibold text-sm tracking-[0.25em] uppercase transition-colors duration-300 text-white/70`}>
                CONTACT
              </span>
              <div className="flex gap-3">
                {['TW.', 'IG.', 'LN.', 'BE.', 'M.'].map((label) => (
                  <a
                    key={label}
                    href="#"
                    className={`font-sequel font-extrabold text-[13px] uppercase no-underline transition-colors duration-200 hover:opacity-60 text-white`}
                  >
                    {label}
                  </a>
                ))}
              </div>
              <a
                href="mailto:michael@traikosfinance.com"
                className={`font-sequel font-extrabold text-sm uppercase no-underline transition-colors duration-200 hover:opacity-60 mt-1 ${linkColor}`}
              >
                EMAIL.
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

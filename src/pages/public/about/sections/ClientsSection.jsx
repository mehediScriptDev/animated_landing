import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  ["Commonwealth", "Westpac", "ANZ", "NAB", "Macquarie", "Bendigo"],
  ["Suncorp", "ING", "BOQ", "St.George", "Bankwest", "AMP"],
  ["Pepper", "Liberty", "La Trobe", "Resimac", "Athena", "Ubank"],
  ["ME Bank", "Adelaide", "Auswide", "Virgin Money", "HSBC", "Citibank"],
  [
    "Deposit Assure",
    "Teachers Mutual",
    "Heritage",
    "Beyond Bank",
    "Toyota Finance",
    "Great Southern",
  ],
];

export default function ClientsSection() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = ref.current.querySelectorAll(".client-item");
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Clients" ref={ref} className="relative z-1 py-20">
      <div className="w-[90%] md:w-[75%] max-w-[1400px] mx-auto">
        {/* CLIENTS watermark */}
        <h2
          aria-hidden="true"
          className="font-sequel font-black italic text-transparent text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tighter uppercase mb-12 select-none"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}
        >
          CLIENTS
        </h2>

        {/* Logo grid */}
        {ROWS.map((row, ri) => (
          <div
            key={ri}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
          >
            {row.map((name) => (
              <div
                key={name}
                className="client-item aspect-[1.8/1] flex items-center justify-center border border-white/6 -m-px hover:bg-white/5 transition-colors duration-300"
              >
                <span className="font-heading font-semibold text-[10px] text-white/45 uppercase tracking-wide text-center px-2 hover:text-white/80 transition-colors duration-300">
                  {name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

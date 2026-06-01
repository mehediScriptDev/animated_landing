import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  {
    name: "MFAA Excellence Awards",
    category: "People's Voice",
    company: "Traikos Finance",
    year: "2024",
  },
  {
    name: "Connective Awards",
    category: "Reader's Choice",
    company: "Traikos Finance",
    year: "2023",
  },
  {
    name: "Australian Mortgage Awards",
    category: "Rising Star",
    company: "Traikos Finance",
    year: "2023",
  },
  {
    name: "Connective Elite",
    category: "Elite Status",
    company: "Traikos Finance",
    year: "2022",
  },
  {
    name: "Rate My Agent Awards",
    category: "Customer Choice",
    company: "Traikos Finance",
    year: "2022",
  },
  {
    name: "FBAA Awards",
    category: "Best New Entrant",
    company: "Traikos Finance",
    year: "2021",
  },
  {
    name: "Connective Awards",
    category: "Top Performer",
    company: "Traikos Finance",
    year: "2021",
  },
  {
    name: "Industry Recognition",
    category: "Top 100 Broker",
    company: "Traikos Finance",
    year: "2020",
  },
];

export default function AwardsSection() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const rows = ref.current.querySelectorAll(".award-row");
      gsap.fromTo(
        rows,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-label="Awards"
      ref={ref}
      className="relative z-1 py-16 md:py-20"
    >
      <div className="w-[90%] md:w-[75%] max-w-[1400px] mx-auto">
        {/* AWARDS watermark */}
        <h2
          aria-hidden="true"
          className="font-sequel font-black italic text-transparent text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tighter uppercase mb-12 select-none"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}
        >
          AWARDS
        </h2>

        {/* 4-column table */}
        <div className="flex flex-col border-t border-white/10">
          {AWARDS.map((award, i) => (
            <div
              key={i}
              className="award-row grid grid-cols-[2fr_1.2fr_1.2fr_0.5fr] gap-4 items-center py-4 border-b border-white/8 hover:pl-2 transition-all duration-300"
            >
              <span className="font-sequel font-extrabold italic text-xs text-white/80 uppercase tracking-wide">
                {award.name}
              </span>
              <span className="font-sans text-xs text-white/50">
                {award.category}
              </span>
              <span className="font-sans text-xs text-white/50">
                {award.company}
              </span>
              <span className="font-heading font-semibold text-xs text-white/40 text-right">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

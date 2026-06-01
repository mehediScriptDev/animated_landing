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
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto">
        {/* AWARDS watermark — same style as EXPERTISE, white stroke */}
        <div
          aria-hidden="true"
          className="font-sequel font-black text-transparent text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tighter uppercase mb-5 select-none"
          style={{ WebkitTextStroke: "1px white", textStroke: "0.5px white" }}
        >
          AWARDS
        </div>

        {/* 4-column table */}
        <div className="flex flex-col border-t border-white/10">
          {AWARDS.map((award, i) => (
            <div
              key={i}
              className="award-row grid grid-cols-[2fr_1.2fr_1.2fr_0.5fr] gap-4 items-center py-4 border-b border-white/8 hover:pl-2 transition-all duration-300"
            >
              <span className="font-sequel font-extrabold italic text-sm text-white uppercase tracking-wide">
                {award.name}
              </span>
              <span className="text-base font-serif text-white">
                {award.category}
              </span>
              <span className="text-base font-serif text-white">
                {award.company}
              </span>
              <span className="text-base font-sequel text-white text-right">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

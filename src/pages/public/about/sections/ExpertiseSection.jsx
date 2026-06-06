import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = {
  strategy: {
    title: "STRATEGY",
    description:
      "Strategy is the underlying foundation of every great brand experience. Strategy that is centered on clarifying a brand's message to inform their decisions and shape their actions.",
    items: [
      "Research & Analysis",
      "Trend & Insight",
      "Customer Experience",
      "Brand Platform & Positioning",
      "Go-To-Market Planning",
      "Content & Messaging",
    ],
  },
  design: {
    title: "DESIGN",
    description:
      "From voice to tone to style, every expression matters. Brand design shapes a brand experience by creating identity touchpoints from design systems to key messages.",
    items: [
      "Brand Identity",
      "Visual Language",
      "Packaging Design",
      "Brand Campaign",
      "Signature Assets",
      "Brand Guidelines",
    ],
  },
  digital: {
    title: "DIGITAL",
    description:
      "Creative functionality with intuitive design makes every interaction more meaningful. Embracing digital as an extension of the physical brand has the power to elevate the experience.",
    items: [
      "Front End Web Design",
      "UI Design",
      "UX Strategy",
      "App Design",
      "CMS Integrations",
      "Digital Advertising",
    ],
  },
};

export default function ExpertiseSection() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cols = ref.current.querySelectorAll(".service-col");
      gsap.fromTo(
        cols,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-label="Expertise"
      ref={ref}
      className="relative z-2 bg-white py-20 md:py-24 overflow-hidden"
    >
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto">
        {/* EXPERTISE watermark */}
        <div
          aria-hidden="true"
          className="font-sequel font-black text-transparent text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tighter uppercase mb-5 select-none"
          style={{ WebkitTextStroke: '1px black', textStroke: '0.5px black' }}
        >
          EXPERTISE
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-12">
          {Object.entries(SERVICES).map(([key, service]) => (
            <div key={key} className="service-col flex flex-col gap-5">
              <h3 className="font-sequel font-extrabold italic text-[clamp(1.2rem,2vw,1.8rem)] tracking-tight uppercase text-black leading-none ">
                {service.title}
              </h3>
              <p className=" text-xl text-gray-700 font-serif">
                {service.description}
              </p>
              <ul className="flex flex-col gap-1.5 mt-2">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="font-sequel font-extrabold italic text-base text-black uppercase tracking-wide py-0.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

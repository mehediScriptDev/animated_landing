import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BioSection({ isDark }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const els = ref.current.querySelectorAll(".bio-animate");
      gsap.fromTo(
        els,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const headingColor = isDark ? "text-white" : "text-black";
  const textColor = isDark ? "text-white/70" : "text-[#555]";
  const highlightClass =
    "font-sequel font-black italic text-[18px] text-white transition-colors duration-300";

  return (
    <section
      aria-label="Biography"
      ref={ref}
      className="relative z-1 py-16 md:py-20"
    >
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-14">
          <div className="w-full md:w-[47%] flex flex-col gap-6">
            <h2
              className={`bio-animate font-anton uppercase tracking-tight leading-none text-[2rem] md:text-[3.6rem] ${headingColor}`}
            >
              Michael Traikos
            </h2>
            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              At Traikos Finance, we believe obtaining finance should be
              straightforward, transparent and tailored to your individual
              circumstances. Whether you're purchasing your{" "}
              <strong className={highlightClass}>FIRST HOME</strong>, upgrading
              to your next property, refinancing an existing loan or building an
              investment portfolio, we're here to guide you through the process
              with confidence.
            </p>
          </div>

          <div className="w-full md:w-[49%] flex flex-col gap-6">
            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              Founded by Michael Traikos, Traikos Finance combines{" "}
              <strong className={highlightClass}>
                NEARLY TWO DECADES OF REAL ESTATE EXPERIENCE
              </strong>{" "}
              with professional mortgage broking expertise. As a fully licensed
              estate agent and experienced auctioneer, Michael has spent years
              helping people buy, sell and invest in property. This unique
              background provides clients with valuable insight into both the
              property and finance sides of a transaction.
            </p>

            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              Understanding property is about more than securing a loan.
              It's about knowing how the market works, understanding the buying
              and selling process, recognising opportunities and making informed
              financial decisions. By combining real estate knowledge with access
              to a{" "}
              <strong className={highlightClass}>BROAD RANGE OF LENDERS</strong>
              , Traikos Finance helps clients navigate complex situations and
              identify lending solutions aligned with their goals.
            </p>

            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              Our approach is simple: provide{" "}
              <strong className={highlightClass}>HONEST ADVICE</strong>,{" "}
              <strong className={highlightClass}>
                CLEAR COMMUNICATION AND ONGOING SUPPORT
              </strong>
              . We take the time to understand your objectives, explain your
              options and help you make informed decisions every step of the way.
              Whether you're purchasing a family home, building, renovating,
              refinancing or investing, our focus is on achieving the right
              outcome for your circumstances.
            </p>

            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              At Traikos Finance, you're never treated as just another
              application number. We build{" "}
              <strong className={highlightClass}>LONG-TERM RELATIONSHIPS</strong>{" "}
              with our clients and remain available long after settlement to
              provide guidance, reviews and support as your needs evolve. Our
              commitment is to help you make confident property and finance
              decisions today, while supporting your goals for the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

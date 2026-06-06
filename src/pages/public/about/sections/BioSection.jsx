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
              At Traikos Finance, we understand that securing a{" "}
              <strong className={highlightClass}>MORTGAGE</strong> is one of the
              most important financial decisions you'll ever make. Whether
              you're buying your{" "}
              <strong className={highlightClass}>FIRST HOME</strong>,
              refinancing, or looking to invest, we're here to simplify the
              process and provide you with fast, personalised solutions that fit
              your unique needs.
            </p>
          </div>

          <div className="w-full md:w-[49%] flex flex-col gap-6">
            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              Michael Traikos, founder of Traikos Finance, brings nearly{" "}
              <strong className={highlightClass}>TWO DECADES</strong> of
              expertise in the real estate industry as both a fully licensed
              estate agent and an experienced auctioneer. With a deep
              understanding of the property market, Michael offers more than
              just mortgage broking - he provides comprehensive guidance,
              helping you navigate both the finance and property sides of your
              transaction.
            </p>

            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              At Traikos Finance, we do more than just connect you with the
              right loan. We guide you through the{" "}
              <strong className={highlightClass}>ENTIRE PROCESS</strong> - from
              understanding the property market, negotiating the best rates, to
              helping you make informed decisions that serve your long-term
              goals. We provide a comprehensive,{" "}
              <strong className={highlightClass}>CLIENT-FIRST</strong> approach
              that's built on trust, transparency, and a deep commitment to your
              financial wellbeing.
            </p>

            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              Our aim is to take the stress out of mortgages by offering clear,
              tailored advice every step of the way. Whether you're purchasing
              your dream home or expanding your investment portfolio, we offer
              the{" "}
              <strong className={highlightClass}>
                KNOWLEDGE, SUPPORT, AND EFFICIENCY
              </strong>{" "}
              to get you there quickly. With Michael's extensive background in
              real estate and his focus on fast, effective solutions, we know
              how to streamline the process and make your mortgage journey
              smooth.
            </p>

            <p
              className={`bio-animate font-sans text-sm md:text-base leading-[1.85] ${textColor}`}
            >
              We pride ourselves on being more than just a brokerage - we're
              your partners in property success. Our client relationships are
              built to last, and we are passionate about providing top-notch
              service, giving you confidence in every decision you make. When
              you work with Traikos Finance, you're not just another
              transaction; you're part of a family that values{" "}
              <strong className={highlightClass}>
                TRUST, INTEGRITY, AND RESULTS
              </strong>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

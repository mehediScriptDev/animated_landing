import { useState } from "react";

const SOCIALS = [
  { label: "TW.", color: "#1DA1F2" },
  { label: "IG.", color: "#E1306C" },
  { label: "LN.", color: "#0077B5" },
  { label: "BE.", color: "#1769FF" },
  { label: "M.", color: "#00C853" },
];

export default function CtaSection() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [hovered, setHovered] = useState(null);

  return (
    <section
      aria-label="Contact"
      className="relative z-2 bg-[#1a1a1a] py-16 md:py-24"
    >
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto">
        {/* GET IN TOUCH label */}
        <p className="font-heading text-[10px] text-white/40 tracking-[0.3em] uppercase mb-8">
          GET IN TOUCH
        </p>

        {/* Social links — hover turns entire text to the fullstop color */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          {SOCIALS.map((social, i) => (
            <a
              key={social.label}
              href="#"
              className="font-sequel font-extrabold text-[1.6rem] md:text-[3.5vw] lg:text-[2.5vw] no-underline uppercase tracking-wide transition-colors duration-200"
              style={{ color: hovered === i ? social.color : "#fff" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {social.label.replace(".", "")}
              <span style={{ color: social.color }}>.</span>
            </a>
          ))}
        </div>

        {/* CTA heading + BACK TO TOP */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <p
              className="font-sequel font-black italic text-white uppercase tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
            >
              WANT TO MOVE FORWARD?
            </p>
            <div className="relative inline-block w-fit">
              <div className="absolute left-0 right-0 h-4 bg-gray-300/50 -z-10 bottom-0"></div>
              <a
                href="mailto:michael@traikosfinance.com"
                className="font-sequel font-black italic text-white uppercase tracking-tight leading-[1.1] inline-block no-underline hover:opacity-80 transition-opacity duration-200 self-start"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)"
                }}
              >
                DROP A LINE.
              </a>
            </div>
          </div>

          {/* Back to top — custom up-arrow cursor on hover */}
          <button
            onClick={scrollToTop}
            className="hidden md:flex items-center gap-2 text-white/40 text-[10px] tracking-[0.2em] uppercase hover:text-white/70 transition-colors duration-200 bg-transparent border-none pb-1"
            style={{
              cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='19' x2='12' y2='5'/%3E%3Cpolyline points='5 12 12 5 19 12'/%3E%3C/svg%3E") 12 0, pointer`,
            }}
          >
            BACK TO TOP
          </button>
        </div>
      </div>
    </section>
  );
}

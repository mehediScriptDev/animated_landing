import { useState } from "react";

const SOCIALS = [
  {
    label: "EM.",
    color: "#1DA1F2",
    href: "mailto:michael@traikosfinance.com",
    ariaLabel: "Email Traikos Finance",
  },
  {
    label: "IG.",
    color: "#E1306C",
    href: "https://www.instagram.com/traikos_finance?igsh=MWZrbWt1bHllYXo3",
    ariaLabel: "Visit Instagram",
    external: true,
  },
  {
    label: "LN.",
    color: "#0077B5",
    href: "https://www.linkedin.com/in/michael-traikos-ba1178272",
    ariaLabel: "Visit LinkedIn",
    external: true,
  },
  {
    label: "M.",
    color: "#00C853",
    href: "tel:0413657314",
    ariaLabel: "Call 0413 657 314",
  },
];

export default function CtaSection() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [hovered, setHovered] = useState(null);

  return (
    <section
      aria-label="Contact"
      className="relative z-2 bg-transparent py-16 md:py-24"
    >
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto flex flex-col gap-10">
        {/* GET IN TOUCH label */}
        <p className="font-heading text-[10px] text-white/40 tracking-[0.3em] uppercase">
          GET IN TOUCH
        </p>

        {/* Social links — hover turns entire text to the fullstop color */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-b-2 md:gap-x-5">
          {SOCIALS.map((social, i) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.ariaLabel}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noopener noreferrer" : undefined}
              className="font-anton font-black text-[1.6rem] md:text-[3.5vw] lg:text-[2.5vw] leading-none no-underline uppercase tracking-wide transition-colors duration-200"
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
              className="font-anton font-black italic text-white uppercase tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 1000 }}
            >
              BOOK A FREE
            </p>
            <div className="relative inline-block w-fit">
              <div className="absolute left-0 right-0 h-4 bg-gray-300/50 -z-10 bottom-0"></div>
              <a
                href="mailto:michael@traikosfinance.com"
                className="font-anton font-black italic text-white uppercase tracking-tight leading-[1.05] inline-block no-underline hover:opacity-80 transition-opacity duration-200 self-start"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                  fontWeight: 8000,
                }}
              >
                CONSULTATION HERE .
              </a>
            </div>
          </div>

          {/* Back to top — custom up-arrow cursor on hover */}
          <button
            onClick={scrollToTop}
            className="hidden md:flex font-black items-center gap-2 text-white/40 text-[10px] tracking-[0.4em] uppercase hover:text-white/70 transition-colors duration-200 bg-transparent border-none pb-1"
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

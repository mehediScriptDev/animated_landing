export default function CtaSection() {
  return (
    <section
      aria-label="Contact"
      className="relative z-2 bg-black py-16 md:py-24"
    >
      <div className="w-[90%] md:w-[75%] max-w-[1400px] mx-auto">
        {/* Social links */}
        <div className="flex gap-5 mb-12">
          {["TW.", "IG.", "LN.", "BE.", "M."].map((label) => (
            <a
              key={label}
              href="#"
              className="font-sequel font-extrabold text-[13px] text-white/50 no-underline uppercase tracking-wide transition-colors duration-200 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2.5">
          <p className="font-sans text-xs text-white/35 tracking-[0.12em] uppercase">
            WANT TO MOVE FORWARD?
          </p>
          <p className="font-sequel font-black italic text-[clamp(1.8rem,3.5vw,3rem)] text-white uppercase tracking-tight">
            DROP A LINE.
          </p>
        </div>
      </div>
    </section>
  );
}

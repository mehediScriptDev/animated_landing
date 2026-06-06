import aboutImg from "@/assets/simplemain.png"; // TODO: Replace with new image when client provides it

const highlightClass = "font-sequel font-black italic text-white";

export default function AboutSection() {
  return (
    <section
      aria-label="About Traikos Finance"
      className="relative z-10 py-12 md:py-16 lg:py-24"
    >
      <div className="w-[90%] md:w-[75%] mx-auto flex flex-col lg:flex-row lg:items-stretch gap-10 ">
        {/* Left — image with top-right rounded corner (shown second on mobile, first on lg) */}
        {/* TODO: Replace aboutImg with the new image once client provides it */}
        <div className="w-full lg:w-1/2 shrink-0 flex order-2 lg:order-1">
          <img
            src={aboutImg}
            alt="Traikos Finance — solutions-driven finance brokerage"
            className="w-full h-80 sm:h-112.5 lg:h-full object-cover"
            style={{ borderRadius: "0 80px 0 0" }}
          />
        </div>

        {/* Right — text content (shown first on mobile, second on lg) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 text-white/85 text-sm lg:text-[0.95rem] leading-relaxed order-1 lg:order-2">
          <p>
            We are <strong className="text-white">Traikos Finance</strong>, a
            solutions-driven finance brokerage with access to over 30 lenders,
            providing tailored lending solutions to clients from all walks of
            life. Our mission is simple: to understand your unique
            circumstances, provide clear advice, and help you achieve your
            property and financial goals with confidence.
          </p>
          <p>
            Drawing on{" "}
            <strong className={highlightClass}>
              NEARLY TWO DECADES OF REAL ESTATE EXPERIENCE
            </strong>
            , Traikos Finance offers a unique perspective that extends beyond
            finance alone. Founded by Michael Traikos, a fully licensed estate
            agent and experienced auctioneer, we understand both the property
            and finance sides of a transaction. Whether you&apos;re purchasing
            your first home, upgrading, refinancing, investing, or building, we
            provide practical guidance and tailored lending solutions every step
            of the way.
          </p>
          <p>
            At Traikos Finance, we believe successful outcomes are built on
            honest advice, clear communication and ongoing support. We take the
            time to understand your goals, explain your options and structure
            finance solutions aligned with your long-term objectives. Our focus
            is not just on securing a loan today, but on building{" "}
            <strong className={highlightClass}>LONG-TERM RELATIONSHIPS</strong>{" "}
            that support your property journey for years to come.
          </p>
        </div>
      </div>
    </section>
  );
}

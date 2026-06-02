import aboutImg from '@/assets/simplemain.png';

export default function AboutSection() {
  return (
    <section
      aria-label="About Traikos Finance"
      className="relative z-10 py-20 "
    >
      <div className="w-[90%] md:w-[75%] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left — image with top-right rounded corner */}
        <div className="w-full md:w-1/2 shrink-0">
          <img
            src={aboutImg}
            alt="Modern apartment building"
            className="w-full h-auto object-cover"
            style={{ borderRadius: '0 80px 0 0' }}
          />
        </div>

        {/* Right — text content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-white/85 text-sm md:text-sm   leading-relaxed">
          <p>
            We are Traikos Finance. A solutions-driven mortgage brokerage with access to
            over 30 lenders, offering tailored financial services across various markets and
            cultures. Our mission is to understand your unique journey and provide the
            guidance needed to bring your property goals to life.
          </p>
          <p>
            Drawing on nearly two decades of real estate experience, Traikos Finance offers
            a wealth of knowledge in the property market. We specialise in navigating the
            complexities of buying, selling, and investing, delivering tailored mortgage
            solutions that align with your unique goals. Whether you&apos;re securing your first
            home or expanding your property portfolio, we provide expert guidance every
            step of the way.
          </p>
          <p>
            Curiosity, strategy, and discipline drive our approach at Traikos Finance, enabling
            us to develop tailored financial solutions that combine optimal functionality with a
            seamless client experience. Our goal is to build a financial foundation that
            supports your long-term property and investment aspirations.
          </p>
        </div>

      </div>
    </section>
  );
}

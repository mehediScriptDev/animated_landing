import { useGsapFadeIn } from '../../../../hooks/useGsapFadeIn';

export default function HeroBanner() {
  const textRef = useGsapFadeIn({ duration: 1 });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full h-[85vh] flex flex-col justify-center pl-10 md:pl-10 lg:pl-24 xl:pl-24 2xl:pl-48 pr-6"
    >
      <h1
        id="hero-heading"
        ref={textRef}
        className="hero-text uppercase transition-colors duration-200"
      >
        Making Cents of Real Estate<br />
        and Sense of Your Finance.
      </h1>
    </section>
  );
}

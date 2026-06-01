import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Lender / client logos */
// import bendigoImg from "../../../../assets/leading_lenders/bendigo.webp";
// import commoImg from "../../../../assets/leading_lenders/commo.webp";
// import connectiveImg from "../../../../assets/leading_lenders/connective.webp";
// import depositImg from "../../../../assets/leading_lenders/Deposit.webp";
// import pepperImg from "../../../../assets/leading_lenders/pepeer.webp";
// import suncorpImg from "../../../../assets/leading_lenders/Suncorp.webp";
// import teacherImg from "../../../../assets/leading_lenders/teacher.webp";
// import ubankImg from "../../../../assets/leading_lenders/ubank.webp";

gsap.registerPlugin(ScrollTrigger);

// Expanded to 20 total items for a massive logo wall
const CLIENTS = [
  // Original 8 Local Imports
  // { name: "Bendigo Bank", img: bendigoImg },
  // { name: "Commonwealth Bank", img: commoImg },
  // { name: "Connective", img: connectiveImg },
  // { name: "Deposit Assure", img: depositImg },
  // { name: "Pepper Money", img: pepperImg },
  // { name: "Suncorp Bank", img: suncorpImg },
  // { name: "Teachers Mutual", img: teacherImg },
  // { name: "Ubank", img: ubankImg },

  // 12 Additional Placeholder URLs
  {
    name: "Google",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Spotify",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  },
  {
    name: "Amazon",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Netflix",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Apple",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "GitHub",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    name: "Stripe",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    name: "Vercel",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Vercel_logo.svg",
  },
  {
    name: "Figma",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
  {
    name: "Notion",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
  },
  {
    name: "Uber",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
  },
];

export default function ClientsSection() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = ref.current.querySelectorAll(".client-logo");
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-label="Clients"
      ref={ref}
      className="relative z-1 py-20 md:py-28"
    >
      <div className="w-[90%] md:w-[75%] max-w-350 mx-auto">
        {/* CLIENTS watermark heading */}
        <div
          aria-hidden="true"
          className="font-sequel font-black text-transparent text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tighter uppercase mb-10 select-none"
          style={{ WebkitTextStroke: "1px white", textStroke: "0.5px white" }}
        >
          CLIENTS
        </div>

        {/* Logo grid — Set to exactly 5 columns on desktop (md:grid-cols-5) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10">
          {CLIENTS.map((client, index) => (
            <div
              key={index}
              className="client-logo flex items-center justify-center h-16 md:h-20 px-3 group"
            >
              <img
                src={client.img}
                alt={client.name}
                className="max-h-10 md:max-h-12 w-auto object-contain brightness-0 invert group-hover:opacity-90 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

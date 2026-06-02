import { useRef, useState, useCallback, useEffect } from "react";

// ─── Hardcoded Google reviews ────────────────────────────────────────────────
// To add/update reviews: copy the text from your Google Business Profile page.
// To get the "Write a review" link:
//   1. Go to Google Maps → search your business → click "Write a review"
//   2. Copy that URL and paste it in GOOGLE_REVIEW_URL below.
const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/place/Traikos+Finance/@-37.9725665,145.0531353,9z/data=!4m18!1m9!3m8!1s0x68fb5a82afcd107f:0x3586daeb8b74dd84!2sTraikos+Finance!8m2!3d-37.9725665!4d145.0531353!9m1!1b1!16s%2Fg%2F11y98lnzt6!3m7!1s0x68fb5a82afcd107f:0x3586daeb8b74dd84!8m2!3d-37.9725665!4d145.0531353!9m1!1b1!16s%2Fg%2F11y98lnzt6?entry=ttu&g_ep=EgoyMDI2MDUyNi4wIKXMDSoASAFQAw%3D%3D"; // ← replace this

const REVIEWS = [
  {
    id: 0,
    name: "P Yaz",
    ago: "2 months ago",
    color: "#e05a2b",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocI3fdFtMcZ757r-UxqfhO87Ba8B3tBqbkFZj1hKD1CWBrez3A=w36-h36-p-rp-mo-br100",
    text: "Michael has been great to deal with during refinancing my home loan. He has been informative and helped find the best option for my loan since my bank refused to help me. I really appreciated him touching base everyday to give me updates and answer any questions I may had. Many thanks Michael!",
  },
  {
    id: 1,
    name: "Annmarie Pendleton",
    ago: "4 months ago",
    color: "#5b9e6e",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjXvuVMaJPc12MjTcfRyR_elleAn5mI3Ra0heVESEKCPm2t4Xs4=w36-h36-p-rp-mo-br100",
    text: "Michael was recommended by my Estate Agent. He was brilliant from the start helping me understand the processes in Australia, which are very different from the UK. Michael made the process super simple and quick. Micheal with his background ...",
  },
  {
    id: 2,
    name: "Anthony Pittas",
    ago: "5 months ago",
    color: "#2e7d9e",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJ_qSyU3I2VaYxyNiQIKlbR1tiQuZgc7X1OoOxn5D_tFLAnHw=w36-h36-p-rp-mo-br100",
    text: "Michael really knows his stuff! He was so quick, and he actually got me a better deal than another broker I was talking to. He was responsive, and really understood my needs. I would recommend Michael to anyone.",
  },
  {
    id: 3,
    name: "Danny Iglesias",
    ago: "6 months ago",
    color: "#7b5ea7",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocL0lqw0ErbXMygNOl9h_IZN9eYUQARZs_41KwWGojCu5cGLaCQ=w36-h36-p-rp-mo-br100",
    text: "5/5 stars! Michael is a GAME CHANGER! His unparalleled expertise, unwavering dedication, and unrelenting passion for delivering exceptional results are truly inspiring. He transformed my mortgage experience from stressful to ...",
  },
  {
    id: 4,
    name: "Jane Johnston",
    ago: "5 months ago",
    color: "#c0392b",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLPzJUpTr5_or1SE7AoEksvcA3gHbOoGJqTOo7fQRBC1T17aMY=w36-h36-p-rp-mo-ba2-br100",
    text: "Thanks Michael. Taikos finance were extremely professional and came to the rescue when due to pressure, timing and doc requirements, financing this new mortgage seemed impossible. Very grateful for all the hard work and effort to make this happen. We are loving our new abode. Thanks to Traikos finance.",
  },
  {
    id: 5,
    name: "Amir Foroodi",
    ago: "11 months ago",
    color: "#1a6e3c",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocI0sjdnc84DHC5b9h5_xiJ2hdMk9BBhG5cBkseDzC1qWSaxJg=w36-h36-p-rp-mo-ba2-br100",
    text: "I had a fantastic experience working with Michael. He was incredibly patient and worked closely with me every step of the way. Michael demonstrated great transparency in providing options to refinance my current loan and even helped secure ...",
  },
  {
    id: 6,
    name: "Eloise",
    ago: "a year ago",
    color: "#36659a",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLhYctxzL8Qr4enhYKa61modYk0Q4CWnlm5TiiHc1E0zclxNQ=w36-h36-p-rp-mo-br100",
    text: "Michael was amazing through the whole refinancing process. He was constantly in communication with us, patient with all our questions and made sure we understood every detail. I would recommend to anyone, especially first time byers who are afraid of asking questions, and want a friendly and approachable broker.",
  },
  {
    id: 7,
    name: "Hilz K",
    ago: "9 months ago",
    color: "#7b5e3f",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJwBuvnf76UloPNhwTn_yZ7V_zX7hIVgvv3imRFer2Y8-6FlQ=w36-h36-p-rp-mo-br100",
    text: "We engaged micheal to finish off getting our loan after my old broker stuffed everything up. This was a hard one to cross the line as the house we wanted was unlivible and ...",
  },
  {
    id: 8,
    name: "Ting-Yen Chou",
    ago: "10 months ago",
    color: "#9a6d2f",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIJRaEjRO15s8gMzNdN9vlbhDDVDq6gf_D_rOoah8SYeY_1uw=w36-h36-p-rp-mo-br100",
    text: "I would like to express my sincere gratitude to Michael for his assistance in securing a loan that is well-suited to my financial needs. Throughout the entire process, he demonstrated professionalism, expertise, and a genuine commitment to ...",
  },
  {
    id: 9,
    name: "Dalbir Singh Bijral",
    ago: "a year ago",
    color: "#435b7d",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKJX5tpg1Qgbh0JdqIH8yOxUs_PPTzGj1Pe1Krss6KYSxW2Hg=w36-h36-p-rp-mo-br100",
    text: "I had the pleasure of working with Michael for my recent home purchase, and I couldn't be more pleased with the experience! From the very first meeting, Michael was professional, knowledgeable, and genuinely interested in helping me find ...",
  },
];

// Google "G" logo SVG
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

// Star rating
function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#f4b400"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function getReviewPreview(text, maxChars = 145) {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= maxChars) {
    return { preview: normalized, isTruncated: false };
  }

  const trimmed = normalized.slice(0, maxChars);
  const lastSpace = trimmed.lastIndexOf(" ");
  const cutoff = lastSpace > maxChars - 30 ? lastSpace : maxChars;
  const preview = trimmed.slice(0, cutoff).replace(/[.\s…]+$/, "");

  return { preview: `${preview}...`, isTruncated: true };
}

function ReviewCard({ review, onReadMore }) {
  const initial = review.name.charAt(0).toUpperCase();
  const { preview, isTruncated } = getReviewPreview(review.text);

  return (
    <div
      className="w-full shrink-0 flex flex-col justify-between rounded-xl p-5"
      style={{
        minHeight: "200px",
        background: "#1c1c1c",
        border: "1px solid #c9a84c55",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.name}
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
              style={{ background: review.color }}
            >
              {initial}
            </div>
          )}
          <div>
            <p className="text-white text-sm font-semibold leading-tight">
              {review.name}
            </p>
            <p className="text-white/40 text-[0.65rem]">{review.ago}</p>
          </div>
        </div>
        <GoogleIcon />
      </div>

      {/* Stars + verified */}
      <div className="flex items-center gap-2 mb-3">
        <Stars />
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#4285F4"
          aria-label="Verified"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      </div>

      {/* Review text */}
      <p className="text-white/70 text-xs leading-relaxed flex-1 mb-3">
        {preview}
      </p>

      {/* Read more / Google quote */}
      <div className="flex items-end justify-between">
        {isTruncated && (
          <button
            onClick={() => onReadMore(review)}
            className="text-white/40 text-[0.65rem] hover:text-white/70 transition-colors"
          >
            Read more
          </button>
        )}
        <span
          className="text-[#c9a84c] text-2xl leading-none ml-auto"
          aria-hidden="true"
        >
          "
        </span>
      </div>
    </div>
  );
}

// ─── Desktop-only scrollable card ───────────────────────────────────────────
function DesktopReviewCard({ review, onReadMore }) {
  const initial = review.name.charAt(0).toUpperCase();
  const { preview, isTruncated } = getReviewPreview(review.text);

  return (
    <div
      className="shrink-0 w-65 flex flex-col justify-between rounded-xl p-5"
      style={{
        minHeight: "200px",
        background: "#1c1c1c",
        border: "1px solid #c9a84c55",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {review.avatar ? (
            <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0" style={{ background: review.color }}>
              {initial}
            </div>
          )}
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{review.name}</p>
            <p className="text-white/40 text-[0.65rem]">{review.ago}</p>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Stars />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#4285F4" aria-label="Verified">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      </div>
      <p className="text-white/70 text-xs leading-relaxed flex-1 mb-3">
        {preview}
      </p>
      <div className="flex items-end justify-between">
        {isTruncated && (
          <button onClick={() => onReadMore(review)} className="text-white/40 text-[0.65rem] hover:text-white/70 transition-colors">
            Read more
          </button>
        )}
        <span className="text-[#c9a84c] text-2xl leading-none ml-auto" aria-hidden="true">"</span>
      </div>
    </div>
  );
}

function ReviewModal({ review, onClose }) {
  if (!review) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <button
        aria-label="Close full review"
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#c9a84c55] bg-[#151515] p-6 md:p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 h-8 w-8 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/50 transition-colors"
        >
          ×
        </button>

        <div className="mb-4">
          <p className="text-white text-lg font-semibold leading-tight">{review.name}</p>
          <p className="text-white/40 text-xs mt-1">{review.ago}</p>
        </div>

        <div className="mb-4">
          <Stars />
        </div>

        <p className="text-white/80 text-sm leading-7 whitespace-pre-line">
          {review.text}
        </p>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [mobileIdx, setMobileIdx] = useState(0);
  const [activeReview, setActiveReview] = useState(null);
  const trackRef = useRef(null);
  const total = REVIEWS.length;

  useEffect(() => {
    if (!activeReview) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [activeReview]);

  const scrollDesktop = useCallback((dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 276, behavior: "smooth" });
  }, []);

  

  return (
    <section aria-label="Google reviews" className="bg-black py-16 px-4">
        <ReviewModal review={activeReview} onClose={() => setActiveReview(null)} />

      {/* ── Mobile layout ── */}

      <div className="flex flex-col gap-8 md:hidden">

        {/* Single card + arrows */}
        <div className="relative">
          <ReviewCard review={REVIEWS[mobileIdx]} onReadMore={setActiveReview} />
          {/* Prev */}
          <button
            onClick={() => setMobileIdx((i) => Math.max(0, i - 1))}
            disabled={mobileIdx === 0}
            aria-label="Previous review"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-white/20 bg-black/70 flex items-center justify-center text-white text-lg disabled:opacity-30 hover:bg-white/10 transition-colors"
          >
            ‹
          </button>
          {/* Next */}
          <button
            onClick={() => setMobileIdx((i) => Math.min(total - 1, i + 1))}
            disabled={mobileIdx === total - 1}
            aria-label="Next review"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-white/20 bg-black/70 flex items-center justify-center text-white text-lg disabled:opacity-30 hover:bg-white/10 transition-colors"
          >
            ›
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setMobileIdx(i)}
              aria-label={`Review ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === mobileIdx ? "bg-[#c9a84c]" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex w-[75%] mx-auto items-start">
        <div className="relative flex-1 min-w-0">
          {/* Prev */}
          <button
            onClick={() => scrollDesktop(-1)}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            ‹
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {REVIEWS.map((review) => (
              <DesktopReviewCard key={review.id} review={review} onReadMore={setActiveReview} />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => scrollDesktop(1)}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

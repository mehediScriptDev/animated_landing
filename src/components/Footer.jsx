import TransitionLink from './TransitionLink';
import logoImg from '@/assets/logo_dark.png';

// Instagram icon
function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608C4.516 2.495 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.163 3.355.76 2.014 2.1.674 3.44.077 5.282-.014 7.138-.072 8.418-.086 8.826-.086 12s.014 3.582.072 4.862c.091 1.856.688 3.698 2.028 5.038 1.34 1.34 3.182 1.937 5.038 2.028C8.418 23.986 8.826 24 12 24s3.582-.014 4.862-.072c1.856-.091 3.698-.688 5.038-2.028 1.34-1.34 1.937-3.182 2.028-5.038.058-1.28.072-1.688.072-4.862s-.014-3.582-.072-4.862c-.091-1.856-.688-3.698-2.028-5.038C20.36.76 18.518.163 16.662.072 15.382.014 14.974 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
    </svg>
  );
}

// LinkedIn icon
function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

// Scroll to top icon
function IconChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
    </svg>
  );
}

const QUICK_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'Refinancing', to: '/refinancing' },
  { label: 'About Us',    to: '/about' },
  { label: 'Contact',     to: '/contact' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-black text-white relative z-[2]" role="contentinfo">

      {/* Main footer body */}
      <div className="w-[90%] md:w-[75%] mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — Logo + name */}
        <div className="flex flex-col gap-4">
          <img src={logoImg} alt="Traikos Finance logo" className="w-20 h-auto object-contain" />
          <p className="text-white/60 tracking-[0.25em] text-xs uppercase mt-2">Traikos Finance</p>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h3 className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-5">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <TransitionLink
                  to={link.to}
                  className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-white/30 text-xs">»</span>
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Information */}
        <div>
          <h3 className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-5">Informations</h3>
          <ul className="flex flex-col gap-4 text-sm text-white/60">
            <li className="flex items-center gap-3">
              <span aria-hidden="true">📞</span>
              <a href="tel:0413657314" className="hover:text-white transition-colors">0413 657 314</a>
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden="true">✉️</span>
              <a href="mailto:michael@traikosfinance.com" className="hover:text-white transition-colors">
                michael@traikosfinance.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden="true">📍</span>
              <span>Templestowe, Vic 3106</span>
            </li>
          </ul>
        </div>

        {/* Col 4 — Social Media + license numbers */}
        <div>
          <h3 className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-5">Social Media</h3>
          <ul className="flex flex-col gap-2 text-sm text-white/60 mb-6">
            <li>ACL: 389328</li>
            <li>CRN: 563333</li>
            <li>ABN: 70 394 109 592</li>
          </ul>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/60 hover:text-white transition-colors"
            >
              <IconInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/60 hover:text-white transition-colors"
            >
              <IconLinkedIn />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="w-[90%] md:w-[75%] mx-auto py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>&copy; {new Date().getFullYear()} Traikos Finance All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <TransitionLink to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</TransitionLink>
            <TransitionLink to="/compliments" className="hover:text-white transition-colors">Compliments &amp; Concern</TransitionLink>
            <TransitionLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</TransitionLink>
          </div>
        </div>
      </div>

    </footer>
  );
}


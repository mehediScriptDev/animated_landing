# 🏛️ Michael Traikos Finance — Web Platform

[![Live Website](https://img.shields.io/badge/Live_Site-traikosfinance.com-000000?style=for-the-badge&logo=googlechrome&logoColor=white)](https://traikosfinance.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis_Scroll-1.3-000000?style=for-the-badge)](https://lenis.darkroom.engineering/)

> **Live Deployment:** [https://traikosfinance.com/](https://traikosfinance.com/)

Welcome to the **Michael Traikos Finance** web repository. This project is a production-grade, highly responsive web application built for a modern finance and mortgage brokerage firm. 

---

## 💡 Engineering Philosophy & Architectural Highlights

On the surface, the application presents a **clean, trustworthy, and institutional financial interface**. Underneath, it is engineered with a **state-of-the-art micro-animation architecture** that delivers cinematic page transitions, inertia smooth scrolling, and dynamic theme switching without compromising rendering performance.

### ✨ Key Features & Technical Marvels

- 🌀 **Inertia Smooth Scrolling**: Integrated **Lenis** engine tightly bound to **GSAP's `requestAnimationFrame` ticker** and `ScrollTrigger` plugin, producing silky 60fps inertia scrolling across all viewports.
- 🎞️ **GPU-Accelerated DOM Snapshot Page Transitions**: Custom [`TransitionLink`](file:///c:/dev/michaeltraikos_frontend/src/components/TransitionLink.jsx) and [`PageWipeOverlay`](file:///c:/dev/michaeltraikos_frontend/src/components/PageWipeOverlay.jsx) architecture. 
  - Takes a DOM snapshot of the current view.
  - Moves the active React root wrapper off-screen.
  - Swaps routes instantly under the snapshot.
  - Runs a parallel GPU-accelerated horizontal slide with dynamic dark dimming.
  - Zero layout reflows or frame drops during page switches!
- 🎨 **Adaptive Per-Section Theme Switcher**: 
  - Dynamic navbar color/theme inversion depending on scroll depth and page section thresholds (e.g. listening to custom `about-nav-theme` viewport events).
- 🧮 **Interactive Financial & Mortgage Calculators**:
  - **Borrowing Power Calculator**: Real-time borrowing capacity estimations.
  - **Mortgage Repayment Calculator**: Dynamic principal & interest repayment breakdowns.
  - **Refinance Savings Calculator**: Comparative interest rate & savings calculator.
- 🏦 **Comprehensive Service Hub**:
  - Dedicated pages for *First Home Buyers*, *Next Home Buyers*, *Investment Loans*, *Construction Loans*, *SMSF Loans*, and *Refinancing*.
- 📍 **Google Maps Integration**: Native map rendering powered by `@googlemaps/js-api-loader`.
- ⚡ **Accessibility & Motion Controls**: Fully respects OS `prefers-reduced-motion` settings, falling back cleanly to instant transitions.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI library for component structure & state management |
| **[React Router DOM v7](https://reactrouter.com/)** | Client-side routing engine |
| **[Vite 6](https://vitejs.dev/)** | Next-generation fast frontend tooling and bundler |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first styling framework integrated via `@tailwindcss/vite` |
| **[GSAP 3](https://greensock.com/gsap/)** | Advanced timelines & ScrollTrigger animations |
| **[Lenis](https://lenis.darkroom.engineering/)** | Smooth inertia scroll engine |
| **[Google Maps JS Loader](https://www.npmjs.com/package/@googlemaps/js-api-loader)** | Interactive map components |

---

## 📂 Project Structure

```text
michaeltraikos_frontend/
├── dist/                          # Production build output
├── public/                        # Static assets & favicon
└── src/
    ├── assets/                    # Shared images, icons, and branding logos
    ├── components/                # Core global UI components
    │   ├── Footer.jsx             # Site-wide footer with navigation & legal links
    │   ├── Navbar.jsx             # Adaptive navigation bar with mobile overlay
    │   ├── PageWipeOverlay.jsx    # Global DOM container & refs for route wipe animations
    │   ├── SEO.jsx                # Head meta tag management
    │   └── TransitionLink.jsx     # Drop-in replacement for React Router <Link> with wipe effects
    ├── hooks/                     # Custom React hooks
    │   └── useScrolled.js         # Window scroll position & threshold listener
    ├── layouts/                   # Root layout wrappers
    │   └── RootLayout.jsx         # Global provider setup (Lenis + GSAP sync, navbar/footer, wipe overlay)
    ├── pages/                     # Application pages
    │   ├── NotFoundPage.jsx       # Custom 404 page
    │   └── public/                # Public routes
    │       ├── about/             # About Us page & expertise section
    │       ├── calculators/       # Loan, repayment, and refinance calculators
    │       ├── compliments_page/  # Compliments & Feedback page
    │       ├── construction/      # Construction loans page
    │       ├── contact/           # Contact page with Google Maps integration
    │       ├── disclaimer_page/   # Legal disclaimer page
    │       ├── faq_page/          # FAQ section
    │       ├── first_home/        # First home buyers guide
    │       ├── home_page/         # Landing page (Hero, Lenders, Clients, Reviews, About)
    │       ├── investment/        # Property investment loan page
    │       ├── next_home/         # Next home buyers guide
    │       ├── privacy_policy_page/# Privacy policy page
    │       ├── refinancing/       # Loan refinancing page
    │       ├── seo_faq_page/      # SEO optimized FAQ page
    │       ├── shared/            # Shared sub-components & floating action buttons
    │       └── smsf/              # SMSF loan page
    ├── router/
    │   └── router.jsx             # React Router v7 routes definition
    ├── App.css                    # Component styles & animation Keyframes
    ├── index.css                  # Global Tailwind v4 import & font definitions
    └── main.jsx                   # Application entry point
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have **Node.js** (v18.0.0 or higher) and **npm** installed.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mehediScriptDev/animated_landing.git
   cd animated_landing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Production Build

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code quality and hook rules:

```bash
npm run lint
```

---

## 🎓 Developer Guide: Working with Animations

### 1. Navigating Between Pages (`TransitionLink`)
Instead of importing `<Link>` from `react-router-dom`, **always** import `TransitionLink` from `@/components/TransitionLink`:

```jsx
import TransitionLink from '../components/TransitionLink';

// Usage:
<TransitionLink to="/about" className="hover:underline">
  About Us
</TransitionLink>
```

### 2. Smooth Scroll & GSAP ScrollTrigger Integration
Lenis smooth scrolling is initialized inside [`RootLayout.jsx`](file:///c:/dev/michaeltraikos_frontend/src/layouts/RootLayout.jsx). It drives GSAP's ticker directly:

```javascript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on('scroll', () => ScrollTrigger.update());
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

If you add a new GSAP `ScrollTrigger` animation inside a component, remember to clean up the trigger on unmount:

```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.target-element', {
      scrollTrigger: {
        trigger: '.trigger-element',
        start: 'top center',
        end: 'bottom top',
        scrub: true,
      },
      y: -50,
    });
  });

  return () => ctx.revert();
}, []);
```

---

## 🌐 Live Website

- **Production URL:** [https://traikosfinance.com/](https://traikosfinance.com/)

---

## 📄 License & Credits

- Developed for **Michael Traikos Finance**.
- All rights reserved.

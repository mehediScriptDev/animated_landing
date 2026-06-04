import { useState, useEffect, useRef } from "react";
import SEO from "../../../components/SEO";
import BorrowingPowerCalculator from "./BorrowingPowerCalculator";
import RepaymentCalculator from "./RepaymentCalculator";
import RefinanceCalculator from "./RefinanceCalculator";
import CalculatorContent from "./CalculatorContent";
import { gsap } from "gsap";

const TABS = [
  {
    id: "borrowing",
    label: "Borrowing Power",
    mobileLabel: "Borrowing",
    title: "Borrowing Power Calculator",
    subtitle:
      "Find out how much you could borrow based on your income, expenses, and financial commitments.",
    seoTitle: "Borrowing Power Calculator",
    seoDesc:
      "Calculate your estimated borrowing power for a home loan. Free calculator from Traikos Finance — your Melbourne mortgage broker.",
  },
  {
    id: "repayment",
    label: "Repayments",
    mobileLabel: "Repayments",
    title: "Home loan repayment calculator",
    subtitle:
      "Get a quick estimate of your home loan repayments and see the impact that changing interest rates will have on your scenario.",
    seoTitle: "Home Loan Repayment Calculator",
    seoDesc:
      "Estimate your monthly home loan repayments and see how rate changes affect you. Free calculator from Traikos Finance.",
  },
  {
    id: "refinance",
    label: "Refinance Savings",
    mobileLabel: "Refinance",
    title: "Refinance savings calculator",
    subtitle:
      "Calculate how much you could save on your home loan by refinancing to a lower interest rate.",
    seoTitle: "Refinance Savings Calculator",
    seoDesc:
      "Calculate your estimated savings from refinancing your home loan. Free refinance calculator from Traikos Finance.",
  },
];

export default function Calculators() {
  const [activeTab, setActiveTab] = useState("borrowing");
  const tab = TABS.find((t) => t.id === activeTab);
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-fade-up",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "all",
        },
      );
    });

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <>
      <SEO
        title={tab.seoTitle}
        description={tab.seoDesc}
        canonical={`https://traikosfinance.com/calculators`}
      />

      <main
        id="main-content"
        tabIndex={-1}
        ref={containerRef}
        className="calc-page bg-black min-h-screen pt-18 sm:pt-24 pb-20 text-white font-sans"
      >
        <div className="w-[90%] max-w-300 mx-auto">
          {/* ── Tab navigation ─────────────────────────────────── */}
          <div
            className="animate-fade-up grid grid-cols-3 sm:flex gap-1 mb-8 sm:mb-10 bg-white/5 rounded-2xl p-1 w-full sm:w-fit border border-white/10"
            role="tablist"
            aria-label="Calculator type"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTab === t.id}
                aria-controls={`panel-${t.id}`}
                className={`px-2 sm:px-6 py-2.5 sm:py-3 rounded-xl border font-semibold text-[10px] sm:text-xs tracking-[0.06em] sm:tracking-wider uppercase cursor-pointer transition-all duration-300 whitespace-normal sm:whitespace-nowrap text-center leading-tight active:scale-95 min-w-0 ${
                  activeTab === t.id
                    ? "bg-white text-black border-white shadow-md"
                    : "bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setActiveTab(t.id)}
              >
                <span className="sm:hidden">{t.mobileLabel || t.label}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* ── Header ── */}
          <div className="animate-fade-up mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-anton! text-transparent mb-3 tracking-tight bg-clip-text bg-linear-to-r from-white via-neutral-200 to-neutral-400">
              {tab.title}
            </h1>
            <p className="text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
              {tab.subtitle}
            </p>
          </div>

          {/* ── Calculator panel ── */}
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={activeTab}
            className="animate-fade-up"
          >
            {activeTab === "borrowing" && <BorrowingPowerCalculator />}
            {activeTab === "repayment" && <RepaymentCalculator />}
            {activeTab === "refinance" && <RefinanceCalculator />}
          </div>

          {/* ── Dynamic Educational and FAQ Content ─ */}
          <CalculatorContent activeTab={activeTab} />
        </div>
      </main>
    </>
  );
}

import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Helper: Format a number as currency (AUD).
 */
function fmt(n) {
  if (n == null || isNaN(n) || n <= 0) return "$0";
  return "$" + Math.round(n).toLocaleString("en-AU");
}

/**
 * Helper: Parse a currency-style string back to a number.
 */
function parseNum(v) {
  if (typeof v === "number") return v;
  return parseFloat(String(v).replace(/[^0-9.]/g, "")) || 0;
}

/**
 * Calculate monthly P&I repayment.
 * M = P × [r(1+r)^n] / [(1+r)^n − 1]
 */
function calcPI(principal, annualRate, years) {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

/**
 * Adjust monthly amount to the requested frequency.
 */
function toFrequency(monthly, freq) {
  if (freq === "weekly") return (monthly * 12) / 52;
  if (freq === "fortnightly") return (monthly * 12) / 26;
  return monthly;
}

function freqLabel(freq) {
  if (freq === "weekly") return "per week";
  if (freq === "fortnightly") return "per fortnight";
  return "per month";
}

export default function RefinanceCalculator() {
  /* ── State ─────────────────────────────────────────────────────── */
  const [loanBalance, setLoanBalance] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [newRate, setNewRate] = useState("");
  const [remainingTerm, setRemainingTerm] = useState("25");
  const [showInfo, setShowInfo] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const prevSavingsRef = useRef(0);

  /* ── Calculations ──────────────────────────────────────────────── */
  const P = parseNum(loanBalance);
  const R_curr = parseFloat(currentRate) || 0;
  const R_new = parseFloat(newRate) || 0;
  const T = parseInt(remainingTerm) || 25;

  // Monthly payments
  const currentMonthly = calcPI(P, R_curr, T);
  const newMonthly = calcPI(P, R_new, T);

  // Frequency adjusted payments
  const currentRepayment = toFrequency(currentMonthly, frequency);
  const newRepayment = toFrequency(newMonthly, frequency);

  // Savings
  const repaymentSavings = Math.max(0, currentRepayment - newRepayment);
  const totalInterestSavings = Math.max(
    0,
    (currentMonthly - newMonthly) * 12 * T,
  );

  const hasInputs = P > 0 && R_curr > 0 && R_new > 0 && T > 0;

  // Animate on savings change
  useEffect(() => {
    if (repaymentSavings !== prevSavingsRef.current) {
      setAnimKey((k) => k + 1);
      prevSavingsRef.current = repaymentSavings;
    }
  }, [repaymentSavings]);

  /* ── Handlers ──────────────────────────────────────────────────── */
  const handleLoanBalance = useCallback((e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setLoanBalance(raw);
  }, []);

  const handleCurrentRate = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setCurrentRate(val);
  }, []);

  const handleNewRate = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setNewRate(val);
  }, []);

  const handleTerm = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setRemainingTerm(val);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start text-white">
      {/* ══════════════ LEFT — Loan Details ══════════════ */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-9 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl">
        <h2 className="text-xl font-black text-white mb-7 tracking-tight">
          Current loan details
        </h2>

        {/* Current Loan Balance */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="refi-loan-balance"
          >
            Current loan balance
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">
              $
            </span>
            <input
              id="refi-loan-balance"
              type="text"
              inputMode="numeric"
              className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="450,000"
              value={
                loanBalance ? parseInt(loanBalance).toLocaleString("en-AU") : ""
              }
              onChange={handleLoanBalance}
            />
          </div>
        </div>

        {/* Current Interest Rate */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="refi-current-rate"
          >
            Current interest rate
          </label>
          <div className="relative flex items-center">
            <input
              id="refi-current-rate"
              type="text"
              inputMode="decimal"
              className="w-full pl-4 pr-10 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="7.15"
              value={currentRate}
              onChange={handleCurrentRate}
            />
            <span className="absolute right-4 text-sm font-semibold text-neutral-400 pointer-events-none">
              %
            </span>
          </div>
        </div>

        {/* Repayment Frequency */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="refi-freq"
          >
            Repayment frequency
          </label>
          <select
            id="refi-freq"
            className="w-full px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="monthly" className="bg-black text-white">Monthly</option>
            <option value="fortnightly" className="bg-black text-white">Fortnightly</option>
            <option value="weekly" className="bg-black text-white">Weekly</option>
          </select>
        </div>

        <hr className="h-px bg-white/10 my-6 border-none" />

        <h2 className="text-xl font-black text-white mb-7 tracking-tight">
          With some changes...
        </h2>

        {/* New Interest Rate */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="refi-new-rate"
          >
            New interest rate
          </label>
          <div className="relative flex items-center">
            <input
              id="refi-new-rate"
              type="text"
              inputMode="decimal"
              className="w-full pl-4 pr-10 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="6.49"
              value={newRate}
              onChange={handleNewRate}
            />
            <span className="absolute right-4 text-sm font-semibold text-neutral-400 pointer-events-none">
              %
            </span>
          </div>
        </div>

        {/* Remaining Loan Term */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="refi-term"
          >
            Remaining loan term
          </label>
          <div className="relative flex items-center">
            <input
              id="refi-term"
              type="text"
              inputMode="numeric"
              className="w-full pl-4 pr-12 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="25"
              value={remainingTerm}
              onChange={handleTerm}
            />
            <span className="absolute right-4 text-sm font-semibold text-neutral-400 pointer-events-none">
              yrs
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════ RIGHT — Savings Results (sticky) ══════════════ */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-9 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl md:sticky md:top-24">
        <h2 className="text-xl font-black text-white mb-7 tracking-tight">
          Your refinancing savings
        </h2>

        {/* Dual result cards */}
        <div className="grid grid-cols-1 gap-4 mb-6" key={animKey}>
          {/* Repayment Savings */}
          <div className="bg-linear-to-br from-neutral-950 via-slate-900 to-neutral-900 border border-white/20 rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-950/15">
            <div className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-2">
              Decrease your repayments by
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight transition-all duration-300 animate-value-pop">
              {hasInputs ? fmt(repaymentSavings) : "$0"}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">
              {freqLabel(frequency)}
            </div>
          </div>

          {/* Interest Savings */}
          <div className="bg-linear-to-br from-neutral-950 via-slate-900 to-neutral-900 border border-white/20 rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-950/15">
            <div className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-2">
              Decrease your interest paid by
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight transition-all duration-300 animate-value-pop">
              {hasInputs ? fmt(totalInterestSavings) : "$0"}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">
              over the remaining {T} years
            </div>
          </div>
        </div>

        {/* How does we calculate this? */}
        <button
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors duration-200 mt-5 border-none bg-transparent cursor-pointer font-semibold"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          <span className="w-4.5 h-4.5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black">
            i
          </span>
          How does our refinance calculator work?
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            showInfo ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/10 border border-white/10 rounded-xl p-5 text-xs text-neutral-400 leading-relaxed space-y-2.5">
            <p>
              <strong>Refinance calculations:</strong> We calculate your current
              repayments based on the current balance, rate, and remaining term
              using the standard amortization formula.
            </p>
            <p>
              <strong>Estimated savings:</strong> Repayment savings represent
              the difference between your current estimated payment and the
              payment under the new rate.
            </p>
            <p>
              <strong>Interest savings:</strong> Total interest savings
              represent the cumulative repayment savings over the remaining term
              of the loan (Savings per month × 12 × remaining years).
            </p>
            <p className="mt-2.5 italic opacity-70">
              Refinancing may involve loan setup fees, discharge fees, and
              government charges. Please discuss with Michael to verify if
              refinancing is suitable for your situation.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between gap-4 mt-7 pt-6 border-t border-white/10 flex-wrap">
          <span className="text-xs font-bold text-neutral-300 leading-relaxed">
            Review your refinancing options
            <br />
            with an expert
          </span>
          <a
            href="mailto:michael@traikosfinance.com"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-black text-xs tracking-wider uppercase rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-white/20 active:translate-y-0 cursor-pointer decoration-none"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

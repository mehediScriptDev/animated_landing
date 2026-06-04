import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Helper: Format a number as currency (AUD).
 */
function fmt(n) {
  if (n == null || isNaN(n)) return "$0";
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
 * Calculate monthly interest-only repayment.
 */
function calcIO(principal, annualRate) {
  if (principal <= 0 || annualRate <= 0) return 0;
  return principal * (annualRate / 100 / 12);
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

export default function RepaymentCalculator() {
  /* ── State ─────────────────────────────────────────────────────── */
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestOnly, setInterestOnly] = useState(false);
  const [ioTerm, setIoTerm] = useState("5");
  const [rateOffset, setRateOffset] = useState(0); // in 0.25 steps
  const [showInfo, setShowInfo] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const prevRepayRef = useRef(0);

  /* ── Derived calculations ──────────────────────────────────────── */
  const P = parseNum(loanAmount);
  const R = parseFloat(interestRate) || 0;
  const T = parseInt(loanTerm) || 30;
  const IO_T = parseInt(ioTerm) || 5;

  // Current repayment
  const monthlyPI = calcPI(P, R, T);
  const monthlyIO = calcIO(P, R);
  const currentMonthly = interestOnly ? monthlyIO : monthlyPI;
  const currentRepayment = toFrequency(currentMonthly, frequency);

  // P&I repayment after IO period
  const monthlyAfterIO = interestOnly ? calcPI(P, R, T - IO_T) : 0;
  const afterIORepayment = toFrequency(monthlyAfterIO, frequency);

  // Rate-changed repayment
  const changedMonthlyPI = calcPI(P, R + rateOffset * 0.25, T);
  const changedMonthlyIO = calcIO(P, R + rateOffset * 0.25);
  const changedMonthly = interestOnly ? changedMonthlyIO : changedMonthlyPI;
  const changedRepayment = toFrequency(changedMonthly, frequency);

  // Difference
  const diff = changedRepayment - currentRepayment;

  // Animate on repayment change
  useEffect(() => {
    if (currentRepayment !== prevRepayRef.current) {
      setAnimKey((k) => k + 1);
      prevRepayRef.current = currentRepayment;
    }
  }, [currentRepayment]);

  /* ── Handlers ──────────────────────────────────────────────────── */
  const handleLoanAmount = useCallback((e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setLoanAmount(raw);
  }, []);

  const handleRate = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setInterestRate(val);
  }, []);

  const handleTerm = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setLoanTerm(val);
  }, []);

  const handleIoTerm = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setIoTerm(val);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start text-white">
      {/* ══════════════ LEFT — Current Repayments ══════════════ */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-9 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl">
        <h2 className="text-xl font-black text-white mb-7 tracking-tight">
          Current repayments
        </h2>

        {/* Loan amount */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="repay-loan-amount"
          >
            Loan amount
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">
              $
            </span>
            <input
              id="repay-loan-amount"
              type="text"
              inputMode="numeric"
              className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="500,000"
              value={
                loanAmount ? parseInt(loanAmount).toLocaleString("en-AU") : ""
              }
              onChange={handleLoanAmount}
            />
          </div>
        </div>

        {/* Interest rate */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="repay-rate"
          >
            Interest rate (estimated)
          </label>
          <div className="relative flex items-center">
            <input
              id="repay-rate"
              type="text"
              inputMode="decimal"
              className="w-full pl-4 pr-10 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="6.49"
              value={interestRate}
              onChange={handleRate}
            />
            <span className="absolute right-4 text-sm font-semibold text-neutral-400 pointer-events-none">
              %
            </span>
          </div>
        </div>

        {/* Frequency */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="repay-freq"
          >
            Repayment frequency
          </label>
          <select
            id="repay-freq"
            className="w-full px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="monthly" className="bg-[#0d0b21] text-white">Monthly</option>
            <option value="fortnightly" className="bg-[#0d0b21] text-white">Fortnightly</option>
            <option value="weekly" className="bg-[#0d0b21] text-white">Weekly</option>
          </select>
        </div>

        {/* Loan term */}
        <div className="mb-6 last:mb-0">
          <label
            className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
            htmlFor="repay-term"
          >
            Loan term
          </label>
          <div className="relative flex items-center">
            <input
              id="repay-term"
              type="text"
              inputMode="numeric"
              className="w-full pl-4 pr-12 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="30"
              value={loanTerm}
              onChange={handleTerm}
            />
            <span className="absolute right-4 text-sm font-semibold text-neutral-400 pointer-events-none">
              yrs
            </span>
          </div>
        </div>

        {/* Interest only checkbox */}
        <div className="mb-6 last:mb-0">
          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => setInterestOnly(!interestOnly)}
            role="checkbox"
            aria-checked={interestOnly}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setInterestOnly(!interestOnly);
              }
            }}
          >
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                interestOnly
                  ? "bg-[#c9a84c]/15 border-[#c9a84c]"
                  : "border-white/20 bg-white/10"
              }`}
            >
              <svg
                className={`w-3 h-3 text-[#c9a84c] transition-all duration-200 ${
                  interestOnly ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 6l3 3 5-5" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-neutral-300">
              Interest only repayments
            </span>
          </div>
        </div>

        {/* IO term (shown when checked) */}
        {interestOnly && (
          <div className="mb-6 last:mb-0 mt-3">
            <label
              className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase"
              htmlFor="repay-io-term"
            >
              Interest only term
            </label>
            <div className="relative flex items-center">
              <input
                id="repay-io-term"
                type="text"
                inputMode="numeric"
                className="w-full pl-4 pr-12 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
                placeholder="5"
                value={ioTerm}
                onChange={handleIoTerm}
              />
              <span className="absolute right-4 text-sm font-semibold text-neutral-400 pointer-events-none">
                yrs
              </span>
            </div>
          </div>
        )}

        <hr className="h-px bg-white/10 my-6 border-none" />

        {/* Estimated repayment result */}
        <div
          className="bg-linear-to-br from-neutral-950 via-slate-900 to-neutral-900 border border-[#c9a84c]/15 rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-950/15"
          key={animKey}
        >
          <div className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-2">
            Estimated repayment
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight transition-all duration-300 animate-value-pop">
            {P > 0 && R > 0 ? fmt(currentRepayment) : "$0"}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            {freqLabel(frequency)}
          </div>
        </div>

        {interestOnly && P > 0 && R > 0 && (
          <div className="mt-3 text-[11px] text-neutral-400 text-center leading-normal">
            After {IO_T} year{IO_T !== 1 ? "s" : ""} interest-only, P&I
            repayments will be{" "}
            <strong className="text-white font-bold">
              {fmt(afterIORepayment)}
            </strong>{" "}
            {freqLabel(frequency)}
          </div>
        )}
      </div>

      {/* ══════════════ RIGHT — What if my rate changes? ══════════════ */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-9 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl md:sticky md:top-24">
        <h2 className="text-xl font-black text-white mb-7 tracking-tight">
          What if my rate changes?
        </h2>

        {/* Rate changer */}
        <div className="flex items-center justify-center gap-5 my-6">
          <button
            className="w-11 h-11 rounded-full border border-white/20 bg-white/10 text-white font-bold hover:border-white/30 hover:bg-white/15 hover:text-white active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer text-lg"
            onClick={() => setRateOffset((o) => o - 1)}
            aria-label="Decrease rate"
          >
            −
          </button>
          <div className="text-center min-w-[120px]">
            <div className="text-xl font-bold text-white">
              {rateOffset >= 0 ? "+" : ""}
              {(rateOffset * 0.25).toFixed(2)}%
            </div>
            <div className="text-[11px] text-neutral-400">p.a.</div>
          </div>
          <button
            className="w-11 h-11 rounded-full border border-white/20 bg-white/10 text-white font-bold hover:border-white/30 hover:bg-white/15 hover:text-white active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer text-lg"
            onClick={() => setRateOffset((o) => o + 1)}
            aria-label="Increase rate"
          >
            +
          </button>
        </div>

        {/* Changed repayment result */}
        <div className="bg-linear-to-br from-neutral-950 via-slate-900 to-neutral-900 border border-[#c9a84c]/15 rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-950/15">
          <div className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-2">
            Estimated repayment
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight transition-all duration-300 animate-value-pop">
            {P > 0 && R > 0 ? fmt(changedRepayment) : "$0"}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            {freqLabel(frequency)}
          </div>
        </div>

        {P > 0 && R > 0 && rateOffset !== 0 && (
          <div className="text-xs text-neutral-400 text-center leading-relaxed mt-3">
            An estimated repayment {diff >= 0 ? "increase" : "decrease"} of{" "}
            <strong className="text-white font-bold">
              {fmt(Math.abs(diff))}
            </strong>{" "}
            {freqLabel(frequency)} from current repayments
          </div>
        )}

        {/* How do we calculate this? */}
        <button
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-[#c9a84c] transition-colors duration-200 mt-5 border-none bg-transparent cursor-pointer font-semibold"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          <span className="w-4.5 h-4.5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black">
            i
          </span>
          How do we calculate this?
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            showInfo ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/10 border border-white/10 rounded-xl p-5 text-xs text-neutral-400 leading-relaxed space-y-2.5">
            <p>
              <strong>Principal & Interest:</strong> We use the standard
              amortisation formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1], where P is
              the loan amount, r is the monthly interest rate, and n is the
              total number of payments.
            </p>
            <p>
              <strong>Interest Only:</strong> Monthly payment = Principal ×
              monthly interest rate. After the IO period, repayments switch to
              P&I for the remaining term.
            </p>
            <p>
              <strong>Frequency:</strong> Weekly = monthly × 12 ÷ 52.
              Fortnightly = monthly × 12 ÷ 26.
            </p>
            <p className="mt-2.5 italic opacity-70">
              This calculator provides estimates only. Actual repayments may
              vary based on lender fees, rate changes, and loan conditions.
              Please consult Michael for personalised advice.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between gap-4 mt-7 pt-6 border-t border-white/10 flex-wrap">
          <span className="text-xs font-bold text-neutral-300 leading-relaxed">
            Review your repayment options
            <br />
            with an expert
          </span>
          <a
            href="mailto:michael@traikosfinance.com"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#c9a84c] hover:bg-[#d4b65e] text-neutral-950 font-black text-xs tracking-wider uppercase rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#c9a84c]/20 active:translate-y-0 cursor-pointer decoration-none"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

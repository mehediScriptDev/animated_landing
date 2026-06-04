import { useState } from 'react';

/**
 * Format a number as AUD currency.
 */
function fmt(n) {
  if (n == null || isNaN(n) || n <= 0) return '$0';
  return '$' + Math.round(n).toLocaleString('en-AU');
}

/**
 * Parse a currency string to number.
 */
function parseNum(v) {
  if (typeof v === 'number') return v;
  return parseFloat(String(v).replace(/[^0-9.]/g, '')) || 0;
}

/**
 * Annualise a value based on frequency.
 */
function annualise(val, freq) {
  const n = parseNum(val);
  switch (freq) {
    case 'weekly':      return n * 52;
    case 'fortnightly': return n * 26;
    case 'monthly':     return n * 12;
    case 'quarterly':   return n * 4;
    default:            return n; // annually
  }
}

/**
 * Estimate Australian income tax (simplified 2024-25 brackets for residents).
 */
function estimateTax(grossAnnual) {
  if (grossAnnual <= 18200) return 0;
  if (grossAnnual <= 45000) return (grossAnnual - 18200) * 0.19;
  if (grossAnnual <= 120000) return 5092 + (grossAnnual - 45000) * 0.325;
  if (grossAnnual <= 180000) return 29467 + (grossAnnual - 120000) * 0.37;
  return 51667 + (grossAnnual - 180000) * 0.45;
}

/**
 * HEM (Household Expenditure Measure) benchmark — simplified.
 * Monthly living expenses estimate based on number of dependents.
 */
const HEM_MONTHLY = [
  1400, // 0 dependents
  1800, // 1
  2100, // 2
  2400, // 3
  2650, // 4
  2900, // 5
  3100, // 6
  3300, // 7
];

/**
 * Calculate monthly P&I repayment per $1 borrowed.
 */
function monthlyPerDollar(annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r <= 0 || n <= 0) return 0;
  return (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/**
 * Calculate monthly P&I repayment.
 */
function calcPI(principal, annualRate, years) {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const FREQ_OPTIONS = [
  { value: 'annually', label: 'Annually' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'weekly', label: 'Weekly' },
];

const DEPENDENTS_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  value: i,
  label: i === 0 ? '0' : `${i}`,
}));

export default function BorrowingPowerCalculator() {
  /* ── Applicant state ───────────────────────────────────────────── */
  const [applicants, setApplicants] = useState(1);
  const [dependents, setDependents] = useState(0);
  const [propertyUse, setPropertyUse] = useState('live'); // 'live' | 'investment'

  /* ── Income state ──────────────────────────────────────────────── */
  const [income1, setIncome1] = useState('');
  const [incomeFreq1, setIncomeFreq1] = useState('annually');
  const [otherIncome1, setOtherIncome1] = useState('');
  const [otherIncomeFreq1, setOtherIncomeFreq1] = useState('annually');

  const [income2, setIncome2] = useState('');
  const [incomeFreq2, setIncomeFreq2] = useState('annually');
  const [otherIncome2, setOtherIncome2] = useState('');
  const [otherIncomeFreq2, setOtherIncomeFreq2] = useState('annually');

  /* ── Expenses state ────────────────────────────────────────────── */
  const [expenses, setExpenses] = useState('');
  const [expensesFreq, setExpensesFreq] = useState('monthly');
  const [useHEM, setUseHEM] = useState(false);

  /* ── Liabilities ───────────────────────────────────────────────── */
  const [otherLoanRepay, setOtherLoanRepay] = useState('');
  const [otherLoanFreq, setOtherLoanFreq] = useState('monthly');
  const [creditCardLimits, setCreditCardLimits] = useState('');

  /* ── Estimator ─────────────────────────────────────────────────── */
  const [borrowDesired, setBorrowDesired] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  /* ── Calculations ──────────────────────────────────────────────── */
  // Annual gross income
  const grossAnnual1 = annualise(income1, incomeFreq1) + annualise(otherIncome1, otherIncomeFreq1);
  const grossAnnual2 = applicants === 2
    ? annualise(income2, incomeFreq2) + annualise(otherIncome2, otherIncomeFreq2)
    : 0;
  const totalGrossAnnual = grossAnnual1 + grossAnnual2;

  // Estimated tax
  const tax1 = estimateTax(grossAnnual1);
  const tax2 = applicants === 2 ? estimateTax(grossAnnual2) : 0;
  const totalTax = tax1 + tax2;

  // Net annual income
  const netAnnual = totalGrossAnnual - totalTax;

  // Annual expenses
  const annualExpenses = useHEM
    ? (HEM_MONTHLY[Math.min(dependents, 7)] || 1400) * 12
    : annualise(expenses, expensesFreq);

  // Annual loan repayments
  const annualLoanRepay = annualise(otherLoanRepay, otherLoanFreq);

  // Credit card servicing (3.8% of total limits per month × 12)
  const annualCCServicing = parseNum(creditCardLimits) * 0.038 * 12;

  // Monthly surplus
  const monthlySurplus = (netAnnual - annualExpenses - annualLoanRepay - annualCCServicing) / 12;

  // Borrowing power estimates
  const ASSESSMENT_RATE_CONSERVATIVE = 7.5;
  const ASSESSMENT_RATE_MAX = propertyUse === 'investment' ? 6.8 : 6.5;
  const TERM = 30;

  const perDollarConservative = monthlyPerDollar(ASSESSMENT_RATE_CONSERVATIVE, TERM);
  const perDollarMax = monthlyPerDollar(ASSESSMENT_RATE_MAX, TERM);

  const conservativeMax = perDollarConservative > 0 ? Math.max(0, monthlySurplus / perDollarConservative) : 0;
  const maximumMax = perDollarMax > 0 ? Math.max(0, monthlySurplus / perDollarMax) : 0;

  // Repayment estimator
  const desiredAmount = parseNum(borrowDesired);
  const estimatedRepayment = calcPI(desiredAmount, 6.49, 30);

  /* ── Input formatter helper ────────────────────────────────────── */
  const numInput = (val) => {
    const n = parseNum(val);
    return n > 0 ? n.toLocaleString('en-AU') : '';
  };

  const handleNumChange = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  /* ── Is any income provided? ───────────────────────────────────── */
  const hasIncome = parseNum(income1) > 0 || (applicants === 2 && parseNum(income2) > 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start text-white">
      {/* ══════════════ LEFT — Inputs ══════════════ */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-9 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl [&_input]:text-[0.92rem] [&_select]:text-[0.92rem] sm:[&_input]:text-base sm:[&_select]:text-base">
        <h2 className="text-xl font-black text-white mb-7 tracking-tight">Your details</h2>

        {/* Number of applicants */}
        <div className="mb-6 last:mb-0">
          <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase">Number of applicants</label>
          <div className="flex rounded-xl overflow-hidden border border-white/10">
            <button
              className={`flex-1 py-3 text-xs font-bold transition-all duration-200 border-none cursor-pointer border-r border-white/10 last:border-r-0 ${
                applicants === 1
                  ? 'bg-[#c9a84c]/15 text-[#c9a84c]'
                  : 'bg-white/10 text-neutral-400 hover:bg-white/15'
              }`}
              onClick={() => setApplicants(1)}
              type="button"
            >
              1
            </button>
            <button
              className={`flex-1 py-3 text-xs font-bold transition-all duration-200 border-none cursor-pointer border-r border-white/10 last:border-r-0 ${
                applicants === 2
                  ? 'bg-[#c9a84c]/15 text-[#c9a84c]'
                  : 'bg-white/10 text-neutral-400 hover:bg-white/15'
              }`}
              onClick={() => setApplicants(2)}
              type="button"
            >
              2
            </button>
          </div>
        </div>

        {/* Number of dependents */}
        <div className="mb-6 last:mb-0">
          <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase" htmlFor="bp-dependents">
            Number of dependents
          </label>
          <select
            id="bp-dependents"
            className="w-full px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat"
            value={dependents}
            onChange={(e) => setDependents(parseInt(e.target.value))}
          >
            {DEPENDENTS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-[#0d0b21] text-white">{o.label}</option>
            ))}
          </select>
        </div>

        {/* Property use */}
        <div className="mb-6 last:mb-0">
          <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase">Property use</label>
          <div className="flex rounded-xl overflow-hidden border border-white/10">
            <button
              className={`flex-1 py-3 text-xs font-bold transition-all duration-200 border-none cursor-pointer border-r border-white/10 last:border-r-0 ${
                propertyUse === 'live'
                  ? 'bg-[#c9a84c]/15 text-[#c9a84c]'
                  : 'bg-white/10 text-neutral-400 hover:bg-white/15'
              }`}
              onClick={() => setPropertyUse('live')}
              type="button"
            >
              To live in
            </button>
            <button
              className={`flex-1 py-3 text-xs font-bold transition-all duration-200 border-none cursor-pointer border-r border-white/10 last:border-r-0 ${
                propertyUse === 'investment'
                  ? 'bg-[#c9a84c]/15 text-[#c9a84c]'
                  : 'bg-white/10 text-neutral-400 hover:bg-white/15'
              }`}
              onClick={() => setPropertyUse('investment')}
              type="button"
            >
              Investment
            </button>
          </div>
        </div>

        <hr className="h-px bg-white/10 my-6 border-none" />

        {/* ── Applicant 1 Income ──────────────────────────────────── */}
        <div className="mb-6 last:mb-0">
          <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase" htmlFor="bp-income-1">
            Income (before tax){applicants === 2 ? ' — Applicant 1' : ''}
          </label>
          <div className="flex gap-2">
            <div className="relative flex items-center flex-1">
              <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">$</span>
              <input
                id="bp-income-1"
                type="text"
                inputMode="numeric"
                className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
                placeholder="100,000"
                value={numInput(income1)}
                onChange={handleNumChange(setIncome1)}
              />
            </div>
            <select
              className="px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat min-width-[130px]"
              value={incomeFreq1}
              onChange={(e) => setIncomeFreq1(e.target.value)}
            >
              {FREQ_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#0d0b21] text-white">{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 last:mb-0">
          <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase" htmlFor="bp-other-income-1">
            Other income{applicants === 2 ? ' — Applicant 1' : ''}
          </label>
          <div className="flex gap-2">
            <div className="relative flex items-center flex-1">
              <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">$</span>
              <input
                id="bp-other-income-1"
                type="text"
                inputMode="numeric"
                className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
                placeholder="0"
                value={numInput(otherIncome1)}
                onChange={handleNumChange(setOtherIncome1)}
              />
            </div>
            <select
              className="px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat min-width-[130px]"
              value={otherIncomeFreq1}
              onChange={(e) => setOtherIncomeFreq1(e.target.value)}
            >
              {FREQ_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#0d0b21] text-white">{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Applicant 2 Income (if 2 applicants) ───────────────── */}
        {applicants === 2 && (
          <>
            <hr className="h-px bg-white/10 my-6 border-none" />
            <div className="mb-6 last:mb-0">
              <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase" htmlFor="bp-income-2">
                Income (before tax) — Applicant 2
              </label>
              <div className="flex gap-2">
                <div className="relative flex items-center flex-1">
                  <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">$</span>
                  <input
                    id="bp-income-2"
                    type="text"
                    inputMode="numeric"
                    className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
                    placeholder="80,000"
                    value={numInput(income2)}
                    onChange={handleNumChange(setIncome2)}
                  />
                </div>
                <select
                  className="px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat min-width-[130px]"
                  value={incomeFreq2}
                  onChange={(e) => setIncomeFreq2(e.target.value)}
                >
                  {FREQ_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#0d0b21] text-white">{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6 last:mb-0">
              <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase" htmlFor="bp-other-income-2">
                Other income — Applicant 2
              </label>
              <div className="flex gap-2">
                <div className="relative flex items-center flex-1">
                  <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">$</span>
                  <input
                    id="bp-other-income-2"
                    type="text"
                    inputMode="numeric"
                    className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
                    placeholder="0"
                    value={numInput(otherIncome2)}
                    onChange={handleNumChange(setOtherIncome2)}
                  />
                </div>
                <select
                  className="px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat min-width-[130px]"
                  value={otherIncomeFreq2}
                  onChange={(e) => setOtherIncomeFreq2(e.target.value)}
                >
                  {FREQ_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#0d0b21] text-white">{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <hr className="h-px bg-white/10 my-6 border-none" />

        {/* ── Expenses ───────────────────────────────────────────── */}
        <div className="mb-6 last:mb-0">
          <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase" htmlFor="bp-expenses">
            Total living expenses
          </label>
          {!useHEM && (
            <div className="flex gap-2">
              <div className="relative flex items-center flex-1">
                <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">$</span>
                <input
                  id="bp-expenses"
                  type="text"
                  inputMode="numeric"
                  className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
                  placeholder="3,000"
                  value={numInput(expenses)}
                  onChange={handleNumChange(setExpenses)}
                />
              </div>
              <select
                className="px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat min-width-[130px]"
                value={expensesFreq}
                onChange={(e) => setExpensesFreq(e.target.value)}
              >
                {FREQ_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#0d0b21] text-white">{o.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mb-6 last:mb-0">
          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => setUseHEM(!useHEM)}
            role="checkbox"
            aria-checked={useHEM}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setUseHEM(!useHEM);
              }
            }}
          >
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
              useHEM ? 'bg-[#c9a84c]/15 border-[#c9a84c]' : 'border-white/20 bg-white/10'
            }`}>
              <svg className={`w-3 h-3 text-[#c9a84c] transition-all duration-200 ${
                useHEM ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6l3 3 5-5" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-neutral-300">Work it out later</span>
          </div>
          {useHEM && (
            <div className="text-xs text-neutral-400 mt-1.5 ml-[32px]">
              Using estimated expenses of {fmt(HEM_MONTHLY[Math.min(dependents, 7)])}/month based on {dependents} dependent{dependents !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        <hr className="h-px bg-white/10 my-6 border-none" />

        {/* ── Liabilities ────────────────────────────────────────── */}
        <div className="mb-6 last:mb-0">
          <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase" htmlFor="bp-other-loans">
            Other loan repayments
          </label>
          <div className="flex gap-2">
            <div className="relative flex items-center flex-1">
              <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">$</span>
              <input
                id="bp-other-loans"
                type="text"
                inputMode="numeric"
                className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
                placeholder="0"
                value={numInput(otherLoanRepay)}
                onChange={handleNumChange(setOtherLoanRepay)}
              />
            </div>
            <select
              className="px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat min-width-[130px]"
              value={otherLoanFreq}
              onChange={(e) => setOtherLoanFreq(e.target.value)}
            >
              {FREQ_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#0d0b21] text-white">{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 last:mb-0">
          <label className="block text-xs font-bold text-neutral-300 mb-2 tracking-wide uppercase" htmlFor="bp-credit-cards">
            Credit card limits
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">$</span>
            <input
              id="bp-credit-cards"
              type="text"
              inputMode="numeric"
              className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold placeholder-white/40 focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="0"
              value={numInput(creditCardLimits)}
              onChange={handleNumChange(setCreditCardLimits)}
            />
          </div>
        </div>
      </div>

      {/* ══════════════ RIGHT — Results (sticky) ══════════════ */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-9 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl md:sticky md:top-24">
        <h2 className="text-xl font-black text-white mb-7 tracking-tight">Your borrowing power</h2>

        {/* Dual result cards */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-linear-to-br from-neutral-950 via-slate-900 to-neutral-900 border border-[#c9a84c]/15 rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-950/15">
            <div className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-2">Conservative</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight transition-all duration-300 animate-value-pop">
              {hasIncome ? fmt(conservativeMax) : '—'}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">at {ASSESSMENT_RATE_CONSERVATIVE}% assessment</div>
          </div>
          <div className="bg-linear-to-br from-neutral-950 via-slate-900 to-neutral-900 border border-[#c9a84c]/15 rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-950/15">
            <div className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-2">Maximum</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight transition-all duration-300 animate-value-pop">
              {hasIncome ? fmt(maximumMax) : '—'}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">at {ASSESSMENT_RATE_MAX}% assessment</div>
          </div>
        </div>

        {/* Repayment estimator */}
        <div className="bg-white/10 border border-white/10 rounded-xl p-5 mt-5">
          <div className="text-xs font-bold text-neutral-300 mb-3">
            How much would you like to borrow?
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-sm font-semibold text-neutral-400 pointer-events-none">$</span>
            <input
              id="bp-borrow-desired"
              type="text"
              inputMode="numeric"
              className="w-full pl-8 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white font-semibold focus:outline-hidden focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/5 transition-all duration-200"
              placeholder="500,000"
              value={numInput(borrowDesired)}
              onChange={handleNumChange(setBorrowDesired)}
            />
          </div>
          {desiredAmount > 0 && (
            <div className="flex items-baseline gap-1.5 mt-3 flex-wrap">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-white">{fmt(estimatedRepayment)}</span>
              <span className="text-xs text-neutral-400">per month (est. at 6.49% p.a.)</span>
            </div>
          )}
        </div>

        {/* How do we calculate? */}
        <button
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-[#c9a84c] transition-colors duration-200 mt-5 border-none bg-transparent cursor-pointer font-semibold"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          <span className="w-4.5 h-4.5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black">i</span>
          How do we calculate this?
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${
          showInfo ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/10 border border-white/10 rounded-xl p-5 text-xs text-neutral-400 leading-relaxed space-y-2.5">
            <p>
              <strong>Income assessment:</strong> We annualise your income and estimate tax
              using the 2024-25 Australian individual tax brackets.
            </p>
            <p>
              <strong>Expense assessment:</strong> Your living expenses are either entered directly
              or estimated using the Household Expenditure Measure (HEM) benchmark based on
              your number of dependents.
            </p>
            <p>
              <strong>Credit cards:</strong> Lenders typically assess credit card limits at 3.8%
              of the total limit as a monthly commitment, regardless of your actual balance.
            </p>
            <p>
              <strong>Borrowing power:</strong> Your monthly surplus is divided by the monthly
              repayment per dollar at the assessment rate (conservative: {ASSESSMENT_RATE_CONSERVATIVE}%,
              maximum: {ASSESSMENT_RATE_MAX}%) over a 30-year P&I term.
            </p>
            <p className="mt-2.5 italic opacity-70">
              This is an estimate only. Lender policies, credit history, and property type
              all affect your actual borrowing power. Contact Michael for a personalised assessment.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between gap-4 mt-7 pt-6 border-t border-white/10 flex-wrap">
          <span className="text-xs font-bold text-neutral-300 leading-relaxed">
            Discuss your borrowing power<br />with an expert
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

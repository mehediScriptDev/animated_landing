import { useState, useCallback, useEffect, useRef } from 'react';

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
    <div className="calc-grid">
      {/* ══════════════ LEFT — Inputs ══════════════ */}
      <div className="calc-card">
        <h2 className="calc-card-title">Your details</h2>

        {/* Number of applicants */}
        <div className="calc-field">
          <label className="calc-label">Number of applicants</label>
          <div className="calc-toggle-group">
            <button
              className={`calc-toggle-btn ${applicants === 1 ? 'active' : ''}`}
              onClick={() => setApplicants(1)}
              type="button"
            >
              1
            </button>
            <button
              className={`calc-toggle-btn ${applicants === 2 ? 'active' : ''}`}
              onClick={() => setApplicants(2)}
              type="button"
            >
              2
            </button>
          </div>
        </div>

        {/* Number of dependents */}
        <div className="calc-field">
          <label className="calc-label" htmlFor="bp-dependents">
            Number of dependents
          </label>
          <select
            id="bp-dependents"
            className="calc-select"
            style={{ width: '100%' }}
            value={dependents}
            onChange={(e) => setDependents(parseInt(e.target.value))}
          >
            {DEPENDENTS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Property use */}
        <div className="calc-field">
          <label className="calc-label">Property use</label>
          <div className="calc-toggle-group">
            <button
              className={`calc-toggle-btn ${propertyUse === 'live' ? 'active' : ''}`}
              onClick={() => setPropertyUse('live')}
              type="button"
            >
              To live in
            </button>
            <button
              className={`calc-toggle-btn ${propertyUse === 'investment' ? 'active' : ''}`}
              onClick={() => setPropertyUse('investment')}
              type="button"
            >
              Investment
            </button>
          </div>
        </div>

        <hr className="calc-divider" />

        {/* ── Applicant 1 Income ──────────────────────────────────── */}
        <div className="calc-field">
          <label className="calc-label" htmlFor="bp-income-1">
            Income (before tax){applicants === 2 ? ' — Applicant 1' : ''}
          </label>
          <div className="calc-input-group">
            <div className="calc-input-wrap" style={{ flex: 1 }}>
              <span className="calc-input-prefix">$</span>
              <input
                id="bp-income-1"
                type="text"
                inputMode="numeric"
                className="calc-input has-prefix"
                placeholder="100,000"
                value={numInput(income1)}
                onChange={handleNumChange(setIncome1)}
              />
            </div>
            <select
              className="calc-select"
              value={incomeFreq1}
              onChange={(e) => setIncomeFreq1(e.target.value)}
            >
              {FREQ_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="calc-field">
          <label className="calc-label" htmlFor="bp-other-income-1">
            Other income{applicants === 2 ? ' — Applicant 1' : ''}
          </label>
          <div className="calc-input-group">
            <div className="calc-input-wrap" style={{ flex: 1 }}>
              <span className="calc-input-prefix">$</span>
              <input
                id="bp-other-income-1"
                type="text"
                inputMode="numeric"
                className="calc-input has-prefix"
                placeholder="0"
                value={numInput(otherIncome1)}
                onChange={handleNumChange(setOtherIncome1)}
              />
            </div>
            <select
              className="calc-select"
              value={otherIncomeFreq1}
              onChange={(e) => setOtherIncomeFreq1(e.target.value)}
            >
              {FREQ_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Applicant 2 Income (if 2 applicants) ───────────────── */}
        {applicants === 2 && (
          <>
            <hr className="calc-divider" />
            <div className="calc-field">
              <label className="calc-label" htmlFor="bp-income-2">
                Income (before tax) — Applicant 2
              </label>
              <div className="calc-input-group">
                <div className="calc-input-wrap" style={{ flex: 1 }}>
                  <span className="calc-input-prefix">$</span>
                  <input
                    id="bp-income-2"
                    type="text"
                    inputMode="numeric"
                    className="calc-input has-prefix"
                    placeholder="80,000"
                    value={numInput(income2)}
                    onChange={handleNumChange(setIncome2)}
                  />
                </div>
                <select
                  className="calc-select"
                  value={incomeFreq2}
                  onChange={(e) => setIncomeFreq2(e.target.value)}
                >
                  {FREQ_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="calc-field">
              <label className="calc-label" htmlFor="bp-other-income-2">
                Other income — Applicant 2
              </label>
              <div className="calc-input-group">
                <div className="calc-input-wrap" style={{ flex: 1 }}>
                  <span className="calc-input-prefix">$</span>
                  <input
                    id="bp-other-income-2"
                    type="text"
                    inputMode="numeric"
                    className="calc-input has-prefix"
                    placeholder="0"
                    value={numInput(otherIncome2)}
                    onChange={handleNumChange(setOtherIncome2)}
                  />
                </div>
                <select
                  className="calc-select"
                  value={otherIncomeFreq2}
                  onChange={(e) => setOtherIncomeFreq2(e.target.value)}
                >
                  {FREQ_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <hr className="calc-divider" />

        {/* ── Expenses ───────────────────────────────────────────── */}
        <div className="calc-field">
          <label className="calc-label" htmlFor="bp-expenses">
            Total living expenses
          </label>
          {!useHEM && (
            <div className="calc-input-group">
              <div className="calc-input-wrap" style={{ flex: 1 }}>
                <span className="calc-input-prefix">$</span>
                <input
                  id="bp-expenses"
                  type="text"
                  inputMode="numeric"
                  className="calc-input has-prefix"
                  placeholder="3,000"
                  value={numInput(expenses)}
                  onChange={handleNumChange(setExpenses)}
                />
              </div>
              <select
                className="calc-select"
                value={expensesFreq}
                onChange={(e) => setExpensesFreq(e.target.value)}
              >
                {FREQ_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="calc-field">
          <div
            className="calc-checkbox-wrap"
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
            <div className={`calc-checkbox ${useHEM ? 'checked' : ''}`}>
              <svg className="calc-checkbox-check" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6l3 3 5-5" />
              </svg>
            </div>
            <span className="calc-checkbox-label">Work it out later</span>
          </div>
          {useHEM && (
            <div className="calc-sublabel" style={{ marginLeft: 30, marginTop: 6 }}>
              Using estimated expenses of {fmt(HEM_MONTHLY[Math.min(dependents, 7)])}/month based on {dependents} dependent{dependents !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        <hr className="calc-divider" />

        {/* ── Liabilities ────────────────────────────────────────── */}
        <div className="calc-field">
          <label className="calc-label" htmlFor="bp-other-loans">
            Other loan repayments
          </label>
          <div className="calc-input-group">
            <div className="calc-input-wrap" style={{ flex: 1 }}>
              <span className="calc-input-prefix">$</span>
              <input
                id="bp-other-loans"
                type="text"
                inputMode="numeric"
                className="calc-input has-prefix"
                placeholder="0"
                value={numInput(otherLoanRepay)}
                onChange={handleNumChange(setOtherLoanRepay)}
              />
            </div>
            <select
              className="calc-select"
              value={otherLoanFreq}
              onChange={(e) => setOtherLoanFreq(e.target.value)}
            >
              {FREQ_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="calc-field">
          <label className="calc-label" htmlFor="bp-credit-cards">
            Credit card limits
          </label>
          <div className="calc-input-wrap">
            <span className="calc-input-prefix">$</span>
            <input
              id="bp-credit-cards"
              type="text"
              inputMode="numeric"
              className="calc-input has-prefix"
              placeholder="0"
              value={numInput(creditCardLimits)}
              onChange={handleNumChange(setCreditCardLimits)}
            />
          </div>
        </div>
      </div>

      {/* ══════════════ RIGHT — Results (sticky) ══════════════ */}
      <div className="calc-card calc-sticky">
        <h2 className="calc-card-title">Your borrowing power</h2>

        {/* Dual result cards */}
        <div className="calc-result-duo">
          <div className="calc-result-card">
            <div className="calc-result-card-label">Conservative</div>
            <div className="calc-result-card-value">
              {hasIncome ? fmt(conservativeMax) : '—'}
            </div>
            <div className="calc-result-card-sub">at {ASSESSMENT_RATE_CONSERVATIVE}% assessment</div>
          </div>
          <div className="calc-result-card">
            <div className="calc-result-card-label">Maximum</div>
            <div className="calc-result-card-value">
              {hasIncome ? fmt(maximumMax) : '—'}
            </div>
            <div className="calc-result-card-sub">at {ASSESSMENT_RATE_MAX}% assessment</div>
          </div>
        </div>

        {/* Repayment estimator */}
        <div className="calc-estimator">
          <div className="calc-estimator-title">
            How much would you like to borrow?
          </div>
          <div className="calc-input-wrap">
            <span className="calc-input-prefix">$</span>
            <input
              id="bp-borrow-desired"
              type="text"
              inputMode="numeric"
              className="calc-input has-prefix"
              placeholder="500,000"
              value={numInput(borrowDesired)}
              onChange={handleNumChange(setBorrowDesired)}
            />
          </div>
          {desiredAmount > 0 && (
            <div className="calc-estimator-result">
              <span className="calc-estimator-value">{fmt(estimatedRepayment)}</span>
              <span className="calc-estimator-period">per month (est. at 6.49% p.a.)</span>
            </div>
          )}
        </div>

        {/* How do we calculate? */}
        <button
          className="calc-info-link"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          <span className="calc-info-icon">i</span>
          How do we calculate this?
        </button>

        <div className={`calc-info-panel ${showInfo ? 'open' : ''}`}>
          <div className="calc-info-content">
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
            <p style={{ marginTop: 8, fontStyle: 'italic', opacity: 0.7 }}>
              This is an estimate only. Lender policies, credit history, and property type
              all affect your actual borrowing power. Contact Michael for a personalised assessment.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="calc-cta">
          <span className="calc-cta-text">
            Discuss your borrowing power<br />with an expert
          </span>
          <a
            href="mailto:michael@traikosfinance.com"
            className="calc-cta-btn"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

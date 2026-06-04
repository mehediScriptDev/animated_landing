import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Helper: Format a number as currency (AUD).
 */
function fmt(n) {
  if (n == null || isNaN(n)) return '$0';
  return '$' + Math.round(n).toLocaleString('en-AU');
}

/**
 * Helper: Parse a currency-style string back to a number.
 */
function parseNum(v) {
  if (typeof v === 'number') return v;
  return parseFloat(String(v).replace(/[^0-9.]/g, '')) || 0;
}

/**
 * Calculate monthly P&I repayment.
 * M = P × [r(1+r)^n] / [(1+r)^n − 1]
 */
function calcPI(principal, annualRate, years) {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
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
  if (freq === 'weekly') return (monthly * 12) / 52;
  if (freq === 'fortnightly') return (monthly * 12) / 26;
  return monthly;
}

function freqLabel(freq) {
  if (freq === 'weekly') return 'per week';
  if (freq === 'fortnightly') return 'per fortnight';
  return 'per month';
}

export default function RepaymentCalculator() {
  /* ── State ─────────────────────────────────────────────────────── */
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestOnly, setInterestOnly] = useState(false);
  const [ioTerm, setIoTerm] = useState('5');
  const [rateOffset, setRateOffset] = useState(0); // in 0.25 steps
  const [showInfo, setShowInfo] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const prevRepayRef = useRef(0);

  /* ── Derived calculations ──────────────────────────────────────── */
  const P = parseNum(loanAmount);
  const R = parseFloat(interestRate) || 0;
  const T = parseInt(loanTerm) || 30;
  const IO_T = parseInt(ioTerm) || 5;
  const newR = R + rateOffset * 0.25;

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
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setLoanAmount(raw);
  }, []);

  const handleRate = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setInterestRate(val);
  }, []);

  const handleTerm = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setLoanTerm(val);
  }, []);

  const handleIoTerm = useCallback((e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setIoTerm(val);
  }, []);

  return (
    <div className="calc-grid">
      {/* ══════════════ LEFT — Current Repayments ══════════════ */}
      <div className="calc-card">
        <h2 className="calc-card-title">Current repayments</h2>

        {/* Loan amount */}
        <div className="calc-field">
          <label className="calc-label" htmlFor="repay-loan-amount">
            Loan amount
          </label>
          <div className="calc-input-wrap">
            <span className="calc-input-prefix">$</span>
            <input
              id="repay-loan-amount"
              type="text"
              inputMode="numeric"
              className="calc-input has-prefix"
              placeholder="500,000"
              value={loanAmount ? parseInt(loanAmount).toLocaleString('en-AU') : ''}
              onChange={handleLoanAmount}
            />
          </div>
        </div>

        {/* Interest rate */}
        <div className="calc-field">
          <label className="calc-label" htmlFor="repay-rate">
            Interest rate (estimated)
          </label>
          <div className="calc-input-wrap">
            <input
              id="repay-rate"
              type="text"
              inputMode="decimal"
              className="calc-input has-suffix"
              placeholder="6.49"
              value={interestRate}
              onChange={handleRate}
            />
            <span className="calc-input-suffix">%</span>
          </div>
        </div>

        {/* Frequency */}
        <div className="calc-field">
          <label className="calc-label" htmlFor="repay-freq">
            Repayment frequency
          </label>
          <select
            id="repay-freq"
            className="calc-select"
            style={{ width: '100%' }}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Loan term */}
        <div className="calc-field">
          <label className="calc-label" htmlFor="repay-term">
            Loan term
          </label>
          <div className="calc-input-wrap">
            <input
              id="repay-term"
              type="text"
              inputMode="numeric"
              className="calc-input has-suffix"
              placeholder="30"
              value={loanTerm}
              onChange={handleTerm}
            />
            <span className="calc-input-suffix">yrs</span>
          </div>
        </div>

        {/* Interest only checkbox */}
        <div className="calc-field">
          <div
            className="calc-checkbox-wrap"
            onClick={() => setInterestOnly(!interestOnly)}
            role="checkbox"
            aria-checked={interestOnly}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setInterestOnly(!interestOnly);
              }
            }}
          >
            <div className={`calc-checkbox ${interestOnly ? 'checked' : ''}`}>
              <svg className="calc-checkbox-check" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6l3 3 5-5" />
              </svg>
            </div>
            <span className="calc-checkbox-label">Interest only repayments</span>
          </div>
        </div>

        {/* IO term (shown when checked) */}
        {interestOnly && (
          <div className="calc-field" style={{ marginTop: 12 }}>
            <label className="calc-label" htmlFor="repay-io-term">
              Interest only term
            </label>
            <div className="calc-input-wrap">
              <input
                id="repay-io-term"
                type="text"
                inputMode="numeric"
                className="calc-input has-suffix"
                placeholder="5"
                value={ioTerm}
                onChange={handleIoTerm}
              />
              <span className="calc-input-suffix">yrs</span>
            </div>
          </div>
        )}

        <hr className="calc-divider" />

        {/* Estimated repayment result */}
        <div className="calc-result-card" key={animKey}>
          <div className="calc-result-card-label">Estimated repayment</div>
          <div className="calc-result-card-value calc-value-animate">
            {P > 0 && R > 0 ? fmt(currentRepayment) : '$0'}
          </div>
          <div className="calc-result-card-sub">{freqLabel(frequency)}</div>
        </div>

        {interestOnly && P > 0 && R > 0 && (
          <div style={{ marginTop: 12, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 1.5 }}>
            After {IO_T} year{IO_T !== 1 ? 's' : ''} interest-only, P&I repayments will be{' '}
            <strong style={{ color: '#fff' }}>{fmt(afterIORepayment)}</strong> {freqLabel(frequency)}
          </div>
        )}
      </div>

      {/* ══════════════ RIGHT — What if my rate changes? ══════════════ */}
      <div className="calc-card calc-sticky">
        <h2 className="calc-card-title">What if my rate changes?</h2>

        {/* Rate changer */}
        <div className="calc-rate-changer">
          <button
            className="calc-rate-btn"
            onClick={() => setRateOffset((o) => o - 1)}
            aria-label="Decrease rate"
          >
            −
          </button>
          <div className="calc-rate-display">
            <div className="calc-rate-value">
              {rateOffset >= 0 ? '+' : ''}
              {(rateOffset * 0.25).toFixed(2)}%
            </div>
            <div className="calc-rate-unit">p.a.</div>
          </div>
          <button
            className="calc-rate-btn"
            onClick={() => setRateOffset((o) => o + 1)}
            aria-label="Increase rate"
          >
            +
          </button>
        </div>

        {/* Changed repayment result */}
        <div className="calc-result-card">
          <div className="calc-result-card-label">Estimated repayment</div>
          <div className="calc-result-card-value">
            {P > 0 && R > 0 ? fmt(changedRepayment) : '$0'}
          </div>
          <div className="calc-result-card-sub">{freqLabel(frequency)}</div>
        </div>

        {P > 0 && R > 0 && rateOffset !== 0 && (
          <div className="calc-diff-text">
            An estimated repayment {diff >= 0 ? 'increase' : 'decrease'} of{' '}
            <strong>{fmt(Math.abs(diff))}</strong> {freqLabel(frequency)} from current repayments
          </div>
        )}

        {/* How do we calculate this? */}
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
              <strong>Principal & Interest:</strong> We use the standard amortisation formula:
              M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1], where P is the loan amount, r is the monthly
              interest rate, and n is the total number of payments.
            </p>
            <p>
              <strong>Interest Only:</strong> Monthly payment = Principal × monthly interest rate.
              After the IO period, repayments switch to P&I for the remaining term.
            </p>
            <p>
              <strong>Frequency:</strong> Weekly = monthly × 12 ÷ 52. Fortnightly = monthly × 12 ÷ 26.
            </p>
            <p style={{ marginTop: 8, fontStyle: 'italic', opacity: 0.7 }}>
              This calculator provides estimates only. Actual repayments may vary based on
              lender fees, rate changes, and loan conditions. Please consult Michael for
              personalised advice.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="calc-cta">
          <span className="calc-cta-text">
            Review your repayment options<br />with an expert
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

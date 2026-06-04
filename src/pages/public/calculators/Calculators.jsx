import { useState } from 'react';
import SEO from '../../../components/SEO';
import BorrowingPowerCalculator from './BorrowingPowerCalculator';
import RepaymentCalculator from './RepaymentCalculator';
import './Calculators.css';

const TABS = [
  {
    id: 'borrowing',
    label: 'Borrowing Power',
    title: 'Borrowing Power Calculator',
    subtitle:
      'Find out how much you could borrow based on your income, expenses, and financial commitments.',
    seoTitle: 'Borrowing Power Calculator',
    seoDesc:
      'Calculate your estimated borrowing power for a home loan. Free calculator from Traikos Finance — your Melbourne mortgage broker.',
  },
  {
    id: 'repayment',
    label: 'Repayments',
    title: 'Home loan repayment calculator',
    subtitle:
      'Get a quick estimate of your home loan repayments and see the impact that changing interest rates will have on your scenario.',
    seoTitle: 'Home Loan Repayment Calculator',
    seoDesc:
      'Estimate your monthly home loan repayments and see how rate changes affect you. Free calculator from Traikos Finance.',
  },
];

export default function Calculators() {
  const [activeTab, setActiveTab] = useState('borrowing');
  const tab = TABS.find((t) => t.id === activeTab);

  return (
    <>
      <SEO
        title={tab.seoTitle}
        description={tab.seoDesc}
        canonical={`https://traikosfinance.com/calculators`}
      />

      <main id="main-content" tabIndex={-1} className="calc-page">
        <div className="calc-container">
          {/* ── Tab navigation ─────────────────────────────────── */}
          <div className="calc-tabs" role="tablist" aria-label="Calculator type">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTab === t.id}
                aria-controls={`panel-${t.id}`}
                className={`calc-tab ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Header ─────────────────────────────────────────── */}
          <div className="calc-page-header">
            <h1 className="calc-page-title">{tab.title}</h1>
            <p className="calc-page-subtitle">{tab.subtitle}</p>
          </div>

          {/* ── Calculator panel ───────────────────────────────── */}
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={activeTab}
          >
            {activeTab === 'borrowing' && <BorrowingPowerCalculator />}
            {activeTab === 'repayment' && <RepaymentCalculator />}
          </div>
        </div>
      </main>
    </>
  );
}

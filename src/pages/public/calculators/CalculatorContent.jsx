import { useState } from "react";

const FAQ_DATA = {
  borrowing: {
    title: "Your borrowing power questions, answered",
    introTitle: "What factors shape your borrowing power?",
    introDesc1: "Lenders look at your borrowing capacity using several key metrics. Your gross income is annualised and reduced by estimated tax. Living expenses are evaluated against either your actual declared expenses or the Household Expenditure Measure (HEM) benchmark for your household size and dependents.",
    introDesc2: "Additionally, credit card limits are heavily scrutinized. Lenders typically assume a monthly servicing commitment of 3% to 3.8% of your total credit limit, regardless of whether you carry a balance. Reducing card limits or closing unused accounts is one of the easiest ways to boost your borrowing estimate.",
    bannerText: "Want a precise borrowing power assessment? Michael can compare policies from over 30 lenders to find your maximum limit.",
    faqs: [
      {
        q: "What is the difference between borrowing power and borrowing capacity?",
        a: "They are generally the same term. Borrowing power or capacity refers to the estimated amount a bank is willing to lend you based on your financial position, income, and liabilities."
      },
      {
        q: "Do I need a credit check to use this borrowing power calculator?",
        a: "No. This calculator is a self-service estimation tool and does not run a credit check or affect your credit score in any way. A formal credit check is only completed when you submit a home loan application."
      },
      {
        q: "Does my credit card limit reduce how much I can borrow?",
        a: "Yes, significantly. Lenders assess credit cards based on their total limits, not your balance. For example, a $10,000 credit card limit can reduce your borrowing power by up to $35,000 to $40,000 because lenders assume you could spend up to the limit at any time."
      },
      {
        q: "How can I increase my borrowing power?",
        a: "You can increase your borrowing power by reducing or closing credit card limits, paying down existing personal loans or car loans, saving a larger deposit, and cleaning up your discretionary living expenses in the 3 months leading up to your application."
      }
    ]
  },
  repayment: {
    title: "Your home loan repayment questions, answered",
    introTitle: "How are mortgage repayments calculated?",
    introDesc1: "Home loan repayments are calculated based on your loan principal, the interest rate, the loan term (usually 30 years), and your selected repayment frequency (weekly, fortnightly, or monthly). Principal and Interest (P&I) repayments ensure that you pay off both the accrued interest and a small portion of the loan balance with each payment, leading to a $0 balance at the end of the term.",
    introDesc2: "If you choose an Interest-Only (IO) structure, your payments will be lower initially because you are only paying the interest charged on the balance. However, the loan principal will not decrease, and your repayments will increase significantly once the interest-only period ends and switches back to P&I.",
    bannerText: "Unsure whether to choose Principal & Interest or Interest-Only? Michael can explain the pros and cons for your specific situation.",
    faqs: [
      {
        q: "Is it better to pay weekly, fortnightly, or monthly?",
        a: "Making weekly or fortnightly repayments can save you interest and shorten your loan term. Because there are 26 fortnights in a year, paying fortnightly means you effectively make the equivalent of 13 monthly payments annually (one extra payment per year) which speeds up your principal reduction."
      },
      {
        q: "What happens when an Interest-Only period ends?",
        a: "When the interest-only term ends (typically after 1 to 5 years), your repayments will automatically switch to Principal & Interest. Because you now have fewer years remaining to pay off the principal balance, your monthly repayment amount will increase substantially."
      },
      {
        q: "Can I pay extra on my home loan to reduce repayments?",
        a: "Yes. Most variable rate home loans allow unlimited extra repayments, which reduces your principal balance and the interest charged. If your loan has a redraw facility or offset account, you can keep these extra funds accessible while lowering your interest."
      },
      {
        q: "What is the difference between a redraw facility and an offset account?",
        a: "An offset account is a transactional bank account linked to your home loan where the balance reduces the interest charged on the loan. A redraw facility allows you to withdraw extra payments you have made directly into the loan account. Offset accounts offer more flexibility and separate cash management."
      }
    ]
  },
  refinance: {
    title: "Your refinancing questions, answered",
    introTitle: "When should you consider refinancing?",
    introDesc1: "Refinancing involves replacing your current home loan with a new loan, usually from a different lender, to obtain a lower interest rate, better features, or to consolidate debt. A lower rate reduces your monthly repayments and decreases the total interest paid over the life of your loan, potentially saving you thousands of dollars.",
    introDesc2: "Before refinancing, it is important to factor in transition costs such as lender discharge fees, application fees, and government registration fees. Typically, if the interest rate difference is 0.50% p.a. or more, the monthly savings will quickly offset these upfront costs.",
    bannerText: "Is your current lender charging you a loyalty tax? Michael can run a free health check to see if you can save by refinancing.",
    faqs: [
      {
        q: "How much does it cost to refinance a home loan?",
        a: "Refinancing costs typically include a discharge fee from your current lender ($300 - $400), an application fee from the new lender ($0 - $600), and government registration fees ($150 - $300). Many lenders offer refinancing cash-back rebates to cover these costs."
      },
      {
        q: "How long does the refinancing process take?",
        a: "The refinance process usually takes between 2 to 4 weeks from application to settlement. This includes submitting income verification, performing a property valuation, getting formal approval, and settling the old loan."
      },
      {
        q: "How often should I review my home loan rate?",
        a: "It is recommended to review your home loan rate at least once a year. Lenders frequently change rates for new customers while slowly raising rates for existing customers. Michael can negotiate with your current lender on your behalf or find a better external offer."
      },
      {
        q: "Can I refinance if I have low equity?",
        a: "Yes, but if your loan-to-value ratio (LVR) is above 80% (meaning you have less than 20% equity), you may have to pay Lenders Mortgage Insurance (LMI) again. Michael can help calculate if the refinance savings outweigh the cost of LMI."
      }
    ]
  }
};

export default function CalculatorContent({ activeTab }) {
  const data = FAQ_DATA[activeTab];
  const [openIndex, setOpenIndex] = useState(null);

  if (!data) return null;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16 border-t border-white/10 pt-16 animate-fade-up">
      {/* ── Educational Text Section ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight leading-snug">
            {data.introTitle}
          </h3>
        </div>
        <div className="text-sm text-neutral-400 leading-relaxed md:col-span-2 space-y-4">
          <p>{data.introDesc1}</p>
          <p>{data.introDesc2}</p>
        </div>
      </div>

      {/* ── Call To Action Banner Card ── */}
      <div className="bg-linear-to-br from-neutral-950 via-slate-900 to-neutral-900 border border-white/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-lg">
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-2">
            Get Personalised Mortgage Advice
          </h4>
          <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
            {data.bannerText}
          </p>
        </div>
        <a
          href="mailto:michael@traikosfinance.com"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-black text-xs tracking-wider uppercase rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-white/20 active:translate-y-0 cursor-pointer decoration-none whitespace-nowrap"
        >
          Book a Consultation
        </a>
      </div>

      {/* ── FAQ Accordion Section ── */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-black text-white tracking-tight mb-8 text-center">
          {data.title}
        </h3>
        <div className="space-y-4">
          {data.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-all duration-200 hover:border-white/20"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-white text-sm md:text-base border-none bg-transparent cursor-pointer transition-colors hover:text-white/80 focus:outline-hidden"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className={`text-xl transition-transform duration-300 font-normal ml-4 ${
                    isOpen ? "transform rotate-45 text-white" : ""
                  }`}>
                    ＋
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-75 border-t border-white/10" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-5 text-sm text-neutral-300 leading-relaxed bg-white/5">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

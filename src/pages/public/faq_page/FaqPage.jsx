import { useState } from "react";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import SEO from "../../../components/SEO";

const FAQ_DATA = [
  {
    id: 1,
    question: "How do I know if I should refinance my home loan?",
    answer: `Refinancing may be worth considering if your current interest rate is no longer competitive, your financial circumstances
have changed, or you're looking to reduce your repayments, access equity, or consolidate debt.

At Traikos Finance, we compare a wide range of loan products from over 30 lenders to determine whether there may be a
more suitable option available for your needs. We take the time to understand your goals and provide tailored lending
solutions designed to support your long-term financial position.

Many borrowers are surprised to learn that lenders don't always proactively offer their existing customers their most
competitive rates. That's why it's important to regularly review your home loan to ensure you're not paying more than you
need to.

As part of our ongoing service, we can conduct regular loan reviews and negotiate with your current lender on your behalf
to help keep your rate and loan structure competitive as market conditions change`
  },
  {
    id: 2,
    question: "What does it actually cost to refinance?",
    answer: `Refinancing your home or investment loan can be a great way to secure a more competitive interest rate, reduce your
repayments, access equity, or consolidate debt. While there are costs involved, they are often outweighed by the
long-term savings achieved through a better loan structure.
Typical refinance costs may include discharge fees charged by your current lender, government mortgage registration
and discharge fees, settlement costs, and in some cases, fixed-rate break costs if you're exiting a fixed loan early.

Depending on your lender, state, and loan type, these costs generally range between $500 and $1,500.
Before recommending any refinance, we conduct a detailed review of your current loan to ensure the potential benefits
outweigh the costs. We'll compare a wide range of lenders, explain any fees upfront, and provide clear guidance so you
can make an informed decision with confidence.

At Traikos Finance, our goal is to ensure that any refinance not only saves you money but also aligns with your broader
financial goals and circumstances`
  },
  {
    id: 3,
    question: "What information do you need?",
    answer: `The key to a smooth and efficient home loan application is providing the required documentation as early as possible. At
Traikos Finance, we utilise secure digital technology to streamline the process and minimise the paperwork burden
wherever possible.
In most cases, we'll require identification documents such as a driver's licence or passport, along with evidence of
income. For PAYG employees, this typically includes recent payslips and, where required, PAYG income statements.
Additional documents such as bank statements may also be requested depending on the lender's requirements.
For self-employed applicants, the documentation requirements can be more detailed and may include tax returns,
financial statements, BAS statements, and accountant information. We work closely with you and your accountant to
ensure the correct documentation is obtained and presented to maximise the likelihood of a successful application.
During our initial consultation, we'll provide a tailored checklist based on your circumstances so you'll know exactly what's
required from the outset`
  },
  {
    id: 4,
    question: "Do I need to get a property valuation?",
    answer: `In most cases, no. As part of the loan application process, we can arrange a property valuation on your behalf, often at no
additional cost.
A real estate agent's appraisal can provide a general indication of what your property may achieve if offered for sale.
However, for lending purposes, banks rely on valuations completed by independent, licensed valuers. These valuations
are used to determine the property's market value and assist lenders in assessing the level of risk associated with the
loan.
Your property's value plays an important role in determining the amount of equity available and your Loan to Value Ratio
(LVR). The LVR is a key factor lenders use when assessing a loan application, as it helps determine borrowing capacity,
available loan products, interest rates, and whether Lenders Mortgage Insurance (LMI) may apply.
At Traikos Finance, we can guide you through the valuation process and help you understand how your property's value
may impact your lending options.`
  },
  {
    id: 5,
    question: "How do I access equity, and can I use it to renovate or invest?",
    answer: `Equity is the difference between your property's current value and the amount you still owe on your home loan. As your
property increases in value and your loan balance decreases, the equity available to you may grow over time.
Many lenders will allow eligible borrowers to access a portion of their available equity, often up to 80% of the property's
value without the need for Lenders Mortgage Insurance (LMI), subject to meeting lending criteria and serviceability
requirements.

For example, if your property is valued at $1,000,000 and your current home loan balance is $500,000, you may be able
to access up to $300,000 in usable equity, depending on your financial circumstances and lender requirements.
Released equity can often be used for a variety of purposes, including home renovations, purchasing an investment
property, debt consolidation, business purposes, or investing in shares and other approved investments. The intended
use of the funds will be assessed by the lender as part of the application process.

At Traikos Finance, we can help determine how much equity may be available to you and guide you through the process
of accessing it to support your financial goals.
`
  },
  {
    id: 6,
    question: "What is the best way to structure an investment property loan?",
    answer: `The most appropriate structure for an investment property purchase will depend on your personal circumstances,
financial goals, asset protection requirements, and taxation considerations. As mortgage brokers, we can provide
guidance from a lending perspective, however we recommend seeking advice from a qualified accountant or financial
adviser before deciding on a specific ownership structure.
Investment properties can be purchased in a variety of ways, including in an individual's name, jointly with another
person, as tenants in common, through a company, a family or discretionary trust, a unit trust, or even within a
Self-Managed Super Fund (SMSF). Each structure has its own advantages, disadvantages, tax implications, and lending
considerations.
Not all lenders support every ownership structure, and lending policies can vary significantly depending on how the
property is being purchased. That's why it's important to ensure your chosen structure aligns with both your long-term
objectives and the available lending options.
At Traikos Finance, we work closely with your accountant and other professional advisers to help identify suitable lending
solutions and ensure your finance structure supports your broader investment strategy.
`
  },
  {
    id: 7,
    question: "What is an offset account?",
    answer: `An offset account is a transaction account linked to your home loan that helps reduce the amount of interest charged on
your mortgage. It functions much like a regular bank account, with its own BSB and account number, allowing you to
deposit your salary, pay bills, and access your funds whenever required.

The balance held in your offset account is offset against your home loan balance when interest is calculated. For
example, if you have a home loan of $750,000 and $50,000 sitting in your offset account, you will only be charged interest
on $700,000.

Offset accounts can be a powerful tool for reducing interest costs and potentially helping you pay off your loan sooner,
while still providing full access to your savings.
Not all home loans offer a full offset account, and some lenders may charge higher interest rates or account fees for this
feature. Fixed-rate loans may also have restrictions on offset functionality, although some lenders do offer offset accounts
on fixed loan products.

At Traikos Finance, we can help you compare offset account options and determine whether a loan with an offset facility
is suitable for your financial goals and circumstances`
  },
  {
    id: 8,
    question: "Can I have more than one offset account?",
    answer: `Yes. Many lenders now offer the ability to link multiple offset accounts to a single home loan, allowing you to organise
your finances while still reducing the interest charged on your mortgage.

Having multiple offset accounts can be an effective way to separate your money into different categories, such as
everyday spending, savings, holidays, school fees, insurance, renovations, or emergency funds. This can make
budgeting easier while ensuring your savings continue to work towards reducing your home loan interest.
The combined balance of all linked offset accounts is typically offset against your loan balance when interest is
calculated. For example, if you have a home loan of $800,000 and a total of $100,000 spread across several offset
accounts, you may only be charged interest on $700,000.

Not all lenders offer multiple offset accounts, and the number of accounts available can vary depending on the loan
product. Some lenders may also charge package or account fees for this feature.

At Traikos Finance, we can help you compare lenders and identify loan products that offer multiple offset accounts,
helping you maximise flexibility while potentially reducing the interest paid over the life of your loan.
`
  },
  {
    id: 9,
    question: "What is the credit card and offset account strategy?",
    answer: `A common strategy used by homeowners is to combine a credit card with an offset account to help reduce the interest
charged on their home loan.
The concept is simple: instead of using money directly from your transaction or offset account for everyday purchases,
you use a credit card and take advantage of its interest-free period. This allows your funds to remain in your offset
account for longer, helping to reduce the balance on which your home loan interest is calculated.

For example, if your salary and savings remain in your offset account while you use a credit card for day-to-day
expenses, your money continues working to reduce your home loan interest until the credit card repayment is due. At the
end of the interest-free period, the credit card balance is paid in full from your offset account.
While this strategy can help maximise the benefits of an offset account, it is important to pay the credit card balance in full
and on time each month. If interest is charged on the credit card, the additional cost can quickly outweigh any savings
achieved on your home loan.

At Traikos Finance, we can help you understand how offset accounts work and whether this strategy may be suitable for
your financial circumstances and budgeting habits`
  },
  {
    id: 10,
    question: "Are pre-approvals important, and how long do they last?",
    answer: `Yes. A home loan pre-approval can provide confidence when searching for a property by giving you an indication of how
much you may be able to borrow before making an offer or bidding at auction.
Most pre-approvals are valid for between 60 and 90 days, depending on the lender. If your circumstances change during
this period, such as your income, employment, expenses, or existing debts, the lender may reassess your application.

It's important to understand that a pre-approval is not a guarantee of formal loan approval. Most lenders will still need to
assess the property, complete a valuation, and confirm your financial position before providing unconditional approval.

While some online pre-approvals can be obtained in minutes, they may only involve a limited assessment of your
circumstances. A comprehensive pre-approval process can help identify potential issues early, including credit concerns,
borrowing capacity limitations, or lender policy restrictions.

At Traikos Finance, we take the time to understand your financial position, review your borrowing capacity, and help you
obtain a pre-approval that provides greater confidence when you're ready to purchase. Whether you're buying your first
home, upgrading, investing, or bidding at auction, we'll help ensure you're well prepared before making an offer.
`
  },
  {
    id: 11,
    question: "Can you help with self-employed home loans?",
    answer: `Absolutely. Assisting self-employed borrowers is one of our areas of expertise.

Obtaining a home loan when you're self-employed can be more complex than for PAYG employees, as lenders often
assess income differently. However, many lenders now offer flexible policies designed specifically for business owners,
sole traders, company directors, contractors, and trust structures.

Depending on your circumstances, lenders may be able to assess your application using as little as 12 months of trading
history, recent tax returns, BAS statements, accountant-prepared financials, Notices of Assessment, or alternative
income verification methods. The documentation required and lending options available will vary between lenders and
individual situations.

Whether you're looking to purchase a property, refinance an existing loan, access equity, or invest, we'll help identify
lenders whose policies align with your financial circumstances and business structure.

At Traikos Finance, we understand that no two self-employed borrowers are the same. We take the time to understand
your business, analyse your financial position, and present suitable lending options to help maximise your chances of
approval`
  },
  {
    id: 12,
    question: "Can you help first home buyers?",
    answer: `Absolutely. Purchasing your first home is one of the biggest financial decisions you'll make, and our goal is to make the
process as simple and stress-free as possible.

At Traikos Finance, we guide first home buyers through every stage of the journey, from understanding borrowing
capacity and saving a deposit through to securing finance, making an offer, bidding at auction, and ultimately settling on
your first property. We take the time to explain the process in plain English, ensuring you feel informed and confident
every step of the way.

We can also help determine whether you're eligible for government assistance programs, including the First Home
Guarantee Scheme, which may allow eligible buyers to purchase a property with as little as a 5% deposit without paying
Lenders Mortgage Insurance (LMI). We can also assist with understanding available grants, stamp duty concessions, and
other first home buyer benefits that may apply.

Whether you're just starting to explore your options or are ready to buy, we'll help you understand how much you may be
able to borrow, what costs are involved, and which lenders may be suitable for your circumstances.
Best of all, there is no cost for your initial consultation, so you can gain clarity and confidence before taking the next step
towards home ownership`
  },
  {
    id: 13,
    question: "Do you help property investors?",
    answer: `Absolutely. Whether you're purchasing your first investment property or expanding an existing portfolio, Traikos Finance
can help you navigate the lending process and identify suitable finance solutions for your investment goals.

Investment lending often involves additional considerations, including loan structure, cash flow, tax implications,
borrowing capacity, and long-term wealth creation strategies. While we do not provide tax or financial advice, we regularly
work alongside accountants and financial advisers to help ensure your lending structure aligns with your broader
investment objectives.

We can assist with a wide range of investment lending scenarios, including interest-only loans, equity release for future
investments, trust and company borrowing structures, SMSF lending, and finance for self-employed investors. With
access to over 30 lenders, we can compare a range of options to find a solution that suits your circumstances.
Whether you're looking to purchase your first investment property, grow your portfolio, or refinance an existing investment
loan, we're here to help you make informed decisions and maximise your opportunities as a property investor.
`
  },
  {
    id: 14,
    question: "What is your cheapest home loan rate?",
    answer: `The answer depends on your individual circumstances. Home loan interest rates can vary significantly based on factors
such as your loan amount, property value, Loan to Value Ratio (LVR), income, credit history, loan purpose, and whether
you're purchasing, refinancing, or investing.

While it can be tempting to focus solely on the lowest advertised rate, the cheapest loan isn't always the most suitable.
Some products may have limited features, stricter lending criteria, higher fees, or may only be available to a specific type
of borrower.

At Traikos Finance, we take the time to understand your financial situation and compare a wide range of loan options
from over 30 lenders. This allows us to identify competitive interest rates while also ensuring the loan structure, features,
and lending policy align with your needs and long-term goals.
Whether you're a first home buyer, owner-occupier, investor, or self-employed borrower, we can help you compare your
options and determine which lender may offer the most suitable solution for your circumstances.
The best way to find out what rate may be available to you is to contact us for a complimentary home loan assessment.
`
  }
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 px-4 mb-2">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-900 pr-4 group-hover:text-gray-700 transition-colors">
          {faq.question}
        </span>
        <span className="shrink-0 ml-2">
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      {isOpen && (
        <div className="pb-6 pr-8">
          <div className="text-xs  text-gray-700 leading-relaxed whitespace-pre-line">
            {faq.answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  useDocumentTitle("Frequently Asked Questions - Traikos Finance");
  const [openIds, setOpenIds] = useState([]);

  const toggleFaq = (id) => {
    setOpenIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Split FAQs into two columns for desktop
  const midpoint = Math.ceil(FAQ_DATA.length / 2);
  const leftColumnFaqs = FAQ_DATA.slice(0, midpoint);
  const rightColumnFaqs = FAQ_DATA.slice(midpoint);

  return (
    <>
      <SEO
        title="Frequently Asked Questions - Traikos Finance"
        description="Get answers to common questions about home loans, refinancing, investment properties, and more. Expert mortgage broker advice from Traikos Finance."
        keywords="mortgage FAQ, home loan questions, refinancing questions, investment property loans, offset accounts, pre-approval"
      />

      <section className="bg-white pt-8! pb-16!">
        <div className="w-[90%] md:w-[85%] lg:w-[80%] max-w-7xl mx-auto">
          
          {/* Header */}
          <h2 className="text-2xl md:text-4xl! font-bold text-center mb-8! md:mb-8! uppercase text-gray-900!">
            Frequently Asked Questions
          </h2>

          {/* Mobile Layout - Single Column */}
          <div className="md:hidden">
            <div className="bg-white">
              {FAQ_DATA.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openIds.includes(faq.id)}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>
          </div>

          {/* Desktop Layout - Two Columns */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="bg-white">
              {leftColumnFaqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openIds.includes(faq.id)}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="bg-white">
              {rightColumnFaqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openIds.includes(faq.id)}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

import SEO from '../../../components/SEO';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

const faqs = [
  {
    question: "How much can I borrow?",
    answer:
      "Your borrowing capacity depends on a range of factors including your income, employment type, living expenses, existing debts, credit history, number of dependants, loan term, and the lender's assessment criteria. Every lender assesses applications differently, which means your maximum borrowing capacity can vary significantly from one lender to another. For example, two borrowers earning the same income may receive very different borrowing outcomes depending on whether they have HECS debt, personal loans, car finance, credit card limits, child dependants, overtime income, bonus income, or investment property commitments. At Traikos Finance, we review your full financial position and compare lending options across a wide panel of lenders.",
  },
  {
    question: "What is Lenders Mortgage Insurance (LMI)?",
    answer:
      "Lenders Mortgage Insurance, commonly known as LMI, is an insurance premium that may apply when you borrow more than 80% of a property's value. It is important to understand that LMI protects the lender, not the borrower, if the loan falls into default and the lender suffers a loss. The cost of LMI can vary depending on the loan amount, property value, deposit size, and lender. In many cases, LMI can be capitalised, meaning it is added to the home loan rather than paid upfront. At Traikos Finance, we can help you understand whether LMI may apply, how much it could cost, and whether there are strategies or lender options that may reduce or avoid it.",
  },
  {
    question: "How much deposit do I need to buy a home?",
    answer:
      "A 20% deposit is often considered ideal because it may allow you to avoid Lenders Mortgage Insurance. However, many borrowers purchase property with less than a 20% deposit, depending on their circumstances and the lender's requirements. In addition to the deposit, buyers also need to consider stamp duty, government charges, conveyancing costs, building and pest inspections, lender fees, and moving costs. For some eligible first home buyers, purchasing with a 5% deposit may be possible through the First Home Guarantee Scheme. At Traikos Finance, we can help calculate the deposit and total funds required for your purchase.",
  },
  {
    question: "Can I buy a property with a 5% deposit?",
    answer:
      "Yes, some borrowers may be able to buy a property with as little as a 5% deposit, subject to lender approval and eligibility criteria. This is most commonly available to eligible first home buyers through government-backed initiatives such as the First Home Guarantee Scheme. Borrowers using a small deposit must still demonstrate that they can service the loan, have genuine savings where required, and meet the lender's credit and policy criteria. At Traikos Finance, we can assess whether a 5% deposit purchase may be available to you and compare suitable lenders based on your circumstances.",
  },
  {
    question: "What is the First Home Guarantee Scheme?",
    answer:
      "The First Home Guarantee Scheme is a government initiative designed to help eligible first home buyers purchase a property sooner. Under the scheme, eligible buyers may be able to purchase with as little as a 5% deposit without paying Lenders Mortgage Insurance. Eligibility criteria, income limits, property price caps, citizenship or residency requirements, and available places can apply. At Traikos Finance, we can help first home buyers understand whether they may be eligible, which lenders participate, and how the scheme fits into their overall purchase strategy.",
  },
  {
    question: "What grants are available for first home buyers in Victoria?",
    answer:
      "First home buyer grants and concessions can vary depending on the property type, purchase price, location, and government policy at the time of purchase. In Victoria, first home buyers may be eligible for stamp duty concessions or exemptions depending on the purchase price and their circumstances. At Traikos Finance, we can help you understand the types of government assistance that may be relevant to your purchase and work alongside your conveyancer or solicitor.",
  },
  {
    question: "Should I choose a fixed or variable interest rate?",
    answer:
      "Choosing between a fixed and variable interest rate depends on your financial goals, risk tolerance, cash flow needs, and preference for certainty or flexibility. A fixed rate can provide repayment certainty for a set period. However, fixed loans can have restrictions on extra repayments, redraw access, and offset accounts. A variable rate generally offers more flexibility including additional repayments and offset accounts. Some borrowers choose a split loan where part is fixed and part remains variable. At Traikos Finance, we can help structure a loan that suits your goals.",
  },
  {
    question: "What is the difference between an offset account and redraw?",
    answer:
      "An offset account is a separate transaction account linked to your home loan. The balance in the offset account reduces the loan amount used to calculate interest. A redraw facility allows you to access extra repayments you have made directly into your loan. For investment loans, it is especially important to obtain tax advice before relying on redraw or offset strategies. At Traikos Finance, we can compare loan products with offset and redraw features and help you understand which may be suitable for your situation.",
  },
  {
    question: "How long does home loan approval take?",
    answer:
      "Home loan approval timeframes vary depending on the lender, application complexity, property type, valuation requirements, and how quickly supporting documents are provided. A pre-approval may be obtained within a few days, while formal approval can take anywhere from several days to several weeks. More complex applications such as self-employed loans or trust structures may take longer. At Traikos Finance, we help prepare your application properly from the outset and keep you informed throughout the process.",
  },
  {
    question: "How much can I save by refinancing?",
    answer:
      "The amount you can save by refinancing depends on your current interest rate, loan balance, remaining loan term, fees, and the new loan option available to you. Even a small reduction in interest rate can result in meaningful savings over time. However, costs such as discharge fees, government fees, settlement costs, and fixed-rate break costs need to be considered. At Traikos Finance, we complete a detailed comparison before recommending a refinance so you can understand the potential savings and costs before proceeding.",
  },
  {
    question: "How long does refinancing take?",
    answer:
      "Most refinances take between two and six weeks from application to settlement, although timeframes can vary. A straightforward refinance for a PAYG borrower may be completed faster than a more complex refinance involving self-employed income or multiple properties. At Traikos Finance, we manage the refinance process from start to finish and keep you updated throughout each stage.",
  },
  {
    question: "Will refinancing affect my credit score?",
    answer:
      "Refinancing can involve a credit enquiry when a lender assesses your application. A single credit enquiry is generally a normal part of applying for finance, but multiple applications across different lenders in a short period may have a greater impact. Working with a mortgage broker can help reduce the risk of unnecessary applications. At Traikos Finance, we aim to identify suitable lender options before applying so your application is positioned appropriately from the outset.",
  },
  {
    question: "Can I refinance if my property value has fallen?",
    answer:
      "It may still be possible to refinance if your property value has fallen, but your options may be more limited. A lower valuation can increase your Loan to Value Ratio, which may affect your interest rate, lender options, and whether Lenders Mortgage Insurance applies. At Traikos Finance, we can review your current loan, estimate your equity position, and compare lenders to determine whether refinancing remains viable.",
  },
  {
    question: "Does HECS debt affect borrowing capacity?",
    answer:
      "Yes. HECS or HELP debt can affect borrowing capacity because lenders take compulsory repayment obligations into account when assessing your income and expenses. Having HECS debt does not prevent you from getting a home loan, but it may reduce the amount you can borrow. At Traikos Finance, we can model borrowing capacity with and without HECS so you can understand the potential difference.",
  },
  {
    question: "Do credit cards reduce borrowing capacity?",
    answer:
      "Yes. Credit card limits can reduce borrowing capacity even if you pay the card off in full each month. Lenders usually assess the approved credit limit, not just the current balance. Reducing or closing unused credit cards can sometimes improve borrowing capacity. At Traikos Finance, we can review your existing commitments and identify whether credit card limits are affecting your borrowing power.",
  },
  {
    question: "Can I use equity to buy an investment property?",
    answer:
      "Yes. Many investors use equity in an existing property to help fund the deposit and purchase costs for an investment property. If your home has increased in value and your loan balance has reduced, you may be able to access usable equity and use those funds towards another property purchase. At Traikos Finance, we can help calculate available equity, assess borrowing capacity, and structure the lending to support your investment goals.",
  },
  {
    question:
      "Should I choose principal and interest or interest-only repayments for an investment loan?",
    answer:
      "The choice depends on your cash flow, investment strategy, tax position, and long-term goals. Principal and interest repayments reduce the loan balance over time and build equity. Interest-only repayments may provide lower monthly repayments during the interest-only period, which can assist with cash flow. Because there can be tax implications, investors should speak with their accountant before deciding. At Traikos Finance, we can explain the lending implications and compare loan options that align with your broader investment strategy.",
  },
  {
    question: "How many investment properties can I own?",
    answer:
      "There is no fixed number of investment properties a person can own. The practical limit usually depends on borrowing capacity, equity, cash flow, lender policy, rental income, and overall risk profile. As your portfolio grows, lenders may apply more detailed assessment methods. At Traikos Finance, we can help investors review their portfolio lending position and identify strategies to support future growth.",
  },
  {
    question: "Can I buy an investment property through a trust?",
    answer:
      "Yes, it may be possible to purchase an investment property through a trust, depending on the lender and the trust structure. Common structures include discretionary trusts, family trusts, and unit trusts. Buying through a trust can have legal, tax, asset protection, and estate planning implications. At Traikos Finance, we can work alongside your professional advisers to identify lenders that may support your chosen structure.",
  },
  {
    question: "Can I get a home loan with only one year of ABN history?",
    answer:
      "Potentially. Some lenders may consider self-employed borrowers with as little as 12 months of ABN or trading history, provided the overall application is strong and the income can be verified. Alternative documentation options may be available including BAS statements, accountant letters, and business bank statements. At Traikos Finance, we help self-employed borrowers identify lenders whose policies align with their business history and income documentation.",
  },
  {
    question: "Can I get a home loan if my taxable income is low?",
    answer:
      "It may be possible, but it depends on the reason your taxable income is low and how the lender assesses your financial position. Many self-employed borrowers have deductions or business structures that reduce taxable income. Some lenders may add back certain expenses or assess income using alternative verification methods. At Traikos Finance, we can review your financials and work with your accountant to determine which lenders may consider your circumstances.",
  },
  {
    question: "What documents do self-employed borrowers need?",
    answer:
      "Self-employed borrowers may need to provide personal tax returns, business tax returns, financial statements, Notices of Assessment, BAS statements, business bank statements, trust deeds, company financials, and accountant contact details. Some lenders may accept alternative documentation such as BAS statements or accountant declarations. At Traikos Finance, we provide a tailored document checklist so you know exactly what is required for your application.",
  },
  {
    question: "Can I split my home loan between fixed and variable rates?",
    answer:
      "Yes. Many lenders allow borrowers to split their home loan between fixed and variable interest rates. A split loan can provide a balance between repayment certainty and flexibility. The fixed portion can help protect against rate movements, while the variable portion may allow access to offset accounts, redraw, and additional repayments. At Traikos Finance, we can compare split loan options and help structure your loan in a way that suits your circumstances.",
  },
];

const SeoFaqPage = () => {
  useDocumentTitle('Traikos Finance - Mortgage Broker');

  return (
    <>
      <SEO
        title="Traikos Finance - Mortgage Broker"
        description="Answers to common questions about home loans, refinancing, investment property, borrowing capacity, and more from Traikos Finance."
        canonical="https://traikosfinance.com.au/seo-faq"
      />

      <main
        style={{
          padding: '60px 40px',
          maxWidth: '900px',
          margin: '0 auto',
          fontFamily: 'sans-serif',
          color: '#1a1a1a',
          lineHeight: '1.8',
        }}
      >
        <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>
          Traikos Finance - Mortgage Broker
        </h1>
        <p style={{ color: '#555', marginBottom: '48px' }}>
          Answers to common questions about home loans, refinancing, investment
          property, borrowing capacity, and more. Traikos Finance is a
          Melbourne-based mortgage broker with access to over 30 lenders.
        </p>

        {faqs.map((faq, index) => (
          <section
            key={index}
            style={{
              marginBottom: '36px',
              borderBottom: '1px solid #e5e5e5',
              paddingBottom: '28px',
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
              {faq.question}
            </h2>
            <p style={{ color: '#444', fontSize: '15px' }}>{faq.answer}</p>
          </section>
        ))}
      </main>
    </>
  );
};

export default SeoFaqPage;
import { useState } from "react";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import SEO from "../../../components/SEO";

const FAQ_DATA = [
  {
    id: 1,
    question: "How do I know if I need to refinance my home loan?",
    answer: `To determine if refinancing your home loan is worthwhile, it's essential to ensure that it will result in significant savings after accounting for any refinancing costs.

Luckily, we can help you accurately assess potential savings by comparing hundreds of loan products from over 30 lenders. This way, we can create a lending solution that genuinely fits your needs, rather than just pushing a particular lender's offerings.

In a rising interest rate environment, it's more crucial than ever to monitor your current rate to ensure it's still competitive. You can be sure that your current lender won't be the first to inform you about a potentially cheaper rate that might suit you better—that's where we come in.

At Traikos, our systems guarantee annual reviews of your loan structure to keep it competitive. We proactively engage with your current lender to ensure your interest rate remains as attractive as possible.`
  },
  {
    id: 2,
    question: "What does it actually cost to refinance?",
    answer: `Refinancing your home or investment loan typically doesn't involve high costs, but there are a few factors to consider. Generally, a straightforward refinance should cost between $500 and $750. However, the potential savings on interest could be substantial, potentially saving you thousands and reducing the duration of your existing loan.

Recently, many lenders have started offering cashback rebates for refinancing your home loan, which can amount to several thousand dollars. However, as with many offers, there may be some catches. The good news is that we can help you assess these benefits and provide a clear comparison.

The basic costs associated with refinancing include discharge fees paid to your current lender, usually around $300 per mortgage. Lender legal fees might be included in this amount, but they typically don't exceed $250. Additionally, government discharge and mortgage registration fees vary by state but usually remain under a few hundred dollars per mortgage security (property).

A crucial consideration is whether there are break fees for paying off a fixed loan early. Typically, if your current fixed rate is lower than prevailing rates, your lender will allow you to exit without any fees. Conversely, if you need to break a fixed loan and current fixed rates have fallen, you may incur significant costs. Each lender has its own calculation method, and it's usually straightforward to obtain a quote by contacting your current provider.`
  },
  {
    id: 3,
    question: "What information do you need",
    answer: `The key to a hassle-free mortgage application lies in efficiently providing the necessary supporting documentation. Fortunately, Traikos leverages advanced technology to automate and streamline much of this process for you. Required support documents typically include suitable identification, such as a driver's licence or passport. You'll also need to provide proof of income, which is usually done through payslips (sufficient for PAYG employees), tax returns, and/or employment letters. For self-employed clients, the process can be more complex, so we often collaborate with your accountant to request the exact documentation needed to support your application's approval.`
  },
  {
    id: 4,
    question: "Do I need to get a property valuation?",
    answer: `No worries—we'll arrange the upfront valuation for you, often at no additional cost. While securing a real estate agent's appraisal can provide a rough idea of what you might get if you sell, it's not particularly useful for lending purposes. A bank valuation, conducted by a licensed valuer, is specifically designed to assess risk. The valuer's role is to evaluate the property's risk should it ever need to be sold, rather than providing you with an optimistic market estimate.

Lenders and banks always want to know your property's value to assess how much equity you have, which in turn helps them calculate your Loan to Value Ratio (LVR). The LVR is a key indicator for lenders, reflecting the level of risk they are taking on; a higher LVR generally signals a riskier deal from their perspective.`
  },
  {
    id: 5,
    question: "How do I get an equity release? Can I use it to buy shares or renovate my home?",
    answer: `So, what exactly is equity? Simply put, it's the difference between your property's value and the outstanding loan against it. Most lenders will allow you to obtain a valuation of your property and secure a loan of up to 80% (and sometimes even higher) of its value.

For instance, if your home is valued at $1 million and you have an existing home loan of $500,000, you could potentially access a maximum loan size of $800,000 (which is 80% of the valuation). This means you would have $300,000 in released equity. Most lenders will allow you to use this equity for any worthwhile purpose you have in mind.`
  },
  {
    id: 6,
    question: "What is the best way to structure an investment property loan?",
    answer: `We arrange investment loans for clients across Australia and there are numerous ways you can possibly achieve this that often have important tax and accounting implications. Like any lender, bank or broker we are unable to advise on a specific structure but we can help suggest what may be suitable from a lending perspective which can then be checked against any advice received from you licensed tax accountant.

Common structures may be to purchase an investment in a personal name, jointly with another person, as tenants in common, within a company name, a trust (discretionary, unit or less often hybrid trust) or even within an SMSF (Self Managed Superannuation Fund). There are many pros and cons that will significantly determine which lenders on our panel of over 30 who will be suitable for your investment loan structure.`
  },
  {
    id: 7,
    question: "What is an offset account?",
    answer: `Offset accounts are just like any ordinary savings account that has a BSB and account number but they are linked electronically to your mortgage account to reduce the interest charged on your loan split. For example you have a $750,000 home loan owing and an offset account with $50,000 balance. The offset account, as the name suggests, reduces the interest charged against the balance owing on your home loan and your balance for interest charged is reduced to $700,000.

Not all offset accounts are equal. Some are partial offset accounts which can greatly dilute the benefit of surplus funds you have sitting idle. Fixed loan splits generally cannot have a linked offset account with the exception of a few lenders who allow this to be done during a fixed term.

Generally offset accounts will increase the interest rate charged or fees levied so it's important to consider the benefit of having such a feature. Fortunately you can get much the same outcome as an offset account.`
  },
  {
    id: 8,
    question: "Can I have more than one offset account?",
    answer: `Yes, having multiple offset accounts to reduce your home loan balance is a feature increasingly offered by several lenders in our panel.

The idea of using more than one savings or transaction account gained immense popularity through Scott Pape's *Barefoot Investor*. This concept revolves around creating "buckets" for your money to enhance accountability for your spending habits, ultimately improving budgeting without needing to micromanage every cent. While this strategy often involved using multiple accounts with one lender, the interest earned was usually minimal.

Now, imagine the advantages of a lending structure that allows for multiple offset accounts to lower the interest charged on your home loan each month. For example, if you have monthly mortgage repayments, annual insurance premiums, quarterly private school fees, and a holiday fund that you contribute to every fortnight, managing all these expenses from just one or two accounts can become quite challenging.

By setting up individual accounts for each purpose and regularly depositing money into them, you can simplify your financial management. The beauty of this multi-offset structure is that the total balance across these accounts will effectively reduce the daily balance of your home loan, potentially saving you thousands in interest and even shortening the life of your loan.`
  },
  {
    id: 9,
    question: "What is the credit card / offset account hack?",
    answer: `The main objective here is to keep your money in your possession for as long as possible. Essentially, every day your funds remain in your offset account reduces your interest costs.

For example, if you use a credit card that offers an interest-free period of 30 or 55 days, this allows your money to stay in your offset account for that duration, further decreasing your interest expenses. Instead of transferring your money to a retailer the moment you make a purchase, you're effectively delaying that transaction and reducing the amount of interest you pay on your home loan.

However, the crucial part of this strategy is ensuring that you pay off your credit card balance on time. Failing to do so will result in accruing interest on the credit card, which can negate the benefits of this approach.`
  },
  {
    id: 10,
    question: "Are pre approvals important? (and how long do they last?)",
    answer: `You've spotted your dream property on Thursday night, but the auction is on Saturday! Should you feel stressed? Not if you have a solid pre-approval in place or, at the very least, a proper consultation with a licensed mortgage broker.

Pre-approvals typically come as a system-generated letter (often a PDF emailed to you) stating that you're 'pre-approved' for a certain amount. While this may seem reassuring at first glance, it's essential to remember that these letters often come with asterisks and fine print. Lenders usually attach various conditions that allow them to mitigate risk should your situation change by the time you're ready to purchase.

This is why consulting with a knowledgeable professional is crucial. They can help you grasp what your pre-approval means and the importance of securing one properly.

Many online 'five-minute' pre-approvals offer only a flimsy assessment of your borrowing capacity. We've seen countless cases where homebuyers and investors relied on these quick approvals to bid at auctions, only to be declined by the lender after the contract has been signed. This can happen due to closer scrutiny from the lender or because a bank valuation comes in lower than expected or stated income is insufficient when formal approval is sought.

Our approach involves a bit more due diligence upfront, ensuring you're well-informed about your approval prospects before you sign any loan application. With our extensive experience, we guide you through a detailed servicing analysis process that provides a good overview of which lenders are likely to consider your situation and to what extent. We usually recommend ordering a free credit check on your file to uncover any hidden surprises before submission. With positive credit reporting becoming more prevalent, lenders may decline an application if there's an undisclosed debt or a lack of explanation for minor credit issues that you might be unaware of. A pre-emptive credit check helps you avoid complications during the application process.`
  },
  {
    id: 11,
    question: "Can you do self employed loans",
    answer: `This is our specialty! For self-employed individuals, securing a mortgage has traditionally posed challenges with many banks and lenders. Fortunately, there are now far more options available than there were ten or fifteen years ago.

More lenders are developing alternative methods for assessing your income, making it possible for your loan to get approved.

These policies include, but are not limited to, accepting just 12 months of self-employed tax returns for loan approval, enabling fast-track approvals using only your ATO notice of assessment (no tax returns needed), relying on an affordability statement from your accountant, reviewing your BAS (Business Activity Statements) turnover to identify trends in your overall profitability, and accepting draft tax returns along with a letter from your accountant. Refinancing is also possible with a dollar-for-dollar proposal presented.

The array of policies designed to support your loan approval is extensive and frequently changing, so reach out to us today to discuss your specific situation!`
  },
  {
    id: 12,
    question: "Can you help first home buyers?",
    answer: `Purchasing your first home should be an exciting time not a daunting one! So we have designed our first home buyer finance process to be one that welcomes questions and guides you through the process step by step so you leave your first meeting with confidence knowing what how you can comfortably borrow and the process that need to be followed to achieve the successful outcome to us. People ask if there is a fee for meeting with us if you are a first home buyer and the simple answer is no – so what do you have to lose. Leave the bank jargon and product. Call one of the team today to discuss your needs now.`
  },
  {
    id: 13,
    question: "Do you help property investors?",
    answer: `Navigating the world of investment property loans can be tricky, whether you're a seasoned investor with a portfolio of ten properties or looking to secure your first investment loan. We have the expertise and experience to guide you through it all.

Tax implications play a significant role in financing an investment property. It's essential to consider whether to purchase the property in your name, through a company, a trust, or even your SMSF. We're here to collaborate with your accountant or financial planner to craft a solution tailored to your unique circumstances. Need an interest-only investment loan under a company name for a self-employed borrower? We can assist with that and much more! Contact us today for a no-obligation chat.`
  },
  {
    id: 14,
    question: "What is your cheapest homeloan rate?",
    answer: `We love getting the best deals in the market for our clients on a daily basis and fortunately there are always hundreds of lending products being offered all of the time. The key to getting the best rate is always understanding what is the best rate for your scenario. A quick online search of 'what is the cheapest home loan rate' generates almost unlimited suggestions and without a proper understanding of how to match your scenario and needs with a range of suitable lenders will just result in you going crazy. Cheap internet rates are well known in our industry to be pretty volatile and often difficult to be approved for unless you fit a pretty specific target market that they are after. Furthermore the lender you select is under absolutely no obligation to tell you that there might be a better rate out there. As a client of AXTON Finance we are obligated however to always act in your best interest at every stage – the major banks and lenders are exempt from this legislation and can press you into any loan they see fit.`
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

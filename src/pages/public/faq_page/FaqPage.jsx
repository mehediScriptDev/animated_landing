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

const ADDITIONAL_FAQ_DATA = [
  {
    id: "s2-1",
    question: "How much can I borrow?",
    answer: `Your borrowing capacity depends on a range of factors including your income, employment type, living expenses, existing debts, credit history, number of dependants, loan term, and the lender's assessment criteria. Every lender assesses applications differently, which means your maximum borrowing capacity can vary significantly from one lender to another.

For example, two borrowers earning the same income may receive very different borrowing outcomes depending on whether they have HECS debt, personal loans, car finance, credit card limits, child dependants, overtime income, bonus income, or investment property commitments.

Borrowing capacity is also affected by the type of loan you are applying for. Owner-occupier loans, investment loans, principal and interest repayments, interest-only repayments, and self-employed income can all be assessed differently depending on the lender.

At Traikos Finance, we review your full financial position and compare lending options across a wide panel of lenders. This helps you understand how much you may be able to borrow before you begin making offers or bidding at auction.`
  },
  {
    id: "s2-2",
    question: "What is Lenders Mortgage Insurance (LMI)?",
    answer: `Lenders Mortgage Insurance, commonly known as LMI, is an insurance premium that may apply when you borrow more than 80% of a property's value. It is important to understand that LMI protects the lender, not the borrower, if the loan falls into default and the lender suffers a loss.

The cost of LMI can vary depending on the loan amount, property value, deposit size, and lender. In many cases, LMI can be capitalised, meaning it is added to the home loan rather than paid upfront. This can reduce the amount of cash required at settlement, although it also means you may pay interest on the LMI amount over the life of the loan.

Some borrowers may be able to avoid paying LMI through government initiatives, professional occupation waivers, family guarantee structures, or by contributing a larger deposit.

At Traikos Finance, we can help you understand whether LMI may apply, how much it could cost, and whether there are strategies or lender options that may reduce or avoid it.`
  },
  {
    id: "s2-3",
    question: "How much deposit do I need to buy a home?",
    answer: `A 20% deposit is often considered ideal because it may allow you to avoid Lenders Mortgage Insurance. However, many borrowers purchase property with less than a 20% deposit, depending on their circumstances and the lender's requirements.

In addition to the deposit, buyers also need to consider stamp duty, government charges, conveyancing costs, building and pest inspections, lender fees, moving costs, and any required cash buffer. First home buyers may also be eligible for grants, concessions, or government schemes that reduce the amount required upfront.

For some eligible first home buyers, purchasing with a 5% deposit may be possible through the First Home Guarantee Scheme. Other borrowers may choose to purchase with a 10% or 15% deposit and pay LMI if it allows them to enter the market sooner.

At Traikos Finance, we can help calculate the deposit and total funds required for your purchase so you know exactly what you need before making an offer.`
  },
  {
    id: "s2-4",
    question: "Can I buy a property with a 5% deposit?",
    answer: `Yes, some borrowers may be able to buy a property with as little as a 5% deposit, subject to lender approval and eligibility criteria. This is most commonly available to eligible first home buyers through government-backed initiatives such as the First Home Guarantee Scheme.

A 5% deposit can help buyers enter the property market sooner, particularly in areas where property prices are rising faster than savings. However, it is important to consider other purchase costs such as stamp duty, legal fees, government charges, and lender requirements.

Borrowers using a small deposit must still demonstrate that they can service the loan, have genuine savings where required, and meet the lender's credit and policy criteria. Property price caps and eligibility rules may also apply under government schemes.

At Traikos Finance, we can assess whether a 5% deposit purchase may be available to you and compare suitable lenders based on your circumstances.`
  },
  {
    id: "s2-5",
    question: "What is the First Home Guarantee Scheme?",
    answer: `The First Home Guarantee Scheme is a government initiative designed to help eligible first home buyers purchase a property sooner. Under the scheme, eligible buyers may be able to purchase with as little as a 5% deposit without paying Lenders Mortgage Insurance.

This can make a significant difference because LMI can be a major upfront or capitalised cost for borrowers purchasing with a smaller deposit. The scheme effectively allows eligible borrowers to access a loan with a lower deposit while the government provides a limited guarantee to the participating lender.

Eligibility criteria, income limits, property price caps, citizenship or residency requirements, and available places can apply. These rules can change, so it is important to check the current requirements before relying on the scheme.

At Traikos Finance, we can help first home buyers understand whether they may be eligible, which lenders participate, and how the scheme fits into their overall purchase strategy.`
  },
  {
    id: "s2-6",
    question: "What grants are available for first home buyers in Victoria?",
    answer: `First home buyer grants and concessions can vary depending on the property type, purchase price, location, and government policy at the time of purchase. In Victoria, first home buyers may be eligible for stamp duty concessions or exemptions depending on the purchase price and their circumstances.

Government assistance can make a meaningful difference to the amount of money required to purchase a property. However, the rules can be detailed and may change over time, so it is important to confirm eligibility before signing a contract.

At Traikos Finance, we can help you understand the types of government assistance that may be relevant to your purchase and work alongside your conveyancer or solicitor to ensure the right questions are asked before settlement.`
  },
  {
    id: "s2-7",
    question: "Should I choose a fixed or variable interest rate?",
    answer: `Choosing between a fixed and variable interest rate depends on your financial goals, risk tolerance, cash flow needs, and preference for certainty or flexibility.

A fixed rate can provide repayment certainty for a set period, which may help with budgeting and peace of mind. However, fixed loans can have restrictions on extra repayments, redraw access, offset accounts, and may involve break costs if you repay or refinance during the fixed period.

A variable rate generally offers more flexibility, including the ability to make additional repayments, access redraw, use offset accounts, and refinance more easily. However, repayments can increase if interest rates rise.

Some borrowers choose a split loan, where part of the loan is fixed and part remains variable. This can provide a balance between certainty and flexibility.

At Traikos Finance, we can explain the advantages and limitations of each option and help structure a loan that suits your goals.`
  },
  {
    id: "s2-8",
    question: "What is the difference between an offset account and redraw?",
    answer: `An offset account and redraw facility can both help reduce interest costs, but they work differently.

An offset account is a separate transaction account linked to your home loan. The balance in the offset account reduces the amount of the loan used to calculate interest. For example, if your home loan is $700,000 and you have $50,000 in offset, interest may only be calculated on $650,000.

A redraw facility allows you to access extra repayments you have made directly into your loan. For example, if you have paid an additional $20,000 into your loan, your lender may allow you to redraw some or all of those funds later.

The right option can depend on your loan purpose, tax considerations, flexibility needs, and savings habits. For investment loans, it is especially important to obtain tax advice before relying on redraw or offset strategies.

At Traikos Finance, we can compare loan products with offset and redraw features and help you understand which may be suitable for your situation.`
  },
  {
    id: "s2-9",
    question: "How long does home loan approval take?",
    answer: `Home loan approval timeframes vary depending on the lender, application complexity, property type, valuation requirements, and how quickly supporting documents are provided.

A pre-approval may be obtained within a few days with some lenders, while formal approval can take anywhere from several days to several weeks. More complex applications, such as self-employed loans, trust structures, construction loans, SMSF lending, or applications requiring detailed income verification, may take longer.

Formal approval usually requires the lender to assess your financial position, verify documents, complete a credit assessment, review the property, and obtain a satisfactory valuation.

At Traikos Finance, we help prepare your application properly from the outset, follow up with the lender, and keep you informed throughout the process to reduce delays wherever possible.`
  },
  {
    id: "s2-10",
    question: "How much can I save by refinancing?",
    answer: `The amount you can save by refinancing depends on your current interest rate, loan balance, remaining loan term, fees, and the new loan option available to you.

Even a small reduction in interest rate can result in meaningful savings over time, particularly on larger home loans. Refinancing may also help reduce repayments, improve loan features, consolidate debts, access equity, or restructure your loan to better suit your circumstances.

However, refinancing is not always the right decision. Costs such as discharge fees, government fees, settlement costs, application fees, and fixed-rate break costs need to be considered.

At Traikos Finance, we complete a detailed comparison before recommending a refinance so you can understand the potential savings, costs, and benefits before proceeding.`
  },
  {
    id: "s2-11",
    question: "How long does refinancing take?",
    answer: `Most refinances take between two and six weeks from application to settlement, although timeframes can vary depending on the lender, valuation requirements, discharge process, and application complexity.

A straightforward refinance for a PAYG borrower with clear income documents and a standard property may be completed faster than a more complex refinance involving cash-out, self-employed income, company or trust structures, or multiple properties.

The process generally involves reviewing your current loan, comparing lender options, submitting an application, completing a valuation, obtaining approval, signing loan documents, and arranging settlement with your existing lender.

At Traikos Finance, we manage the refinance process from start to finish and keep you updated throughout each stage.`
  },
  {
    id: "s2-12",
    question: "Will refinancing affect my credit score?",
    answer: `Refinancing can involve a credit enquiry when a lender assesses your application. A single credit enquiry is generally a normal part of applying for finance, but multiple applications across different lenders in a short period may have a greater impact.

Your overall credit profile is influenced by factors such as repayment history, existing debts, credit limits, credit enquiries, and whether accounts are paid on time.

Working with a mortgage broker can help reduce the risk of unnecessary applications because your scenario can be assessed against lender policy before submission.

At Traikos Finance, we aim to identify suitable lender options before applying so your application is positioned appropriately from the outset.`
  },
  {
    id: "s2-13",
    question: "Can I refinance if my property value has fallen?",
    answer: `It may still be possible to refinance if your property value has fallen, but your options may be more limited. A lower valuation can increase your Loan to Value Ratio, which may affect your interest rate, lender options, and whether Lenders Mortgage Insurance applies.

For example, if your loan balance remains the same but your property value decreases, your equity position may reduce. This can make it harder to refinance to certain lenders or access sharper interest rates.

At Traikos Finance, we can review your current loan, estimate your equity position, arrange valuations where appropriate, and compare lenders to determine whether refinancing remains viable.`
  },
  {
    id: "s2-14",
    question: "Does HECS debt affect borrowing capacity?",
    answer: `Yes. HECS or HELP debt can affect borrowing capacity because lenders take compulsory repayment obligations into account when assessing your income and expenses.

Having HECS debt does not prevent you from getting a home loan, but it may reduce the amount you can borrow. The impact will depend on your income, loan amount, lender policy, and overall financial position.

In some cases, paying down or clearing HECS may improve borrowing capacity, but this is not always the best use of funds. It is important to compare the impact before making a decision.

At Traikos Finance, we can model borrowing capacity with and without HECS so you can understand the potential difference.`
  },
  {
    id: "s2-15",
    question: "Do credit cards reduce borrowing capacity?",
    answer: `Yes. Credit card limits can reduce borrowing capacity even if you pay the card off in full each month. Lenders usually assess the approved credit limit, not just the current balance.

For example, a $20,000 credit card limit may reduce borrowing capacity because the lender assumes you could draw the card up to its limit and need to make repayments.

Reducing or closing unused credit cards can sometimes improve borrowing capacity, but this should be considered as part of your broader loan strategy.

At Traikos Finance, we can review your existing commitments and identify whether credit card limits are affecting your borrowing power.`
  },
  {
    id: "s2-16",
    question: "Can I use equity to buy an investment property?",
    answer: `Yes. Many investors use equity in an existing property to help fund the deposit and purchase costs for an investment property.

For example, if your home has increased in value and your loan balance has reduced, you may be able to access usable equity and use those funds towards another property purchase. This can reduce the need to save a separate cash deposit.

Lenders will still assess your ability to repay the new debt, including the existing loan, the equity release loan, and the proposed investment loan. Rental income, existing commitments, living expenses, and loan structure will all be considered.

At Traikos Finance, we can help calculate available equity, assess borrowing capacity, and structure the lending to support your investment goals.`
  },
  {
    id: "s2-17",
    question: "Should I choose principal and interest or interest-only repayments for an investment loan?",
    answer: `The choice between principal and interest repayments and interest-only repayments depends on your cash flow, investment strategy, tax position, and long-term goals.

Principal and interest repayments reduce the loan balance over time, which can help build equity and reduce total interest paid. Interest-only repayments may provide lower monthly repayments during the interest-only period, which can assist with cash flow and investment planning.

Interest-only loans may cost more over the long term because the principal is not reducing during the interest-only period. Lenders may also assess interest-only loans differently when calculating borrowing capacity.

Because there can be tax implications, investors should speak with their accountant or financial adviser before deciding on the most appropriate repayment structure.

At Traikos Finance, we can explain the lending implications and compare loan options that align with your broader investment strategy.`
  },
  {
    id: "s2-18",
    question: "How many investment properties can I own?",
    answer: `There is no fixed number of investment properties a person can own. The practical limit usually depends on borrowing capacity, equity, cash flow, lender policy, rental income, and overall risk profile.

As your portfolio grows, lenders may apply more detailed assessment methods, including shading rental income, applying higher assessment rates, and reviewing total debt exposure. Some lenders may be more suitable for portfolio investors than others.

The structure of your loans can also become increasingly important as your portfolio grows. Interest-only periods, offset accounts, equity access, lender diversification, and ownership structures can all influence future borrowing capacity.

At Traikos Finance, we can help investors review their portfolio lending position and identify strategies to support future growth.`
  },
  {
    id: "s2-19",
    question: "Can I buy an investment property through a trust?",
    answer: `Yes, it may be possible to purchase an investment property through a trust, depending on the lender and the trust structure. Common structures include discretionary trusts, family trusts and unit trusts.

Buying through a trust can have legal, tax, asset protection and estate planning implications, so it is important to obtain advice from a qualified accountant, solicitor or financial adviser before proceeding.

Not all lenders accept all trust structures, and those that do may have different documentation requirements, servicing policies and loan conditions.

At Traikos Finance, we can work alongside your professional advisers to identify lenders that may support your chosen structure from a lending perspective.`
  },
  {
    id: "s2-20",
    question: "Can I get a home loan with only one year of ABN history?",
    answer: `Potentially. Some lenders may consider self-employed borrowers with as little as 12 months of ABN or trading history, provided the overall application is strong and the income can be verified.

Other lenders may require two full years of tax returns and financial statements. The right lender will depend on your business type, income consistency, industry, credit history, deposit size, and loan purpose.

Alternative documentation options may be available, including BAS statements, accountant letters, business bank statements, Notices of Assessment or draft financials, depending on the lender.

At Traikos Finance, we help self-employed borrowers identify lenders whose policies align with their business history and income documentation.`
  },
  {
    id: "s2-21",
    question: "Can I get a home loan if my taxable income is low?",
    answer: `It may be possible, but it depends on the reason your taxable income is low and how the lender assesses your financial position.

Many self-employed borrowers have deductions, depreciation, one-off expenses, or business structures that reduce taxable income. Some lenders may add back certain expenses or assess income using alternative verification methods, while others may rely heavily on taxable income shown in tax returns.

Low taxable income can reduce borrowing capacity, so it is important to choose a lender that understands your business structure and income profile.

At Traikos Finance, we can review your financials and work with your accountant where appropriate to determine which lenders may consider your circumstances.`
  },
  {
    id: "s2-22",
    question: "What documents do self-employed borrowers need?",
    answer: `Self-employed borrowers may need to provide different documents depending on the lender and loan type. Common requirements include personal tax returns, business tax returns, financial statements, Notices of Assessment, BAS statements, business bank statements, trust deeds, company financials, and accountant contact details.

Some lenders may accept alternative documentation, such as BAS statements or accountant declarations, while others require full financials and tax returns.

The documentation required will depend on your business structure, trading history, income type, and whether you are applying for a full-doc or alt-doc loan.

At Traikos Finance, we provide a tailored document checklist so you know exactly what is required for your application.`
  },
  {
    id: "s2-23",
    question: "Can I split my home loan between fixed and variable rates?",
    answer: `Yes. Many lenders allow borrowers to split their home loan between fixed and variable interest rates.

A split loan can provide a balance between repayment certainty and flexibility. The fixed portion can help protect against rate movements during the fixed term, while the variable portion may allow access to features such as offset accounts, redraw, and additional repayments.

The right split will depend on your financial goals, cash flow, risk tolerance, and need for flexibility.

At Traikos Finance, we can compare split loan options and help structure your loan in a way that suits your circumstances.`
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
  const allFaqs = [...FAQ_DATA, ...ADDITIONAL_FAQ_DATA];

  const toggleFaq = (id) => {
    setOpenIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Split FAQs into two columns for desktop
  const midpoint = Math.ceil(allFaqs.length / 2);
  const leftColumnFaqs = allFaqs.slice(0, midpoint);
  const rightColumnFaqs = allFaqs.slice(midpoint);

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
              {allFaqs.map((faq) => (
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

import heroBg from '@/assets/simple.png';
import img1 from '@/assets/investment/second1.webp';
import img2 from '@/assets/investment/second.jpg';
import supportImg from '@/assets/investment/description.jpg';
import whyOneImg from '@/assets/investment/whyus1.jpg';
import whyTwoImg from '@/assets/investment/whyus2.webp';
import whyThreeImg from '@/assets/investment/whyus3.jpg';

export const INVESTMENT_CONTENT = {
  hero: {
    background: heroBg,
    title: 'INVESTMENT PROPERTY LOANS',
    body:
      'For Australian investors, property investment carries great importance, offering a source of security and stability. Even during challenging economic times, the strong demand for housing in sought-after locations has led to a steady appreciation in real estate prices. At Traikos Finance, we are here to support you as you decide whether you want to purchase an investment property, refinance an existing investment loan, or access equity to diversify your investments.',
    cta: 'Request a Call',
  },
  intro: {
    titleTop: 'INVESTMENT LOANS THAT MAY HELP',
    titleBottom: 'YOU EXPAND YOUR PORTFOLIO',
  },
  topSection: {
    leftImage: img1,
    middleImage: img2,
    title: ['GETTING YOUR FIRST', 'INVESTMENT PROPERTY', 'LOAN.'],
    body:
      "Purchasing an investment property requires a different approach to buying your own home. Lenders assess investment lending differently, and the right loan structure can have a significant impact on your cash flow and long-term financial position. At Traikos Finance, we help investors understand their options, compare lenders and secure finance solutions tailored to their individual circumstances and investment objectives.",
  },
  secondary: {
    title: 'FINDING THE IDEAL LOAN STRUCTURE FOR YOU.',
    body:
      "Choosing the right loan structure is just as important as choosing the right property. Whether you're considering interest-only repayments, offset accounts, accessing equity for future purchases or diversifying lending across multiple institutions, every decision should support your broader investment strategy. We work with you and, where appropriate, your accountant or financial adviser to ensure your lending structure aligns with your long-term goals.",
  },
  support: {
    image: supportImg,
    title: ['TAILORED INVESTMENT', 'PROPERTY LOAN SOLUTIONS.'],
    body:
      "Every investor has different goals, financial circumstances and risk tolerances, which is why a personalised lending strategy is essential. At Traikos Finance, we take the time to understand your objectives and provide tailored loan solutions designed to support your investment journey. With access to a wide range of lenders, we help structure your finance effectively, maximise flexibility and position you for future growth opportunities.",
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      { image: whyOneImg, label: 'HELPING YOU BUILD WEALTH THROUGH SMARTER FINANCE' },
      { image: whyTwoImg, label: 'FINANCE SOLUTIONS TAILORED TO YOUR INVESTMENT GOALS.' },
      { image: whyThreeImg, label: 'SUPPORT THROUGHOUT YOUR INVESTMENT JOURNEY.' },
    ],
  },
};

import heroBg from '@/assets/simple.png';
import img1 from '@/assets/grid_image/firsthome.png';
import img2 from '@/assets/grid_image/nexthome.png';
import supportImg from '@/assets/simplemain.png';
import whyOneImg from '@/assets/grid_image/firsthome.png';
import whyTwoImg from '@/assets/grid_image/nexthome.png';
import whyThreeImg from '@/assets/grid_image/refinancing.png';

export const INVESTMENT_CONTENT = {
  hero: {
    background: heroBg,
    title: 'INVESTMENT PROPERTY LOANS',
    body:
      'For Australian investors, property investment carries great importance, offering a source of security and stability. Even during challenging economic times, the strong demand for housing in sought-after locations has led to a steady appreciation in real estate prices. At Traikos Finance, we are here to support you as you decide whether you want to add an investment property to your portfolio, or if you would like to obtain, obtain a mortgage for refinancing, or access equity to diversify your investments.',
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
      "Securing a loan for an investment property is a completely different process from financing a home you plan to live in. Managing multiple mortgages for both your family home and an investment can be complex. Our team simplifies the process, explaining everything clearly and finding the optimal financing option designed to meet your specific needs.",
  },
  secondary: {
    title: 'FINDING THE IDEAL LOAN STRUCTURE FOR YOU.',
    body:
      "A well-structured investment loan can help you build wealth exponentially over time. Investors have a range of strategies to explore, from using offset accounts to reduce tax liabilities, structuring loan repayments to meet their needs, or spreading loans across different lenders for diversification. With all these factors at play, Traikos Finance will ensure your loans are strategically structured to improve your financial outcomes.",
  },
  support: {
    image: supportImg,
    title: ['TAILORED INVESTMENT', 'PROPERTY LOAN SOLUTIONS.'],
    body:
      "Getting an investment property loan requires a personalised approach, as there's no one-size-fits-all option. At Traikos Finance, we specialise in providing custom guidance, helping you structure your loan accounts, secure the most competitive interest rates, and make the most of offset accounts. We also work closely with your accountant or financial planner when needed to ensure all decisions align with your broader financial goals. Unlike banks that may push a single product, we offer loan solutions specifically designed to fit your unique needs and circumstances.",
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      { image: whyOneImg, label: 'With your investment property, peace of mind is insured.' },
      { image: whyTwoImg, label: 'Straightforward lending guidance. We drive your investment goals forward.' },
      { image: whyThreeImg, label: 'Special support for investment property loans.' },
    ],
  },
};

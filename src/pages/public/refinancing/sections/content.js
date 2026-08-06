import heroBg from '@/assets/grid_image/refinancing.png';
import img1 from '@/assets/refinancing/second1.jpg';
import img2 from '@/assets/refinancing/second2.webp';
import supportImg from '@/assets/refinancing/description.jpg';
import whyOneImg from '@/assets/refinancing/whyus.jpg';
import whyTwoImg from '@/assets/refinancing/whyus2.webp';
import whyThreeImg from '@/assets/refinancing/whyus3.webp';

export const REFINANCING_CONTENT = {
  hero: {
    background: heroBg,
    title: 'HOME LOAN REFINANCING',
    body:
      "Are you paying more than you need to on your current home loan? With lenders regularly changing rates, policies and cashback offers, many borrowers find their loan is no longer as competitive as it once was. Refinancing may help you reduce your repayments, access equity, consolidate debt or secure features better suited to your needs. At Traikos Finance, we compare a wide range of lenders and manage the process from start to finish, making refinancing simple and stress-free.",
    cta: 'Request a Call',
  },
  intro: {
    titleTop: 'IS YOUR HOME LOAN STILL ',
    

    titleBottom: 'COMPETITIVE?',
  },
  topSection: {
    leftImage: img1,
    middleImage: img2,
    title: ['DISCOVER YOUR', 'POTENTIAL SAVINGS'],
    body:
      "Refinancing isn't just about chasing a lower interest rate. Depending on your circumstances, it may provide an opportunity to reduce repayments, access equity for future plans, consolidate debts or secure loan features better suited to your goals. We take the time to review your current position, compare available options and provide a clear breakdown of the costs, benefits and potential savings before you make a decision.",
  },
  secondary: {
    title: "REFINANCE WITH CONFIDENCE. WE'LL GUIDE YOU THROUGH THE PROCESS WITHOUT THE CONFUSION.",
    body:
      "Every borrower has different financial goals, which is why there is no one-size-fits-all refinancing solution. Before recommending any lender, we take the time to understand your current loan, financial position and future plans. We then compare suitable lending options and, where appropriate, may negotiate with your existing lender to see if a better outcome can be achieved without the need to refinance. If refinancing is likely to provide a genuine benefit, we'll guide you through the process from application through to settlement, ensuring you understand your options every step of the way.",
  },
  support: {
    image: supportImg,
    title: ['ONGOING SUPPORT TO', 'HELP YOU PAY OFF YOUR LOAN'],
    body:
      "Securing a competitive loan today is only part of the equation. Interest rates, lender policies and your personal circumstances can change over time, which is why ongoing reviews are so important. At Traikos Finance, we stay in touch after settlement and regularly assess whether your loan remains competitive. Our goal is to help ensure your lending continues to align with your needs long after the refinance process has been completed.",
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      { image: whyOneImg, label: 'Use your home equity to unlock a smarter refinance strategy.' },
      { image: whyTwoImg, label: 'We compare cashback offers and lender incentives that actually add value.' },
      { image: whyThreeImg, label: 'Get clear guidance on when refinancing is worth it for your situation.' },
    ],
  },
};

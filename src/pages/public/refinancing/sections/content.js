import heroBg from '@/assets/grid_image/refinancing.png';
import img1 from '@/assets/grid_image/firsthome.png';
import img2 from '@/assets/grid_image/nexthome.png';
import supportImg from '@/assets/simplemain.png';
import whyOneImg from '@/assets/grid_image/firsthome.png';
import whyTwoImg from '@/assets/grid_image/construction.png';
import whyThreeImg from '@/assets/grid_image/loans.png';

export const REFINANCING_CONTENT = {
  hero: {
    background: heroBg,
    title: 'REFINANCING HOME LOANS AND MORTGAGES',
    body:
      "Are you concerned that you might be overpaying on your home loan or uncertain if your current rate is still competitive? Refinancing your mortgage to secure a better rate with more flexible terms in annual interest and reduces your monthly repayments. Plus, you might even be eligible for a cashback from your new lender. At Traikos Finance, we're committed to finding customised options that suit your needs and managing all the details to ensure a seamless experience.",
    cta: 'Request a Call',
  },
  intro: {
    titleTop: 'SECURE A BETTER RATE BY',
    titleBottom: 'REFINANCING TODAY',
  },
  topSection: {
    leftImage: img1,
    middleImage: img2,
    title: ['DISCOVER YOUR', 'POTENTIAL SAVINGS'],
    body:
      "Many lenders and brokers often make exclusive offers to attract customers. At Traikos Finance, we prioritise building genuine, long-term relationships over one-time transactions. We work together to seamlessly identify the most competitive rates based on your best interests and provide you with a comprehensive breakdown of costs and possible savings.",
  },
  secondary: {
    title: "REFINANCE WITH CONFIDENCE. WE'LL GUIDE YOU THROUGH THE PROCESS WITHOUT THE CONFUSION.",
    body:
      "Since every situation of refinancing at Traikos Finance is unique, it can be challenging to know where to begin. Before we dive into our lender panel's offerings, we'll discuss your current circumstances, review some tailored options based on your input, and then arrange a comprehensive client valuation if necessary. Following that, we usually reach out to your current lenders, allowing them a chance to keep your business by providing a better interest rate before we submit refinancing. Ultimately, refinancing should only be considered if it's something that genuinely benefits you. We're open.",
  },
  support: {
    image: supportImg,
    title: ['ONGOING SUPPORT TO', 'HELP YOU PAY OFF YOUR LOAN'],
    body:
      "Once your refinance is in place at Traikos Finance, it's not the beginning, but the start. We leverage advanced fintech software to assess your loan annually, ensuring it stays competitive in the market. Within each plan, you receive a call from us letting you know that we've reviewed, compared, and potentially improved your interest rate—all without any effort from your end. You're unlikely to receive this level of service if you went directly through a bank or broker.",
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

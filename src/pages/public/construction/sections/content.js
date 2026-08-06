import heroBg from '@/assets/grid_image/construction.png';
import img1 from '@/assets/construction/second.webp';
import img2 from '@/assets/construction/second2.webp';
import supportImg from '@/assets/construction/construction.webp';
import whyOneImg from '@/assets/construction/whyus.webp';
import whyTwoImg from '@/assets/construction/whyus2.jpeg';
import whyThreeImg from '@/assets/construction/whyus3.png';

export const CONSTRUCTION_CONTENT = {
  hero: {
    background: heroBg,
    title: 'CONSTRUCTION & RENOVATION LOANS',
    body:
      "Building or renovating a home gives you the opportunity to create a space that truly suits your lifestyle, needs and future goals. Whether you're constructing a new home from the ground up, undertaking a major renovation or adding value to an existing property, having the right finance structure in place is essential. At Traikos Finance, we help simplify the process by guiding you through your lending options and supporting you from planning through to completion.",
    cta: 'Request a Call',
  },
  intro: {
    titleTop: 'BREAK GROUND WITHOUT',
    titleBottom: 'BREAKING THE BANK',
  },
  topSection: {
    leftImage: img1,
    middleImage: img2,
    title: ['LAND AND CONSTRUCTION', 'LOANS IN AUSTRALIA'],
    body:
      "Financing a land purchase and construction project is different from a standard home loan. Construction loans are typically funded in stages as your build progresses, requiring careful planning and lender selection. At Traikos Finance, we help you understand the process, compare lending options and secure a loan structure that aligns with your budget, timeline and building plans. From vacant land purchases through to final completion, we're here to guide you every step of the way.",
  },
  secondary: {
    title: 'FINANCING A HOME RENOVATION',
    body:
      "Whether you're updating a kitchen, extending your home, undertaking a major renovation or transforming a fixer-upper, choosing the right finance strategy can make a significant difference to the success of your project. Depending on your circumstances, you may be able to use existing equity, refinance your current loan or obtain additional funding to cover renovation costs. We take the time to understand your plans and recommend a solution tailored to your budget, timeline and long-term financial goals.",
  },
  support: {
    image: supportImg,
    title: ['TAILORED GUIDANCE', 'FROM CONCEPT TO COMPLETION'],
    body:
      "Construction and renovation finance can involve additional documentation, valuations, building contracts and progress payments, making the process more complex than a standard home loan. At Traikos Finance, we help manage these moving parts by working closely with you, your builder and your lender throughout the journey. From pre-approval and finance structuring through to progress payments and final completion, we provide ongoing support to help keep your project moving forward with confidence.",
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      { image: whyOneImg, label: 'CONSTRUCTION FINANCE MADE SIMPLE' },
      { image: whyTwoImg, label: 'SOLUTIONS DESIGNED AROUND YOUR BUILD OR RENOVATION GOALS.' },
      { image: whyThreeImg, label: 'SUPPORT EVERY STEP OF THE WAY' },
    ],
  },
};

import heroBg from '@/assets/grid_image/nexthome.png';
import img1 from '@/assets/next_home/second.webp';
import img2 from '@/assets/next_home/second1.webp';
import supportImg from '@/assets/next_home/description.webp';
import whyOneImg from '@/assets/next_home/whyus.webp';
import whyTwoImg from '@/assets/next_home/whyus2.webp';
import whyThreeImg from '@/assets/next_home/whyus3.webp';

export const NEXT_HOME_CONTENT = {
  hero: {
    background: heroBg,
    title: 'NEXT HOME BUYER LOANS',
    body:
      'Buying your next home means navigating a new set of financial complexities — selling, buying, and timing it all perfectly. We simplify the process so you can move forward with confidence.',
    cta: 'Request a call',
  },
  intro: {
    titleTop: 'MAKE YOUR NEXT MOVE',
    titleBottom: 'YOUR SMART MOVE.',
  },
  topSection: {
    leftImage: img1,
    middleImage: img2,
    title: ['SECURE A BETTER HOME', 'LOAN FOR YOUR NEXT', 'PURCHASE.'],
    body:
      "This should be one of the most thrilling periods of your life, and the team at Traikos Finance is dedicated to streamlining the financing process, eliminating any complications and frustrations. Whether you're looking to design and build your own home, purchase off the plan, or move into an existing property, we've got all your financing needs taken care of.",
  },
  secondary: {
    title: "CONCERNED ABOUT NOT HAVING ENOUGH DEPOSIT FOR YOUR NEXT PURCHASE?",
    body:
      "If you don't have an extra 20% available for a deposit but have substantial equity in your home, we can use that equity to ensure you have the necessary funds ready for auction day. During your first consultation, we'll outline the financial requirements for accessing your equity, enabling you to bid confidently and secure your next home.",
  },
  support: {
    image: supportImg,
    title: ['FINANCING YOUR', 'HOME RELOCATION'],
    body:
      'Buying your next home involves navigating a myriad of complexities. Beyond the mortgage, you encounter various fees, rates, terms, and conditions, not to mention stamp duty and other legal costs throughout the process. Our knowledgeable team is dedicated to securing the most favourable rates on these expenses and ensuring you access all available discounts and concessions, making your relocation as seamless and advantageous as possible.',
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      { image: whyOneImg, label: 'Moving doesn\'t have to be a hassle.' },
      { image: whyTwoImg, label: 'Make the most of your equity.' },
      { image: whyThreeImg, label: 'We can help you achieve your goals sooner.' },
    ],
  },
};

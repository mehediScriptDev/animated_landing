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
    titleTop: 'MAKE YOUR NEXT',
    titleBottom: 'MOVE WITH CONFIDENCE',
  },
  topSection: {
    leftImage: img1,
    middleImage: img2,
    title: ['SECURE A BETTER HOME', 'LOAN FOR YOUR NEXT', 'PURCHASE.'],
    body:
      "Moving to your next home often involves more than simply applying for a new loan. Whether you're upsizing, downsizing, relocating or purchasing your forever home, it's important to have a finance strategy that aligns with your goals. At Traikos Finance, we help you understand your borrowing capacity, assess your available equity and structure your finance correctly so you can make your next move with confidence. From pre-approval through to settlement, we're with you every step of the way. ",
  },
  secondary: {
    title: "CONCERNED ABOUT NOT HAVING ENOUGH DEPOSIT FOR YOUR NEXT PURCHASE?",
    body:
      "One of the biggest concerns for next home buyers is accessing enough funds for a deposit before their current property is sold. The good news is that you may not need cash sitting in the bank. If you've built equity in your existing home, we may be able to use that equity towards the deposit and purchasing costs of your next property. During your initial consultation, we'll assess your position and explain the available options, helping you understand exactly how much you can borrow and whether you're in a position to buy before you sell",
  },
  support: {
    image: supportImg,
    title: ['FINANCING YOUR', 'HOME RELOCATION'],
    body:
      'Purchasing your next home often involves balancing the sale of your current property with the purchase of your new one, while managing finance approvals, timing considerations and moving costs. Our team will help you understand your borrowing options, available equity and loan structures, ensuring your finance is set up correctly from the outset. With clear guidance and personalised support throughout the process, we help make your transition into your next home as smooth and stress-free as possible. ',
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      { image: whyOneImg, label: 'Moving doesn\'t have to be a hassle.' },
      { image: whyTwoImg, label: 'Make the most of your equity.' },
      { image: whyThreeImg, label: 'BUY BEFORE YOU SELL WITH CONFIDENCE' },
    ],
  },
};

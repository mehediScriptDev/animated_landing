import heroBg from '@/assets/grid_image/construction.png';
import img1 from '@/assets/grid_image/construction.png';
import img2 from '@/assets/grid_image/firsthome.png';
import supportImg from '@/assets/simplemain.png';
import whyOneImg from '@/assets/grid_image/firsthome.png';
import whyTwoImg from '@/assets/grid_image/nexthome.png';
import whyThreeImg from '@/assets/grid_image/loans.png';

export const CONSTRUCTION_CONTENT = {
  hero: {
    background: heroBg,
    title: 'CONSTRUCTION & RENOVATION LOANS',
    body:
      "Building your own home offers practical advantages, the most significant being complete creative control, allowing you to tailor the property to suit your exact needs. It's also one of the most cost-efficient ways to create your ideal living space, as finding an existing property that meets all your criteria can often be out of reach in terms of location or budget. Another popular approach is the classic renovation project—from breathing new life into a potential fixer-upper to a relatively low-investment way to make a property your own.",
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
      "You can often secure the finest block of land and have a builder construct your home, all through a single loan. At Traikos Finance, we'll help you navigate through options from our extensive network of 90 banks and lenders, ensuring you find the optimal financing solution for your land and construction package.",
  },
  secondary: {
    title: 'FINANCING A HOME RENOVATION',
    body:
      "Looking for a great fixer-upper? We can simplify the process by offering financing options that cover both the property purchase and renovation costs, so you can start your project without delay.\n\nThere are plenty of factors to weigh, such as using your current home's equity or exploring various financing options. Our specialists are here to help you find the ideal approach for your needs.\n\nIf you already own a property, you've got several ways to fund your renovation—whether it's taking out a new loan, tapping into your home's equity, or refinancing your existing mortgage. Our team will guide you to the top option based on your unique situation and project size.",
  },
  support: {
    image: supportImg,
    title: ['TAILORED GUIDANCE', 'FROM CONCEPT TO COMPLETION'],
    body:
      "At Traikos Finance, individuals and families rely on our building and renovation loan specialists to guide them through every stage of the financing and application process, allowing you to focus on what matters most. From property appraisals and pre-approval documentation to progress payments, we'll support you throughout every stage of your homebuilding or renovation journey, ensuring your project goes become a reality.",
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      { image: whyOneImg, label: 'Trusted guidance from concept to completion.' },
      { image: whyTwoImg, label: 'Build and save at the same time.' },
      { image: whyThreeImg, label: 'The ideal loan for your home.' },
    ],
  },
};

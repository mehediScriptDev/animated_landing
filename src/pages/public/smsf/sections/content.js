import heroBg from '@/assets/grid_image/loans.png';
import img1 from '@/assets/grid_image/firsthome.png';
import img2 from '@/assets/smsf/another.webp';
import supportImg from '@/assets/smsf/description.webp';
import whyOneImg from '@/assets/smsf/whyus.webp';
import whyTwoImg from '@/assets/smsf/whyus2.webp';
import whyThreeImg from '@/assets/smsf/whyus3.jpg';

export const SMSF_CONTENT = {
  hero: {
    background: heroBg,
    title: 'SELF-MANAGED SUPER FUND PROPERTY LOANS',
    body:
      "Purchasing property through a Self-Managed Super Fund (SMSF) can be an effective way to build long-term wealth and grow your retirement savings. Whether you're considering your first SMSF property purchase or expanding an existing portfolio, Traikos Finance can help you navigate the lending process and understand the finance options available to your fund.",
    cta: 'Request a Call',
  },
  intro: {
    titleTop: 'GUIDING YOU THROUGH SMSF',
    titleBottom: 'PROPERTY FINANCE',
  },
  topSection: {
    leftImage: img1,
    middleImage: img2,
    title: ['LET TRAIKOS FINANCE HELP', 'YOU NAVIGATE THE', 'COMPLEXITIES'],
    body:
      "SMSF lending is significantly different from traditional home and investment lending. It involves specialised loan structures, trust arrangements, lender requirements and regulatory considerations that require careful planning. At Traikos Finance, we work alongside your accountant, financial adviser and legal professionals where required to help ensure your finance structure aligns with your broader retirement and investment objectives. Our role is to simplify the lending process and help you understand your available options with confidence.",
  },
  secondary: {
    title: 'NOT ALL LENDERS PROVIDE SMSF MORTGAGE LOANS',
    body:
      "SMSF lending is a specialised area of finance and not all lenders offer SMSF loan products. Those that do often have different lending policies, documentation requirements and property criteria. With access to a range of SMSF lenders, Traikos Finance helps identify suitable lending solutions based on your fund structure, borrowing requirements and long-term objectives, helping streamline what can otherwise be a complex process.",
  },
  support: {
    image: supportImg,
    title: ['TAILORED SMSF', 'LOAN SOLUTIONS'],
    body:
      "Every SMSF is different, which is why a tailored lending strategy is essential. We take the time to understand your fund structure, investment goals and financial position before recommending a lending solution. Whether you're purchasing residential or commercial property through your SMSF, refinancing an existing SMSF loan or exploring opportunities to grow your portfolio, we provide guidance and support throughout the process to help you make informed decisions.",
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      { image: whyOneImg, label: 'CLEAR GUIDANCE THROUGH A COMPLEX LENDING PROCESS.' },
      { image: whyTwoImg, label: 'HELPING YOU EXPLORE SUITABLE LENDING OPTIONS.' },
      { image: whyThreeImg, label: 'SOLUTIONS ALIGNED WITH YOUR FUND\'S OBJECTIVES.' },
    ],
  },
};

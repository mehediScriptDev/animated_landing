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
    title: 'SMSF LOANS',
    body:
      "If you're a member of a self-managed super fund (SMSF) as an individual or corporate trustee, investing in property can be a powerful way to enhance your retirement savings and maximise distributions for members.",
    cta: 'Request a Call',
  },
  intro: {
    titleTop: 'YOUR TRUSTED SMSF PROPERTY',
    titleBottom: 'LENDER AND BROKER',
  },
  topSection: {
    leftImage: img1,
    middleImage: img2,
    title: ['LET TRAIKOS FINANCE HELP', 'YOU NAVIGATE THE', 'COMPLEXITIES'],
    body:
      "While SMSF loans are a fantastic way to enhance your fund's returns, they also come with complexities that differ from standard loans, involving several layers of government regulations before you can get approval. There are specific limitations to be aware of, such as typically allowing up to 20% leverage affecting all fund members, and capping interest-only repayments at five years. Moreover, the minimum loan amount usually starts at $100,000, while the maximum permitted leverage is generally restricted to 80%.",
  },
  secondary: {
    title: 'NOT ALL LENDERS PROVIDE SMSF MORTGAGE LOANS',
    body:
      "It's important to note that not all banks and lending institutions are equipped to manage these types of loans, only a limited number do. At Traikos Finance, our specialists maintain strong relationships with a select group of SMSF lenders to maximise your chances of securing approval with optimal rates, fees, and terms. Contact our team today, and let us assist you in growing your super fund.",
  },
  support: {
    image: supportImg,
    title: ['TAILORED SMSF', 'LOAN SOLUTIONS'],
    body:
      "The constantly shifting landscape of investment property finance can be a challenge to manage. At Traikos Finance, we have the knowledge and expertise to manage and solve the complex issues that can arise when structuring SMSF loans. With our vast experience, we know the complexity of structures in these circumstances, helping you understand how changes impact your situation. Over the years, we have assisted numerous property investors in achieving their SMSF financial goals and finding competitive loans for their investment properties.",
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

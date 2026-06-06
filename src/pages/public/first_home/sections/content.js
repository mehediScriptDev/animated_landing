import heroBg from '@/assets/first_home/mainbg.webp';
import firstHomeImg from '@/assets/first_home/second2.webp';
import nextHomeImg from '@/assets/first_home/second.webp';
import supportImg from '@/assets/description.webp';
import whyOneImg from '@/assets/first_home/whyus1.jpg';
import whyTwoImg from '@/assets/grid_image/refinancing.png';
import whyThreeImg from '@/assets/first_home/whyus3.jpg';

export const FIRST_HOME_CONTENT = {
  hero: {
    background: heroBg,
    title: 'FIRST HOME BUYER LOANS',
    body:
      "Buying your first home should feel exciting, not overwhelming. We simplify the lending process with practical advice, clear options, and support from pre-approval to settlement.",
    cta: 'Request a call',
  },
  intro: {
    titleTop: 'BUYING YOUR FIRST HOME?',
    titleBottom: "WE'LL MAKE IT A BREEZE",
  },
  topChoice: {
    leftImage: nextHomeImg,
    middleImage: firstHomeImg,
    title: ['YOUR TOP CHOICE FOR', 'FIRST-TIME HOME BUYER', 'MORTGAGES'],
    body:
      "This should be one of the most thrilling periods of your life, and the team at Traikos Finance is dedicated to streamlining the financing process, eliminating any complications and frustrations so you can settle into your new home more sooner. Whether you're looking to design and build your own home, purchase off the plan, or move into an existing property, we've got all your financing needs taken care of.",
  },
  purchase: {
    title: 'PURCHASE AN ESTABLISHED PROPERTY',
    body:
      "This should be one of the most thrilling periods of your life, and the team at Traikos Finance is dedicated to streamlining the financing process, eliminating any complications and frustrations so you can settle into your new home more sooner. Whether you're looking to design and build your own home, purchase off the plan, or move into an existing property, we've got all your financing needs taken care of.",
  },
  support: {
    image: supportImg,
    title: ['THOROUGH AND', 'COMPREHENSIVE SUPPORT'],
    body:
      "Our brokers investigate every available pathway, from first-home entitlements to lender policy options, to help reduce upfront pressure and improve long-term results. We tailor recommendations to your exact scenario, not a generic template.",
  },
  whyChoose: {
    title: 'WHY CHOOSE US',
    cards: [
      {
        image: whyOneImg,
        label: 'First-home buying support simplified',
      },
      {
        image: whyTwoImg,
        label: 'More options with clearer explanations',
      },
      {
        image: whyThreeImg,
        label: 'Lower upfront costs and smarter structures',
      },
    ],
  },
};

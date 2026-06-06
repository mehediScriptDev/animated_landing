import heroBg from "@/assets/first_home/mainbg.webp";
import firstHomeImg from "@/assets/first_home/second2.webp";
import nextHomeImg from "@/assets/first_home/second.webp";
import supportImg from "@/assets/description.webp";
import whyOneImg from "@/assets/first_home/whyus1.jpg";
import whyTwoImg from "@/assets/grid_image/refinancing.png";
import whyThreeImg from "@/assets/first_home/whyus3.jpg";

export const FIRST_HOME_CONTENT = {
  hero: {
    background: heroBg,
    title: "FIRST HOME BUYER LOANS",
    body: "Buying your first home should feel exciting, not overwhelming. We simplify the lending process with practical advice, clear options, and support from pre-approval to settlement.",
    cta: "Request a call",
  },
  intro: {
    titleTop: "BUYING YOUR FIRST HOME?",
    titleBottom: "WE'LL MAKE IT A BREEZE",
  },
  topChoice: {
    leftImage: nextHomeImg,
    middleImage: firstHomeImg,
    // title: ['YOUR TOP CHOICE FOR', 'FIRST-TIME HOME BUYER', 'MORTGAGES'],
    title: ["YOUR TRUSTED", "FIRST HOME BUYER", "SPECIALISTS"],
    body: "Buying your first home is one of life's biggest milestones, but navigating the finance process can often feel overwhelming. Between understanding your borrowing capacity, comparing lenders, securing pre-approval and making sense of government grants and concessions, there is a lot to consider. At Traikos Finance, we take the time to understand your goals, explain your options in plain English and guide you through every stage of the journey. With access to a wide range of lenders and loan products, we help you find a solution tailored to your circumstances, giving you the confidence to move forward and purchase your first home with clarity and peace of mind.",
  },
  purchase: {
    title: "PURCHASE AN ESTABLISHED PROPERTY",
    body: "Purchasing an established property can be an exciting and rewarding experience, but it's important to have the right finance strategy in place before making an offer. Whether you're buying through a private sale, auction or expressions of interest campaign, having your finance organised can put you in a stronger position and help you act quickly when the right property comes along. At Traikos Finance, we guide you through the entire process, from understanding your borrowing power and obtaining pre-approval through to settlement. Drawing on our extensive experience in both real estate and finance, we help ensure your loan structure is aligned with your long-term goals while making the path to home ownership as smooth and stress-free as possible.",
  },
  support: {
    image: supportImg,
    title: ["THOROUGH AND", "COMPREHENSIVE SUPPORT"],
    body: "Our brokers investigate every available pathway, from first-home entitlements to lender policy options, to help reduce upfront pressure and improve long-term results. We tailor recommendations to your exact scenario, not a generic template.",
  },
  whyChoose: {
    title: "WHY CHOOSE US",
    cards: [
      {
        image: whyOneImg,
        label:
          "Guidance from pre-approval through to settlement.",
      },
      {
        image: whyTwoImg,
        label:
          "Access to a wide range of lenders with advice tailored to your circumstances.",
      },
      {
        image: whyThreeImg,
        label:
          "We help identify grants, concessions and loan structures that may save you money.",
      },
    ],
  },
};

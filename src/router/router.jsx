import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/public/home_page/Home';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPage from '../pages/public/privacy_policy_page/PrivacyPage';
import DisclaimerPage from '../pages/public/disclaimer_page/DisclaimerPage';
import ComplimentsPage from '../pages/public/compliments_page/ComplimentsPage';
import ContactPage from '../pages/public/contact/ContactPage';
import RootLayout from '../layouts/RootLayout';
import About from '../pages/public/about/About';
import FirstHome from '../pages/public/first_home/FirstHome';
import NextHome from '../pages/public/next_home/NextHome';
import Investment from '../pages/public/investment/Investment';
import Construction from '../pages/public/construction/Construction';
import Smsf from '../pages/public/smsf/Smsf';
import Refinancing from '../pages/public/refinancing/Refinancing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'first-home', element: <FirstHome /> },
      { path: 'next-home', element: <NextHome /> },
      { path: 'investment', element: <Investment /> },
      { path: 'construction', element: <Construction /> },
      { path: 'smsf', element: <Smsf /> },
      { path: 'refinancing', element: <Refinancing /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'disclaimer', element: <DisclaimerPage /> },
      { path: 'compliments', element: <ComplimentsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;

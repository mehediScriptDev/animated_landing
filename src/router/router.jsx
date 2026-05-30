import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/public/home_page/Home';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPage from '../pages/PrivacyPage';
import DisclaimerPage from '../pages/DisclaimerPage';
import ComplimentsPage from '../pages/ComplimentsPage';
import RootLayout from '../layouts/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'disclaimer', element: <DisclaimerPage /> },
      { path: 'compliments', element: <ComplimentsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;

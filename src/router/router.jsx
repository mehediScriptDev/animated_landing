import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/public/home_page/Home';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPage from '../pages/public/privacy_policy_page/PrivacyPage';
import DisclaimerPage from '../pages/public/disclaimer_page/DisclaimerPage';
import ComplimentsPage from '../pages/public/compliments_page/ComplimentsPage';
import RootLayout from '../layouts/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'disclaimer', element: <DisclaimerPage /> },
      { path: 'compliments', element: <ComplimentsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;

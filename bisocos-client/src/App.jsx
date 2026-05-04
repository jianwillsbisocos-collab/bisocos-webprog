import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// HomePage Structure
import Layout from './Layouts/Layout';
import ArticleDetailPage from './LandingPages/ArticleDetailPage';
import HomePage from './LandingPages/HomePage';
import AboutPage from './LandingPages/AboutPage';
import ArticleListPage from './LandingPages/ArticleListPage';

import AuthLayout from './Layouts/AuthLayout';
import SignInPage from './AuthPages/SignInPage';
import SignUpPage from './AuthPages/SignUpPage';

import NotFoundPage from './LandingPages/NotFoundPage';

import DashLayout from './Layouts/DashLayout';
import DashboardPage from './DashBoardPages/DashboardPage';
import ReportsPage from './DashBoardPages/ReportPage';
import UsersPage from './DashBoardPages/UserPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
{
        path: 'articles/:name',
        element: <ArticleDetailPage />,
      },
    ],
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "dashboard/",
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      }
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
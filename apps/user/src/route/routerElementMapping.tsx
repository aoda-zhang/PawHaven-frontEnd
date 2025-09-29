import SuspenseWrapper from '@shared/components/SuspenseWrapper';
import { lazy, ReactElement } from 'react';

import ErrorFallback from '@/components/ErrorFallback';
import GuardRoute from '@/components/GuardRoute';
import NotFund from '@/components/NotFund';
import AuthLayout from '@/features/Auth/authLayout';
import Login from '@/features/Auth/Login';
import Register from '@/features/Auth/Register';
import Home from '@/features/Home';
import RootLayout from '@/layout';

const ReportStray = lazy(() => import('@/features/ReportStray'));
const ReportDetail = lazy(() => import('@/features/RescueDetail'));

// Please use SuspenseWrapper to wrap the lazy loaded components

const routerElementMapping: Record<string, ReactElement> = {
  guardRoute: (
    <GuardRoute>
      <RootLayout />
    </GuardRoute>
  ),
  rootLayout: <RootLayout />,
  home: <Home />,
  authLayout: <AuthLayout />,
  auth_login: <Login />,
  auth_register: <Register />,
  report_stray: (
    <SuspenseWrapper>
      <ReportStray />
    </SuspenseWrapper>
  ),
  rescue_detail: (
    <SuspenseWrapper>
      <ReportDetail />
    </SuspenseWrapper>
  ),
  notFund: <NotFund />,
  errorFallback: <ErrorFallback />,
};

export default routerElementMapping;

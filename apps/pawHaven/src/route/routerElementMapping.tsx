import SuspenseWrapper from '@shared/components/SuspenseWrapper';
import { lazy, ReactElement } from 'react';

import ErrorFallback from '@/components/ErrorFallback';
import GuardRoute from '@/components/GuardRoute';
import NotFund from '@/components/NotFund';
import AuthLayout from '@/features/Auth/authLayout';
import Home from '@/features/Home';
import ReportStray from '@/features/ReportStray';
import RootLayout from '@/layout';

const Login = lazy(() => import('@/features/Auth/Login'));
const Register = lazy(() => import('@/features/Auth/Register'));

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
  auth_login: (
    <SuspenseWrapper>
      <Login />
    </SuspenseWrapper>
  ),
  auth_register: (
    <SuspenseWrapper>
      <Register />
    </SuspenseWrapper>
  ),
  report_stray: (
    <SuspenseWrapper>
      <ReportStray />
    </SuspenseWrapper>
  ),
  notFund: <NotFund />,
  errorFallback: <ErrorFallback />,
};

export default routerElementMapping;

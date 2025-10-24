import { SuspenseWrapper } from '@pawhaven/ui';
import type { ReactElement } from 'react';
import { lazy } from 'react';

import ErrorFallback from '@/components/ErrorFallback';
// import GuardRoute from '@/components/GuardRoute';
import NotFund from '@/components/NotFund';
import Login from '@/features/Auth/Login';
import Register from '@/features/Auth/Register';
import Home from '@/features/Home';
import RescueGuide from '@/features/RescueGuide';
import RootLayout from '@/layout';

const ReportStray = lazy(() => import('@/features/ReportStray'));
const ReportDetail = lazy(() => import('@/features/RescueDetail'));

// Please use SuspenseWrapper to wrap the lazy loaded components

const routerElementMapping: Record<string, ReactElement> = {
  // guardRoute: (
  //   <GuardRoute>
  //     <RootLayout />
  //   </GuardRoute>
  // ),
  rootLayout: <RootLayout />,
  home: <Home />,
  auth_login: <Login />,
  auth_register: <Register />,
  report_stray: (
    <SuspenseWrapper>
      <ReportStray />
    </SuspenseWrapper>
  ),
  rescue_guides: (
    <SuspenseWrapper>
      <RescueGuide />
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

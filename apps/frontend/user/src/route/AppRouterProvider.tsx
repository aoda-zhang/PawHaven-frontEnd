import { Loading } from '@pawhaven/ui';
import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routerElementMapping from '@/route/routerElementMapping';
import type { GlobalStateType } from '@/store/globalReducer';
import { useGlobalState } from '@/store/globalReducer';

export interface RouteMetaType {
  isRequireUserLogin?: boolean;
  children?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routesMapping = (routesFromAPI: any[]): RouteObject[] => {
  return routesFromAPI.map((route) => {
    const mappedRoute: RouteObject = {
      path: route?.path,
      element: routerElementMapping[route.element],
      errorElement: routerElementMapping.errorFallback,
      handle: route.handle,
    };

    if (route?.children) {
      mappedRoute.children = routesMapping(route.children);
    }

    return mappedRoute;
  });
};

const AppRouterProvider = () => {
  const { globalRouters } = useGlobalState() as GlobalStateType;
  if (globalRouters?.length > 0) {
    const routes = createBrowserRouter(routesMapping(globalRouters));
    return <RouterProvider router={routes} />;
  }
  return <Loading />;
};

export default AppRouterProvider;

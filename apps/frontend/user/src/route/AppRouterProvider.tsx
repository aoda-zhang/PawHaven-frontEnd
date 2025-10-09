import Loading from '@sharedComponents/Loading';
import { ReactNode } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';

import routerElementMapping from '@/route/routerElementMapping';
import { GlobalStateType, useGlobalState } from '@/store/globalReducer';

export interface RouteMetaType {
  isRequireUserLogin?: boolean;
  children?: ReactNode;
}

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

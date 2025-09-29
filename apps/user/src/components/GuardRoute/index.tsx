import storageKeys from '@shared/constants/storageKeys';
import storageTool from '@shared/utils/storage';
import { ReactElement, useEffect, useState } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';

import { RouteMetaType } from '@/route/AppRouterProvider';
import routePaths from '@/route/routePaths';

const GuardRoute = ({ children }: { children: ReactElement }) => {
  const routerMatches = useMatches();
  const currentRouteMeta: RouteMetaType =
    routerMatches[routerMatches.length - 1]?.handle ?? {};
  const { isRequireUserLogin = true } = currentRouteMeta;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Default to ask user login if not specified
    if (isRequireUserLogin) {
      const isUserLogged = storageTool.get(storageKeys.accessToken);
      if (!isUserLogged) {
        navigate(routePaths.login);
      } else {
        setIsChecked(true);
      }
    } else {
      setIsChecked(true);
    }
  }, [isRequireUserLogin, navigate]);
  if (!isChecked) {
    return null;
  }

  return children;
};

export default GuardRoute;

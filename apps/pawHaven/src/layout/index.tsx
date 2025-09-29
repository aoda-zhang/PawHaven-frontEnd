import {
  NavigateFunction,
  Outlet,
  UIMatch,
  useMatches,
  useNavigate,
} from 'react-router-dom';

import RootLayoutFooter from './RootLayoutFooter';
import RootLayoutMenu from './RootLayoutMenu';
import { MenuItemType } from './types';

import { GlobalStateType, useGlobalState } from '@/store/globalReducer';

export interface LayoutProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  routerMatches: UIMatch<unknown, unknown>[];
}

const RootLayout = () => {
  const { globalMenuItems } = useGlobalState() as GlobalStateType;
  const navigate = useNavigate();
  const routerMatches = useMatches();
  return (
    <div className="flex flex-col box-border h-full min-h-dvh">
      <RootLayoutMenu
        menuItems={globalMenuItems}
        navigate={navigate}
        routerMatches={routerMatches}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <RootLayoutFooter />
      </div>
    </div>
  );
};

export default RootLayout;

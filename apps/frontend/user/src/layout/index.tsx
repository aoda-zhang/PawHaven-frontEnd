import type { NavigateFunction, UIMatch } from 'react-router-dom';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';

import RootLayoutFooter from './RootLayoutFooter';
import RootLayoutMenu from './RootLayoutMenu';

import type { GlobalStateType } from '@/store/globalReducer';
import { useGlobalState } from '@/store/globalReducer';
import type { MenuItemType } from '@/types/LayoutType';

export interface LayoutProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  routerMatches: Array<UIMatch<unknown, unknown>>;
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

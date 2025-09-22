import {
  NavigateFunction,
  Outlet,
  UIMatch,
  useMatches,
  useNavigate,
} from 'react-router-dom';

import styles from './index.module.css';
import RootLayoutFooter from './RootLayoutFooter';
import RootLayoutMenu from './RootLayoutMenu';
import { MenuItemType } from './RootLayoutMenuRender';

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
    <div className={styles.layout}>
      <RootLayoutMenu
        menuItems={globalMenuItems}
        navigate={navigate}
        routerMatches={routerMatches}
      />
      <div className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
        <RootLayoutFooter />
      </div>
    </div>
  );
};

export default RootLayout;

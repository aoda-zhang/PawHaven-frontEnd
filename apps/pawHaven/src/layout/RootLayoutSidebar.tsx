import { Drawer } from '@mui/material';
import { NavigateFunction } from 'react-router-dom';

import styles from './index.module.css';
import RootLayoutMenuRender, { MenuItemType } from './RootLayoutMenuRender';

interface RootLayoutSidebarProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}

const RootLayoutSidebar = ({
  menuItems,
  isSidebarOpen,
  onCloseSidebar,
  navigate,
}: RootLayoutSidebarProps) => {
  return (
    <Drawer
      open={isSidebarOpen}
      anchor="right"
      onClose={onCloseSidebar}
      classes={{ paper: styles.rootSidebarPaper }}
    >
      <RootLayoutMenuRender menuItems={menuItems} navigate={navigate} />
    </Drawer>
  );
};
export default RootLayoutSidebar;

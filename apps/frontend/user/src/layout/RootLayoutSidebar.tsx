import { Drawer } from '@mui/material';
import { NavigateFunction } from 'react-router-dom';

import RootLayoutMenuRender from './RootLayoutMenuRender';
import { MenuItemType } from './types';

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
      PaperProps={{ className: 'h-full bg-background text-text pt-7' }}
    >
      <RootLayoutMenuRender menuItems={menuItems} navigate={navigate} />
    </Drawer>
  );
};
export default RootLayoutSidebar;

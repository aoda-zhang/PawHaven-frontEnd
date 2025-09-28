import useIsMobile from '@shared/hooks/useIsMobile';
import { AlignJustify } from 'lucide-react';
import { useState } from 'react';
import { NavigateFunction, UIMatch } from 'react-router-dom';

import styles from './index.module.css';
import RootLayoutMenuRender, { MenuItemType } from './RootLayoutMenuRender';
import RootLayoutSidebar from './RootLayoutSidebar';

import Brand from '@/components/Brand';

interface RouterInfoType {
  data: Record<string, any> | undefined;
  handle: {
    isMenuAvailable: boolean;
    requireUserLogin: boolean;
  };
  id: string;
  params: Record<string, any> | undefined;
  pathname: string;
}

export interface RootLayoutHeaderProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  routerMatches?: UIMatch<unknown, unknown>[];
}

const RootLayoutMenu = ({
  menuItems,
  navigate,
  routerMatches,
}: RootLayoutHeaderProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const currentRouter = routerMatches?.[
    (routerMatches?.length ?? 0) - 1
  ] as RouterInfoType;
  const isMenuAvailable = !currentRouter?.handle?.isMenuAvailable;

  const onOpenSidebar = () => setSidebarOpen(true);
  const onCloseSidebar = () => setSidebarOpen(false);

  if (!isMenuAvailable) return null;

  return (
    <header className={styles.header}>
      <Brand navigate={navigate} />
      {!isMobile && (
        <RootLayoutMenuRender
          menuItems={menuItems}
          activePath={currentRouter?.pathname || ''}
          navigate={navigate}
        />
      )}

      {/* Open Side bar Icon */}
      {isMobile && <AlignJustify size={36} onClick={onOpenSidebar} />}
      {/* Side bar */}
      <RootLayoutSidebar
        menuItems={menuItems}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={onCloseSidebar}
        navigate={navigate}
      />
    </header>
  );
};

export default RootLayoutMenu;

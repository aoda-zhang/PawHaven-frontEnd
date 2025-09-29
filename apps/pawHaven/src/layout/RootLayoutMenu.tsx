import useIsMobile from '@shared/hooks/useIsMobile';
import { AlignJustify } from 'lucide-react';
import { useState } from 'react';

import RootLayoutMenuRender from './RootLayoutMenuRender';
import RootLayoutSidebar from './RootLayoutSidebar';
import { RootLayoutHeaderProps, RouterInfoType } from './types';

import Brand from '@/components/Brand';

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
    <header className="flex items-center gap-4 box-border sticky top-0 p-[.625rem] z-50 border-border border-b-1 px-6 py-4 bg-white">
      <Brand navigate={navigate} />
      {!isMobile && (
        <RootLayoutMenuRender
          menuItems={menuItems}
          activePath={currentRouter?.pathname || ''}
          navigate={navigate}
        />
      )}

      {/* Open Side bar Icon */}
      {isMobile && <AlignJustify size={34} onClick={onOpenSidebar} />}
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

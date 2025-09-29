import { NavigateFunction, UIMatch } from 'react-router-dom';

export enum MenuType {
  link = 'link',
  component = 'component',
}

export interface MenuItemType {
  label: string;
  to?: string;
  classNames?: string[];
  isAvailableOnMobile?: boolean;
  isOnlyMobile?: boolean;
  component?: any;
  action?: string; // Explicitly type the action property
  props?: Record<string, any>;
  type: MenuType;
}

export interface MenuRenderType {
  menuItems: MenuItemType[];
  activePath?: string;
  navigate: NavigateFunction;
}

export interface RouterInfoType {
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

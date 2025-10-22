import type { ReactElement } from 'react';
import type { NavigateFunction, UIMatch } from 'react-router-dom';

const menuTypes = {
  link: 'link',
  component: 'component',
} as const;

export type MenuType = (typeof menuTypes)[keyof typeof menuTypes];

export interface MenuItemType {
  label: string;
  to?: string;
  classNames?: string[];
  isAvailableOnMobile?: boolean;
  isOnlyMobile?: boolean;
  component?: ReactElement;
  action?: string;
  props?: Record<string, unknown>;
  type: MenuType;
}

export interface MenuRenderType {
  menuItems: MenuItemType[];
  activePath?: string;
  navigate: NavigateFunction;
}

export interface RouterInfoType {
  data: Record<string, unknown> | undefined;
  handle: {
    isMenuAvailable: boolean;
    requireUserLogin: boolean;
  };
  id: string;
  params: Record<string, unknown> | undefined;
  pathname: string;
}

export interface RootLayoutHeaderProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  routerMatches?: Array<UIMatch<unknown, unknown>>;
}

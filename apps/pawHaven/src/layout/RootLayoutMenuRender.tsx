import LangSwitcher from '@shared/components/LangSwitcher';
import clsx from 'clsx';
import { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction } from 'react-router-dom';

import styles from './index.module.css';

const HeaderActionKeys = {
  openSidebarMenu: 'openSidebarMenu',
  toggleDark: 'toggleDark',
};
enum MenuType {
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
const RootLayoutMenuRender = (props: MenuRenderType) => {
  const HeaderComponentMappings = {
    LangSwitcher: <LangSwitcher />,
  };
  const { menuItems, activePath, navigate } = props;
  const { t } = useTranslation();

  const toggleDark = (theme: string) => {
    return `props_${theme}`;
  };

  const handleHeaderAction = (action: string, actionProps: any) => {
    switch (action) {
      case HeaderActionKeys.toggleDark:
        toggleDark(actionProps);
        break;
      // Add more cases for different actions as needed
      default:
        console.warn(`Unknown header action: ${action}`);
    }
  };

  const handleLinkMenu = (item: MenuItemType) => {
    if (item?.to) {
      const isActiveMenuItem =
        item.type === MenuType.link && activePath === item?.to;
      let itemClassNames =
        item?.classNames?.map((name) => styles?.[name]) ?? [];
      if (isActiveMenuItem) {
        // Active the current menu
        itemClassNames = [...itemClassNames, styles.activeMenu];
      }
      return (
        <div
          className={clsx(itemClassNames)}
          key={item.label}
          role="button"
          tabIndex={0}
          onClick={() => {
            navigate(item.to || '/');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate(item.to || '/');
            }
          }}
        >
          {t(item.label)}
        </div>
      );
    }
    return null;
  };

  const handleComponentMenu = (item: MenuItemType) => {
    if (item?.component) {
      const itemClassNames = item?.classNames?.map((name) => styles?.[name]);
      const Component =
        HeaderComponentMappings[
          item.component as keyof typeof HeaderComponentMappings
        ];
      return (
        <div
          className={clsx(itemClassNames)}
          key={item?.label}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!item.action) return;
            handleHeaderAction(item.action, item?.props ?? {});
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!item.action) return;
              handleHeaderAction(item.action, item?.props ?? {});
            }
          }}
        >
          {Component && cloneElement(Component, item.props ?? {})}
        </div>
      );
    }
    return null;
  };

  return menuItems?.map((item) => {
    switch (item.type) {
      case MenuType.link:
        return handleLinkMenu(item);
      case MenuType.component:
        return handleComponentMenu(item);
      default:
        return null;
    }
  });
};

export default RootLayoutMenuRender;

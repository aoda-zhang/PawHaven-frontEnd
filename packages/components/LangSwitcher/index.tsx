import { Popover } from '@mui/material';
import { ChevronDown, Globe } from 'lucide-react';
import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import StorageKeys from '../../constants/storageKeys';
import storageTool from '../../utils/storage';

import styles from './index.module.css';

const LanguageSelect = () => {
  const { i18n, t } = useTranslation();
  const supportedLanguages =
    useMemo(() => {
      return Object.keys(i18n.services.resourceStore.data);
    }, [i18n.services.resourceStore.data]) ?? [];
  const setLanguage = (language: string) => {
    storageTool.set(StorageKeys.I18NKEY, language);
    i18n.changeLanguage(language);
  };
  return (
    <div className={styles.languageSelect}>
      {supportedLanguages?.map((item) => (
        <button
          key={item}
          className={styles.item}
          onClick={() => setLanguage(item)}
          type="button"
        >
          {t(`common.${item}`)}
        </button>
      ))}
    </div>
  );
};

const LangSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div
        className={styles.lang}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Globe />
        {t(`common.${i18n.language}`)}
        <ChevronDown size={26} />
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{ paper: styles.popover }}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <LanguageSelect />
      </Popover>
    </>
  );
};
export default memo(LangSwitcher);

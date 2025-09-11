import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from '../index.module.css';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.slog}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 text-center text-white px-4">
        <p className={styles.title}>{t('common.slogan')}</p>
        <p className={styles.subTitle}>{t('common.subSlogan')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-start">
          <button
            type="button"
            className="roundedButton text-xl bg-primary text-white hover:bg-primary-dark"
            onClick={() => {
              navigate('/report-stray');
            }}
          >
            {t('home.report')}
          </button>
          <button
            type="button"
            className="roundedButton text-xl bg-white text-primary  hover:bg-gray-100"
          >
            {t('home.rescue')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

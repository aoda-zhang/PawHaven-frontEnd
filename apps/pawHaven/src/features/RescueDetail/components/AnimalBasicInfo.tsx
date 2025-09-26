import { Paper } from '@mui/material';
import dayjs from 'dayjs';
import { MapPin, Calendar, Info } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel';

import styles from '../index.module.css';

import { AnimalDetail } from '@/types/AnimalType';

const AnimalBasicInfo: React.FC<{ animal: AnimalDetail }> = ({ animal }) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };

  return (
    <div className={styles.basicInfoContainer}>
      <Carousel>
        {animal?.reporterPhotos?.map((item) => (
          <Paper key={item}>
            <img src={item} alt={item} className={styles.reportAnimalPic} />
          </Paper>
        ))}
      </Carousel>

      <div className={styles.infoContent}>
        <h1 className={styles.animalName}>{animal?.name}</h1>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <MapPin size={16} className={styles.infoIcon} />
            <span>{animal?.location.address}</span>
          </div>

          <div className={styles.infoItem}>
            <Calendar size={16} className={styles.infoIcon} />
            <span>{formatDate(animal?.foundTime)}</span>
          </div>

          <div className={styles.infoItem}>
            <Info size={16} className={styles.infoIcon} />
            <span>{t(`reportStray.${animal?.animalType}`)}</span>
          </div>

          <div className={styles.infoItem}>
            <Info size={16} className={styles.infoIcon} />
            <span>{t(`reportStray.${animal?.age}`)}</span>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <h3 className={styles.sectionTitle}>{t('reportStray.appearance')}</h3>
          <p className={styles.description}>{animal?.statusDescription}</p>

          {animal?.appearance.hasInjury && (
            <div className={styles.injuryInfo}>
              <span className="text-red-500">
                {t('reportStray.has_injury')}
              </span>
              <p>{animal?.appearance.injuryDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalBasicInfo;

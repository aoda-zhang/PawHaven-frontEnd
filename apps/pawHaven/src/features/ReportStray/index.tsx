import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.css';
import ReportForm from './ReportForm';

const ReportStray: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('reportStray.report_animal')}</h2>
      <ReportForm onSubmit={() => {}} isSubmitting={false} />
    </div>
  );
};

export default ReportStray;

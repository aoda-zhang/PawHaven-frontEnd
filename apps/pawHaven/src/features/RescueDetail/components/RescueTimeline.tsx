import classNames from 'classnames';
import { Clock, CheckCircle, User } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../index.module.css';

import { RescueStatusType } from '@/features/Home/types';
import getStatusColorByPrefix from '@/utils/getStatusColorByPrefix';

export interface RescueUpdate {
  id: string;
  timestamp: string;
  status: RescueStatusType;
  content: string;
  operator: {
    name: string;
    avatar?: string;
  };
  images?: string[];
}

interface RescueTimelineProps {
  updates: RescueUpdate[];
}

const RescueTimeline: React.FC<RescueTimelineProps> = ({ updates }) => {
  const { t } = useTranslation();
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div
      className={`${styles.timelineContainer} bg-white rounded-lg shadow-md p-6 mt-6`}
    >
      <h2 className={styles.timelineTitle}>
        {t('reportStray.rescue_timeline')}
      </h2>

      {sortedUpdates.length === 0 ? (
        <p className={styles.emptyTimeline}>
          {t('reportStray.no_updates_yet')}
        </p>
      ) : (
        <div className={styles.timelineItems}>
          {sortedUpdates.map((update, index) => (
            <div key={update.id} className={styles.timelineItem}>
              <div className={styles.timelineDotContainer}>
                <div
                  className={classNames([
                    styles.timelineDot,
                    getStatusColorByPrefix({
                      status: update?.status,
                      prefix: 'text',
                    }),
                  ])}
                >
                  <CheckCircle size={16} />
                </div>
                {index < sortedUpdates.length - 1 && (
                  <div className={styles.timelineLine} />
                )}
              </div>

              <div className={styles.timelineContent}>
                <div className={styles.updateHeader}>
                  <div className="flex items-center gap-2">
                    <span
                      className={classNames([
                        'font-medium',
                        getStatusColorByPrefix({
                          status: update?.status,
                          prefix: 'text',
                        }),
                      ])}
                    >
                      {t(`common.rescue_status_${update.status}`)}
                    </span>
                  </div>

                  <div className={styles.updateMeta}>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{new Date(update.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <User size={14} />
                      <span>{update.operator.name}</span>
                    </div>
                  </div>
                </div>

                <p className={styles.updateContent}>{update.content}</p>

                {update.images && update.images.length > 0 && (
                  <div className={styles.updateImages}>
                    {update.images.map((img, i) => (
                      <img
                        key={img}
                        src={img}
                        alt={`Update ${i + 1}`}
                        className={styles.updateImage}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RescueTimeline;

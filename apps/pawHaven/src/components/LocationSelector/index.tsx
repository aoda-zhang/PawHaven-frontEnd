import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.css';

interface LocationSelectorProps {
  value: {
    address: string;
    latitude: number;
    longitude: number;
  };
  onChange: (location: {
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();
  const [address, setAddress] = useState(value.address);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (value.latitude && value.longitude && !address) {
      setTimeout(() => {
        setAddress(t('reportStray.default_location'));
      }, 1000);
    }
  }, [value, address, t]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    onChange({
      ...value,
      address: e.target.value,
    });
  };

  const handleGetCurrentLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError(t('reportStray.geolocation_not_supported'));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onChange({
          address,
          latitude,
          longitude,
        });

        setTimeout(() => {
          setAddress(t('reportStray.current_location_address'));
          setLoading(false);
        }, 1000);
      },
      (err) => {
        setError(t('reportStray.geolocation_error', { message: err.message }));
        setLoading(false);
      },
    );
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{t('reportStray.location')}</h3>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="address">
          {t('reportStray.address')}
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={handleAddressChange}
          className={styles.input}
          placeholder={t('reportStray.enter_address')}
        />
      </div>

      <button
        type="button"
        onClick={handleGetCurrentLocation}
        disabled={loading}
        className={`${styles.uploadButton} mb-4`}
      >
        {loading
          ? t('reportStray.getting_location')
          : t('reportStray.use_current_location')}
      </button>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className={styles.mapContainer}>
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          {value.latitude && value.longitude ? (
            <p className="text-gray-500">
              {t('reportStray.map_preview', {
                lat: value.latitude.toFixed(6),
                lng: value.longitude.toFixed(6),
              })}
            </p>
          ) : (
            <p className="text-gray-500">
              {t('reportStray.no_location_selected')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;

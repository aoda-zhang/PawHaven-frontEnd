import { Button } from '@mui/material';
import {
  FormInput,
  FormRadio,
  FormSelect,
  FormTextArea,
  FormCheckbox,
  // FileUpload,
} from '@shared/components/Form';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ageOptions, animalTypeOptions, statusOptions } from './constants';
import styles from './index.module.css';
import { AnimalReport } from './types';

import LocationSelector from '@/components/LocationSelector';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className={styles.section}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

interface ReportFormProps {
  onSubmit: (data: AnimalReport) => void;
  isSubmitting: boolean;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit, isSubmitting }) => {
  const { t } = useTranslation();

  const defaultValues: AnimalReport = {
    animalType: 'cat',
    age: 'adult',
    appearance: {
      color: '',
      hasInjury: false,
      injuryDescription: '',
      otherFeatures: '',
    },
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    foundTime: new Date().toISOString(),
    status: 'other',
    statusDescription: '',
    images: [],
    contactInfo: {
      name: '',
      phone: '',
      email: '',
    },
  };

  const methods = useForm<AnimalReport>({
    defaultValues,
  });

  const handleSubmit = methods.handleSubmit(onSubmit);

  const handleLocationChange = (location: AnimalReport['location']) => {
    methods.setValue('location', location);
  };

  // const handleImageChange = (files: File[]) => {
  //   methods.setValue('images', files);
  // };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormSection title={t('reportStray.animal_basic_info')}>
          <FormRadio
            name="animalType"
            label={t('reportStray.animal_type')}
            options={animalTypeOptions.map((option) => ({
              ...option,
              label: t(option.label),
            }))}
          />
          {methods.watch('animalType') === 'other' && (
            <FormInput
              name="animalTypeOther"
              placeholder={t('reportStray.enter_other_type_placeholder')}
              className={styles.formGroup}
            />
          )}

          <FormSelect
            name="age"
            label={t('reportStray.age')}
            options={ageOptions.map((option) => ({
              ...option,
              label: t(option.label),
            }))}
            className={styles.formGroup}
          />
        </FormSection>

        <FormSection title={t('reportStray.appearance')}>
          <FormInput
            name="appearance.color"
            label={t('reportStray.color')}
            placeholder={t('reportStray.enter_color')}
            className={styles.formGroup}
          />

          <FormCheckbox
            name="appearance.hasInjury"
            label={t('reportStray.has_injury')}
            className={styles.formGroup}
          />

          {methods.watch('appearance.hasInjury') && (
            <FormTextArea
              name="appearance.injuryDescription"
              label={t('reportStray.injury_description')}
              placeholder={t('reportStray.describe_injury')}
              className={styles.formGroup}
            />
          )}

          <FormTextArea
            name="appearance.otherFeatures"
            label={t('reportStray.other_features')}
            placeholder={t('reportStray.other_features_hint')}
            className={styles.formGroup}
          />
        </FormSection>

        <LocationSelector
          value={methods.watch('location')}
          onChange={handleLocationChange}
        />

        <FormSection title={t('reportStray.found_info')}>
          <FormInput
            name="foundTime"
            label={t('reportStray.found_time')}
            type="datetime-local"
            className={styles.formGroup}
          />

          <FormSelect
            name="status"
            label={t('reportStray.status')}
            options={statusOptions.map((option) => ({
              ...option,
              label: t(option.label),
            }))}
            className={styles.formGroup}
          />

          <FormTextArea
            name="statusDescription"
            label={t('reportStray.status_description')}
            placeholder={t('reportStray.describe_status')}
            className={styles.formGroup}
          />
        </FormSection>

        {/* <FormSection title={t('reportStray.images')}>
          <FileUpload
            accept="image/*"
            maxSizeMB={5}
            multiple
            onFilesChange={handleImageChange}
          />
        </FormSection> */}

        <FormSection title={t('reportStray.contact_info')}>
          <FormInput
            name="contactInfo.name"
            label={t('reportStray.name')}
            placeholder={t('reportStray.enter_name')}
            className={styles.formGroup}
          />

          <FormInput
            name="contactInfo.phone"
            label={t('reportStray.phone')}
            type="tel"
            placeholder={t('reportStray.enter_phone')}
            className={styles.formGroup}
          />

          <FormInput
            name="contactInfo.email"
            label={t('reportStray.email')}
            type="email"
            placeholder={t('reportStray.enter_email')}
            className={styles.formGroup}
          />
        </FormSection>

        <div className={styles.buttonGroup}>
          <Button
            variant="outlined"
            onClick={() => window.history.back()}
            size="medium"
          >
            {t('common.cancel')}
          </Button>
          <Button variant="contained" disabled={isSubmitting} size="medium">
            {t('reportStray.submit')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ReportForm;

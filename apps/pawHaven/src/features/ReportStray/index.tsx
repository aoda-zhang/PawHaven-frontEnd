import httpService from '@shared/cores/http';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import SystemError from '../../components/SystemError';

import styles from './index.module.css';
import ReportForm from './ReportForm';
import { AnimalReport, ReportResponse } from './types';

const ReportStray: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation<
    ReportResponse,
    Error,
    AnimalReport
  >(
    (data) => {
      // 处理图片上传
      const formData = new FormData();

      // 附加非文件字段
      formData.append('animalType', data.animalType);
      formData.append('age', data.age);
      formData.append('appearance', JSON.stringify(data.appearance));
      formData.append('location', JSON.stringify(data.location));
      formData.append('foundTime', data.foundTime);
      formData.append('status', data.status);
      formData.append('statusDescription', data.statusDescription);
      formData.append('contactInfo', JSON.stringify(data.contactInfo));

      // 附加图片
      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      return httpService.post<ReportResponse>('/api/reportStray.', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    {
      onSuccess: () => {
        alert(t('reportStray.submit_success'));
        navigate('/');
      },
    },
  );

  if (error) {
    return <SystemError />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('reportStray.report_animal')}</h2>
      <ReportForm onSubmit={mutate} isSubmitting={isLoading} />
    </div>
  );
};

export default ReportStray;

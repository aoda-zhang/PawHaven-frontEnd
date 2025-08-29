import Button from '@mui/material/Button';
import systemError from '@shared/assets/images/500.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SystemError = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center gap-2 justify-center text-lg my-8">
      <img
        src={systemError}
        alt="System error"
        className="max-w-1/4 h-auto mb-10"
      />
      <p>{t('common.system_error')}</p>
      <p>{t('common.system_error_info')}</p>
      <Button
        type="button"
        variant="contained"
        onClick={goToHome}
        className="px-4 py-2 bg-primary rounded-lg hover:bg-primary transition-colors duration-300"
      >
        {t('common.go_to_home')}
      </Button>
    </div>
  );
};

export default SystemError;

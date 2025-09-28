import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFund = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center gap-2 justify-center pt-[6%] text-lg;">
      <img src="/images/404.png" alt="" className="max-w-1/4 h-auto mb-10" />
      <p>{t('common.not_found')}</p>
      <p>{t('common.not_found_info')}</p>
      <Button
        type="button"
        variant="contained"
        onClick={goToHome}
        className="px-4 py-2 bg-primary rounded-lg hover:bg-primary transition-colors duration-300;"
      >
        {t('common.go_to_home')}
      </Button>
    </div>
  );
};
export default NotFund;

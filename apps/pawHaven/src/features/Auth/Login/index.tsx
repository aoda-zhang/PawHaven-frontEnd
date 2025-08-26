import { Button } from '@mui/material';
import FormInput from '@shared/components/Form/FormInput';
import storageKeys from '@shared/constants/storageKeys';
import storage from '@shared/utils/storage';
import { type FC, memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import * as AuthAPI from '../apis';
import style from '../index.module.css';

import routePaths from '@/route/routePaths';
import { setUserInfo } from '@/store/globalReducer';

const Login: FC = () => {
  const formProps = useForm({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(AuthAPI.login, {
    onSuccess: (loginInfo) => {
      if (loginInfo?.accessToken && loginInfo?.refreshToken) {
        storage.set(storageKeys.accessToken, loginInfo?.accessToken);
        storage.set(storageKeys.refreshToken, loginInfo?.refreshToken);
        setUserInfo(loginInfo?.baseUserInfo);
        navigate('/trip/step1');
      }
    },
  });
  return (
    <div className={style.loginForm}>
      <div className={style.welcomeText}>{t('auth.login')}</div>
      <FormProvider {...formProps}>
        <form>
          <FormInput
            variant="outlined"
            size="small"
            className={style.baseForm}
            label={t('auth.userName')}
            name="userName"
            required
          />
          <FormInput
            type="password"
            variant="outlined"
            className={style.baseForm}
            size="small"
            label={t('auth.password')}
            name="password"
            required
          />
          <Button
            disabled={isLoading}
            type="submit"
            className={style.baseForm}
            variant="contained"
            onClick={formProps.handleSubmit((data) => {
              mutate({
                userName: data.userName,
                password: data.password,
              });
            })}
          >
            {t('auth.login')}
          </Button>
        </form>
      </FormProvider>
      <p className="text-right mt-5">
        <span className="text-gray-400 mr-3">{t('auth.no_account')}</span>
        <button
          type="button"
          className="cursor-pointer text-primary"
          onClick={() => {
            navigate(routePaths.register);
          }}
        >
          {t('auth.register_now')}
        </button>
      </p>
    </div>
  );
};
export default memo(Login);

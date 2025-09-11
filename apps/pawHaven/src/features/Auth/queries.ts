import storageKeys from '@shared/constants/storageKeys';
import storage from '@shared/utils/storage';
import { useMutation } from '@tanstack/react-query';
import { NavigateFunction } from 'react-router-dom';

import * as AuthAPI from './apis/requests';

export const useUserRegister = (navigate: NavigateFunction) => {
  return useMutation({
    mutationFn: AuthAPI.register,
    onSuccess: async (isRegrester, value) => {
      if (isRegrester) {
        const loginInfo = await AuthAPI.login({
          userName: value?.userName,
          password: value?.password,
        });
        await storage.set(storageKeys.accessToken, loginInfo.accessToken);
        await storage.set(storageKeys.refreshToken, loginInfo.refreshToken);
        navigate('/trip');
      }
    },
  });
};

export const useUserLogin = (navigate: NavigateFunction) => {
  return useMutation({
    mutationFn: AuthAPI.register,
    onSuccess: async (isRegrester, value) => {
      if (isRegrester) {
        const loginInfo = await AuthAPI.login({
          userName: value?.userName,
          password: value?.password,
        });
        await storage.set(storageKeys.accessToken, loginInfo.accessToken);
        await storage.set(storageKeys.refreshToken, loginInfo.refreshToken);
        navigate('/trip');
      }
    },
  });
};

import storage from '@sharedFrontend/utils/storage';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { AuthFieldType, LoginInfo } from '../types';

import * as AuthAPI from './requests';

import storageKeys from '@/constants/StorageKeys';
import { setUserInfo } from '@/store/globalReducer';

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<LoginInfo, Error, AuthFieldType>({
    mutationFn: (userInfo: AuthFieldType) => AuthAPI.login(userInfo),
    onSuccess: (loginInfo) => {
      if (loginInfo?.accessToken && loginInfo?.refreshToken) {
        storage.set(storageKeys.accessToken, loginInfo?.accessToken);
        storage.set(storageKeys.refreshToken, loginInfo?.refreshToken);
        setUserInfo(loginInfo?.baseUserInfo);
        navigate('/');
      }
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation<LoginInfo, Error, AuthFieldType>({
    mutationFn: (userInfo: AuthFieldType) => AuthAPI.register(userInfo),
    onSuccess: (loginInfo) => {
      if (loginInfo?.accessToken && loginInfo?.refreshToken) {
        storage.set(storageKeys.accessToken, loginInfo?.accessToken);
        storage.set(storageKeys.refreshToken, loginInfo?.refreshToken);
        setUserInfo(loginInfo?.baseUserInfo);
        navigate('/');
      }
    },
  });
};

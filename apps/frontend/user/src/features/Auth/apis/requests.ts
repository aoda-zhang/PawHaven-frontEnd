import type { AuthFieldType, LoginInfo } from '../types';

import { apiClient } from '@/utils/apiClient';

export const register = (userInfo: AuthFieldType): Promise<LoginInfo> => {
  return apiClient.post('/auth/register', userInfo);
};

export const login = (userInfo: AuthFieldType): Promise<LoginInfo> => {
  return apiClient.post('/auth/v1/login', userInfo);
};

export const refreshToken = (token: {
  refreshToken: string;
}): Promise<LoginInfo> => {
  return apiClient.post('/auth/v1/refresh', token);
};

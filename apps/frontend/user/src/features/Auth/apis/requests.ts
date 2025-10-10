import httpService from '@pawhaven/shared-frontend/cores/http';

import type { AuthFieldType, LoginInfo } from '../types';

export const register = (userInfo: AuthFieldType): Promise<LoginInfo> => {
  return httpService.post('/auth/register', userInfo);
};

export const login = (userInfo: AuthFieldType): Promise<LoginInfo> => {
  return httpService.post('/auth/v1/login', userInfo);
};

export const refreshToken = (token: {
  refreshToken: string;
}): Promise<LoginInfo> => {
  return httpService.post('/auth/v1/refresh', token);
};

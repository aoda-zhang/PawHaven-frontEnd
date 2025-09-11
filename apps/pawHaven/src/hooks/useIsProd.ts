import { useMemo } from 'react';

import envConfig, { EnvVariables } from '@/config';

const useIsProd = () => {
  const isProd = useMemo(() => envConfig?.env === EnvVariables.prod, []);
  return isProd;
};
export default useIsProd;

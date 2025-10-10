import createApiClient from '@pawhaven/shared-frontend/cores/http';
import storageTool from '@pawhaven/shared-frontend/utils/storage';

import envConfig from '@/config';

/**
 * Create a single shared API client instance for this app.
 * Ensures all API requests share the same configuration.
 */
export const apiClient = createApiClient({
  timeout: envConfig?.http?.timeout,
  baseURL: envConfig?.http?.baseURL ?? '',
  accessToken: storageTool.get('access-token')!,
  enableSign: true,
  prefix: envConfig?.http?.prefix,
  privateKey: envConfig?.http?.privateKey,
});

export default apiClient;

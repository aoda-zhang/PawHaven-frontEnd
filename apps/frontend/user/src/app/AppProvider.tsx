import { ThemeProvider } from '@mui/material';
import '@pawhaven/theme/globalTailwind.css';
import getReactQueryOptions from '@pawhaven/shared-frontend/';
import MUITheme from '@pawhaven/theme/MUI-theme';
import { Loading } from '@pawhaven/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import envConfig from '../config';
// Enable i18n for the entire app
import '@pawhaven/i18n';

import GlobalInitializer from './GlobalInitializer';

import SystemError from '@/components/SystemError';
import useIsProd from '@/hooks/useIsProd';
import { persistor, store } from '@/store/reduxStore';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient(getReactQueryOptions(envConfig));
  });
  const isProd = useIsProd();
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary FallbackComponent={SystemError}>
            <QueryClientProvider client={queryClient}>
              {!isProd && <ReactQueryDevtools initialIsOpen />}
              <ThemeProvider theme={MUITheme}>
                <Toaster />
                <GlobalInitializer />
                {children}
              </ThemeProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;

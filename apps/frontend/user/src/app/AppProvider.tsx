import { ThemeProvider } from '@mui/material';
import '@pawhaven/theme/global.css';
import Loading from '@pawhaven/ui/Loading';
import MUITheme from '@sharedTheme/MUI-theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import getReactQueryOptions from '@sharedFrontend/cores/react-query';

import envConfig from '../config';
// Enable i18n for the entire app
import '@pawhaven/i18n';
import { store, persistor } from '../store/reduxStore';

import GlobalInitializer from './GlobalInitializer';

import ErrorPage from '@/components/SystemError';
import useIsProd from '@/hooks/useIsProd';

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
          <ErrorBoundary FallbackComponent={ErrorPage}>
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

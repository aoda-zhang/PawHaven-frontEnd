import { FC } from 'react';

import AppRouterProvider from '../route/AppRouterProvider';

import AppProvider from './RootProvider';

const App: FC = () => {
  return (
    <AppProvider>
      <AppRouterProvider />
    </AppProvider>
  );
};

export default App;

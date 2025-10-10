import type { ReactNode } from 'react';
import { Suspense } from 'react';

import Loading from '../Loading';

const SuspenseWrapper = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default SuspenseWrapper;

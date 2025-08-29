import { useRouteError } from 'react-router-dom';

import NotFund from '../NotFund';
import SystemError from '../SystemError';

interface ErrorInfo {
  status: number;
  statusText?: string;
}

const ErrorFallback = () => {
  const errorInfo = useRouteError() as Partial<ErrorInfo>;
  switch (errorInfo?.status) {
    case 404:
      return <NotFund />;
    case 500:
      return <SystemError />;
    default:
      return <SystemError />;
  }
};

export default ErrorFallback;

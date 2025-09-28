import { type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Brand from '@/components/Brand';

const AuthLayout: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-dvw h-dvh p-4 lg:p-10 rounded-xl bg-background shadow-md">
      <Brand navigate={navigate} />
      <div className="flex flex-row lg:max-w-3/4 m-auto transition-all duration-300  bg-white">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;

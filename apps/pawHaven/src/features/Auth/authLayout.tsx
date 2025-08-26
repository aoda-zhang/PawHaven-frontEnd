import Brand from '@shared/components/Brand';
import { type FC, memo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import style from './index.module.css';

const AuthLayout: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={style.authBox}>
      <Brand navigate={navigate} />
      <div className={style.contentBox}>
        <Outlet />
      </div>
    </div>
  );
};
export default memo(AuthLayout);

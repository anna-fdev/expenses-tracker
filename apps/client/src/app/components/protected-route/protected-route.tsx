import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector, useUserLoggedIn } from '../../store/hooks';
import { ROUTES } from '../../constants';
import { selectSystem } from '../../store/slices';

type ProtectedRouteProps = {
  redirectPath?: string;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  redirectPath = ROUTES.SIGN_IN,
}) => {
  const isLoggedIn = useUserLoggedIn();
  const { logInState } = useAppSelector(selectSystem);

  if (logInState === 'init') {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

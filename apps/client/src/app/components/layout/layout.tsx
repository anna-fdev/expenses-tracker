import * as React from 'react';
import { FC, lazy, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../header/header';
import { ROUTES } from '../../constants';
import { Home } from '../../pages/home';
import { useUserMe } from '../../store/hooks';
import { SnackbarComponent } from '../snackbar-component/snackbar-component';
import { CreateExpense } from '../../pages/create-expense';
import { Expense } from '../../pages/expense';
import { ProtectedRoute } from '../protected-route/protected-route';
import { LoadingBox } from '../loading-box/loading-box';

const SignUp = lazy(() => import('../../pages/sign-up'));
const SignIn = lazy(() => import('../../pages/sign-in'));

export const Layout: FC = () => {
  useUserMe();

  return (
    <>
      <CssBaseline />

      <Header />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route
          path={ROUTES.SIGN_UP}
          element={
            <Suspense fallback={<LoadingBox />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.SIGN_IN}
          element={
            <Suspense fallback={<LoadingBox />}>
              <SignIn />
            </Suspense>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.CREATE_EXPENSE} element={<CreateExpense />} />
          <Route path={ROUTES.EXPENSE} element={<Expense />} />
        </Route>
      </Routes>

      <SnackbarComponent />
    </>
  );
};

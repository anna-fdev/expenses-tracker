import * as React from 'react';
import { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../header/header';
import { ROUTES } from '../../constants';
import { Home } from '../../pages/home';
import { SignUp } from '../../pages/sign-up';
import { SignIn } from '../../pages/sign-in';
import { useUserMe } from '../../store/hooks';
import { SnackbarComponent } from '../snackbar-component/snackbar-component';
import { CreateExpense } from '../../pages/create-expense';
import { Expense } from '../../pages/expense';

export const Layout: FC = () => {
  useUserMe();

  return (
    <>
      <CssBaseline />

      <Header />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.CREATE_EXPENSE} element={<CreateExpense />} />
        <Route path={ROUTES.EXPENSE} element={<Expense />} />
      </Routes>

      <SnackbarComponent />
    </>
  );
};

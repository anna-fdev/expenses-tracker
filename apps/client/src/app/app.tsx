import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';

import { SignUp } from './pages/sign-up';
import { Header } from './components';
import { theme } from './utils';
import { ROUTES } from './constants';
import { Home } from './pages/home';
import { store } from './store/store';

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />

        <Header />

        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Routes>
      </Provider>
    </ThemeProvider>
  );
};

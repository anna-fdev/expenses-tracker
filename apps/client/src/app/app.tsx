import { ThemeProvider } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { Provider } from 'react-redux';

import { Layout } from './components';
import { theme } from './utils';
import { store } from './store/store';
import { initAppAction } from './store/actions';

store.dispatch(initAppAction());

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ThemeProvider>
  );
};

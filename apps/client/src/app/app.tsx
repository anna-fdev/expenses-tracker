import { ThemeProvider } from '@mui/material';
import * as React from 'react';
import { FC, PropsWithChildren, StrictMode } from 'react';
import { Provider } from 'react-redux';
import ModalProvider from 'mui-modal-provider';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './utils';
import { store } from './store/store';
import { initAppAction } from './store/actions';

store.dispatch(initAppAction());

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ModalProvider>{children}</ModalProvider>
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

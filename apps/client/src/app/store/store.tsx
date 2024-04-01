import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { commonApi } from './services';
import { snackbarReducer, systemReducer, UIExpensesReducer } from './slices';
import { listenerMiddleware } from './listeners/listener-middleware';
import './listeners';

export const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    system: systemReducer,
    snackbar: snackbarReducer,
    UIExpenses: UIExpensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat([commonApi.middleware])
      .prepend(listenerMiddleware.middleware),
  devTools: true,
});

export type AppStore = typeof store;

export type AppState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export type AppDispatch = typeof store.dispatch;

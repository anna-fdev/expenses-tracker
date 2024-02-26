import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { commonApi, exampleApi } from './services';
import { exampleReducer, systemReducer } from './slices';
import { listenerMiddleware } from './listeners/listener-middleware';
import './listeners';

export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    example: exampleReducer,
    system: systemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([exampleApi.middleware, commonApi.middleware])
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

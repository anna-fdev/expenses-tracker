import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

// import { bReducer } from './slices';
import { exampleApi } from './services';
import { exampleReducer } from './slices';
// import { listenerMiddleware } from './listeners/listener-middleware';
// import './listeners';

export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
    example: exampleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exampleApi.middleware),
  // .prepend(listenerMiddleware.middleware),
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

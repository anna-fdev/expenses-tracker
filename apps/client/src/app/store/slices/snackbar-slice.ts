import {
  createSelector,
  createSlice,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';

import { AppState } from '../store';

type SnackbarState = {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
};

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'info',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity: 'error' | 'warning' | 'info' | 'success';
      }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideSnackbar: () => {
      return initialState;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export const selectSnackbar = createSelector(
  (state: AppState) => state.snackbar,
  (snackbar) => ({
    ...snackbar,
  })
);
export const snackbarReducer: Reducer<SnackbarState> = snackbarSlice.reducer;

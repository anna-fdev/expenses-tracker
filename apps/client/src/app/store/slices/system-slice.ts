import { createSelector, createSlice, Reducer } from '@reduxjs/toolkit';

import { AppState } from '../store';

type SystemState = {
  authToken?: string;
};

const initialState: SystemState = {};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    resetAuthToken: (state) => {
      state.authToken = undefined;
    },
  },
});

export const { setAuthToken, resetAuthToken } = systemSlice.actions;

export const selectSystem = createSelector(
  (state: AppState) => state.system,
  (system) => system
);

export const systemReducer: Reducer<SystemState> = systemSlice.reducer;

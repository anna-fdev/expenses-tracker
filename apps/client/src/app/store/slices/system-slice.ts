import { createSlice, Reducer } from '@reduxjs/toolkit';

import { AppState } from '../store';

type SystemState = {
  authToken?: string;
  logInState: 'init' | 'done';
};

const initialState: SystemState = {
  logInState: 'init',
};

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
    setLogInState: (state, action) => {
      state.logInState = action.payload;
    },
  },
});

export const { setAuthToken, resetAuthToken, setLogInState } =
  systemSlice.actions;

export const selectSystem = (state: AppState) => state.system;

export const systemReducer: Reducer<SystemState> = systemSlice.reducer;

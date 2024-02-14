import {
  createAsyncThunk,
  createSelector,
  createSlice,
  Reducer,
} from '@reduxjs/toolkit';

import { AppState } from '../store';

type ExampleState = {
  exampleValue: number;
};

const initialState: ExampleState = {
  exampleValue: 5,
};

export const fetchSAction = createAsyncThunk('brand/fetchS', async () => {
  return await fetch('');
});

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSAction.pending, (state) => {
        state.exampleValue = 8;
      })
      .addCase(fetchSAction.fulfilled, (state, { payload }) => {
        return state;
      })
      .addCase(fetchSAction.rejected, (state) => {
        return state;
      });
  },
});

export const selectExample = createSelector(
  (state: AppState) => state.example,
  (banners) => banners
);

export const exampleReducer: Reducer<ExampleState> = exampleSlice.reducer;

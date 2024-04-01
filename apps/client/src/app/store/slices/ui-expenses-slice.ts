import {
  createSelector,
  createSlice,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';

import { AppState } from '../store';

type UIExpensesState = {
  selectedDate: Date;
};

const initialState: UIExpensesState = {
  selectedDate: new Date(),
};

const UIExpensesSlice = createSlice({
  name: 'UIExpenses',
  initialState,
  reducers: {
    setSelectedDate: (
      state,
      action: PayloadAction<{
        newSelectedDate: Date;
      }>
    ) => {
      state.selectedDate = action.payload.newSelectedDate;
    },
  },
});

export const { setSelectedDate } = UIExpensesSlice.actions;

export const selectUIExpenses = (state: AppState) => state.UIExpenses;
export const selectSelectedDate = createSelector(
  selectUIExpenses,
  ({ selectedDate }) => selectedDate
);

export const UIExpensesReducer: Reducer<UIExpensesState> =
  UIExpensesSlice.reducer;

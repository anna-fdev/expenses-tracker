import { useGetExpenseQuery, useGetExpensesQuery } from '../services';
import { selectSelectedDate } from '../slices';

import { useAppSelector } from './common';

export const useExpenses = () => {
  const selectedDate = useAppSelector(selectSelectedDate);

  const start_date = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).toISOString();
  const end_date = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).toISOString();

  const dateParams = {
    start_date,
    end_date,
  };

  const { data, error, isLoading } = useGetExpensesQuery(dateParams, {
    selectFromResult: ({ data, error, isLoading }) => ({
      data,
      error,
      isLoading,
    }),
  });

  return {
    data,
    error,
    isLoading,
  };
};

export const useExpense = (id: string) => {
  const { data, error, isLoading } = useGetExpenseQuery(id, {
    selectFromResult: ({ data, error, isLoading }) => ({
      data,
      error,
      isLoading,
    }),
  });

  return {
    data,
    error,
    isLoading,
  };
};

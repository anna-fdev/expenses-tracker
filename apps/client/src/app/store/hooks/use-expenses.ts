import { useGetExpenseQuery, useGetExpensesQuery } from '../services';

export const useExpenses = (selectedDate: Date) => {
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

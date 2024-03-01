import { useGetExpenseQuery, useGetExpensesQuery } from '../services';

export const useExpenses = () => {
  const { data, error, isLoading } = useGetExpensesQuery(undefined, {
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

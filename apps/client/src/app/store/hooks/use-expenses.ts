import { useGetExpensesQuery } from '../services';

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

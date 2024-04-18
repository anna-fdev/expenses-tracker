import { useExpenses } from '../../store/hooks';

export const useExpensesCategorisedData = () => {
  const { data } = useExpenses();
  const { entries = [] } = data || {};

  const uniqueCategories = [
    ...new Set(data?.entries.map((expense) => expense.category)),
  ];

  const uniqueCategoriesMap = uniqueCategories.map((category, idx) => {
    const expensesByCategory = entries.filter(
      (expense) => expense.category === category
    );

    const totalByCategory = expensesByCategory.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);

    return {
      id: idx,
      label: category,
      value: totalByCategory,
      expenses: expensesByCategory,
    };
  });

  const totalAmount = data?.entries
    .reduce((accumulator, currentAmount) => {
      return accumulator + currentAmount.amount;
    }, 0)
    .toFixed(2);

  return {
    uniqueCategoriesMap,
    totalAmount,
  };
};

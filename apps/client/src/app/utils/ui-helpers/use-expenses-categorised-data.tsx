import { CategoryEnum } from '@expenses-tracker/models';
import { ApiExpense } from '@expenses-tracker/api-models';

import { useExpenses } from '../../store/hooks';

import { categoryListMap } from './category-list-map';

export type CategorisedExpenses = {
  id: number;
  label: string;
  value: number;
  expenses: ApiExpense[];
  color: string;
};

type UseExpensesCategorisedData = {
  uniqueCategoriesMap: CategorisedExpenses[];
  totalAmount: string | undefined;
};

export const useExpensesCategorisedData = (): UseExpensesCategorisedData => {
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
      color: categoryListMap[category as CategoryEnum].color,
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

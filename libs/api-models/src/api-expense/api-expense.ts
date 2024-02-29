type ExpenseBase = {
  amount: number;
  name?: string;
  category: string;
  expense_date: string;
};

export type ApiExpenseParams = ExpenseBase;

export type ApiExpense = ExpenseBase & {
  id: string;
};

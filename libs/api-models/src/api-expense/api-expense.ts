export type ApiExpense = {
  id: number;
  amount: number;
  name?: string;
  category: string;
  expense_date: Date;
};

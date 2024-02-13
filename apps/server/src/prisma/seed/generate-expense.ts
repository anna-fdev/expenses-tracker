import { faker } from '@faker-js/faker';
import { Decimal } from '@prisma/client/runtime/library';

import { ExpenseDto } from '../../expense/dto/expense.dto';

export const generateExpense = () => {
  const fakeExpense = new ExpenseDto();

  fakeExpense.amount = new Decimal(faker.finance.amount());
  fakeExpense.name = faker.commerce.productName();
  fakeExpense.category = faker.commerce.department();
  fakeExpense.expense_date = faker.date.between({
    from: new Date().setMonth(new Date().getMonth() - 2),
    to: new Date(),
  });

  return fakeExpense;
};

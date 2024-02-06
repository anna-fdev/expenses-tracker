import { faker } from '@faker-js/faker';
import { ExpenseDto } from '../../expense/dto/expense.dto';
import { Decimal } from '@prisma/client/runtime/library';

export const createExpenseDto = () => {
  const expenseDto = new ExpenseDto();

  expenseDto.amount = new Decimal(faker.finance.amount());
  expenseDto.name = faker.commerce.productName();
  expenseDto.category = faker.commerce.department();
  expenseDto.expense_date = faker.date.between({
    from: new Date().setMonth(new Date().getMonth() - 2),
    to: new Date(),
  });

  return expenseDto;
};

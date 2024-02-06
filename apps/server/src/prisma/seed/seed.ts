import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createExpenseDto } from './generate-expense';
import process from 'process';

const prisma = new PrismaClient();

const { ALPHA_USER_EMAIL, ALPHA_USER_PASSWORD, BCRYPT_SALT_VALUE } =
  process.env;

async function main() {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_VALUE);
  const hashedPassword = await bcrypt.hash(ALPHA_USER_PASSWORD, salt);

  const expenses = [];

  for (let i = 0; i < 20; i++) {
    const { name, amount, category, expense_date } = createExpenseDto();

    expenses.push({
      name,
      amount,
      category,
      expense_date,
    });
  }

  await prisma.user.upsert({
    where: { email: ALPHA_USER_EMAIL },
    update: {},
    create: {
      email: ALPHA_USER_EMAIL,
      password: hashedPassword,
      expenses: {
        create: expenses,
      },
    },
  });

  console.log('Successful db seeding');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

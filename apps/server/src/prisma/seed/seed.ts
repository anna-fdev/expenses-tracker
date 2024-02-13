import process from 'process';

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { generateExpense } from './generate-expense';

const prisma = new PrismaClient();

const { ALPHA_USER_EMAIL, ALPHA_USER_PASSWORD, BCRYPT_SALT_VALUE } =
  process.env;

async function main() {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_VALUE);
  const hashedPassword = await bcrypt.hash(ALPHA_USER_PASSWORD, salt);

  const fakeExpenses = [];

  for (let i = 0; i < 20; i++) {
    const { name, amount, category, expense_date } = generateExpense();

    fakeExpenses.push({
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
        create: fakeExpenses,
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

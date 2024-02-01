import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.servise';
import { CreateExpenseParams, ExpenseDto } from './dto/expense.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async getExpense(): Promise<ExpenseDto[]> {
    const expense = await this.prisma.expense.findMany();

    return expense.map((item) =>
      plainToInstance(ExpenseDto, item, { strategy: 'excludeAll' })
    );
  }

  async createExpense(data: CreateExpenseParams) {
    const createdExpense = await this.prisma.expense.create({
      data: {
        ...data,
        amount: Number(data.amount),
      },
    });

    const expense = {
      ...createdExpense,
      amount: Number(createdExpense.amount),
    };

    return plainToInstance(ExpenseDto, expense, {
      strategy: 'excludeAll',
    });
  }

  async updateExpense(id: number, data: CreateExpenseParams) {
    const updatedExpense = await this.prisma.expense.update({
      where: { id: Number(id) },
      data: {
        ...data,
        amount: Number(data.amount),
      },
    });

    const expense = {
      ...updatedExpense,
      amount: Number(updatedExpense.amount),
    };

    return plainToInstance(ExpenseDto, expense, {
      strategy: 'excludeAll',
    });
  }

  async deleteExpense(id: number) {
    const deletedExpense = await this.prisma.expense.delete({
      where: { id: Number(id) },
    });

    const expense = {
      ...deletedExpense,
      amount: Number(deletedExpense.amount),
    };

    return plainToInstance(ExpenseDto, expense, {
      strategy: 'excludeAll',
    });
  }
}

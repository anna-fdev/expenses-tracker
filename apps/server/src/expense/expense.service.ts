import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.servise';
import { CUExpenseParams, ExpenseDto } from './dto/expense.dto';
import { Request } from 'express';
import { getHeaderAuthToken, transform } from '../utils';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async getExpense(request: Request): Promise<ExpenseDto[]> {
    const token = getHeaderAuthToken(request);

    const { id: user_id } = this.jwtService.decode(token);

    const expense = await this.prisma.expense.findMany({
      where: { user_id },
    });

    return expense.map((item) => transform(ExpenseDto, item));
  }

  async createExpense(data: CUExpenseParams, request: Request) {
    const token = getHeaderAuthToken(request);

    const { id } = this.jwtService.decode(token);

    const createdExpense = await this.prisma.expense.create({
      data: {
        ...data,
        user_id: Number(id),
      },
    });

    return transform(ExpenseDto, createdExpense);
  }

  async updateExpense(id: string, data: CUExpenseParams, request: Request) {
    const token = getHeaderAuthToken(request);

    const { id: user_id } = this.jwtService.decode(token);

    const updatedExpense = await this.prisma.expense
      .update({
        where: { id, user_id },
        data: {
          ...data,
          user_id,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025' || error.code === 'P2016') {
            throw new NotFoundException(`Can't find a record with id ${id}`);
          }
        }

        throw error;
      });

    return transform(ExpenseDto, updatedExpense);
  }

  async deleteExpense(id: string, request: Request) {
    const token = getHeaderAuthToken(request);

    const { id: user_id } = this.jwtService.decode(token);

    const deletedExpense = await this.prisma.expense
      .delete({
        where: { id, user_id },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025' || error.code === 'P2016') {
            throw new NotFoundException(`Can't find a record with id ${id}`);
          }
        }

        throw error;
      });

    return transform(ExpenseDto, deletedExpense);
  }
}

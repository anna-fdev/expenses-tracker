import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ApiEntryList } from '@expenses-tracker/api-models';

import { PrismaService } from '../prisma/prisma.servise';
import {
  getHeaderAuthToken,
  getStartOfMonthISO,
  handlePrismaError,
  transform,
} from '../utils';
import { LIMIT, OFFSET } from '../constants';

import { ExpenseQueryParamsDto } from './dto/expense-query-params.dto';
import { CUExpenseParams, ExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async getExpenses(
    params: ExpenseQueryParamsDto,
    request: Request
  ): Promise<ApiEntryList<ExpenseDto>> {
    const token = getHeaderAuthToken(request);
    const { id: user_id } = this.jwtService.decode(token);

    const { offset = OFFSET, limit = LIMIT, start_date, end_date } = params;

    const endDate = end_date ? new Date(end_date) : new Date().toISOString();
    const startDate = start_date ? new Date(start_date) : getStartOfMonthISO();

    const [total, expenses] = await this.prisma.$transaction([
      this.prisma.expense.count({
        where: {
          user_id,
        },
      }),
      this.prisma.expense.findMany({
        where: {
          user_id,
          expense_date: {
            lte: endDate,
            gte: startDate,
          },
        },
        take: limit,
        skip: offset,
      }),
    ]);

    const requestedOffsetTooBig = offset > total;

    if (requestedOffsetTooBig) {
      throw new HttpException(
        'Offset is bigger than total documents amount',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      metadata: {
        total,
        offset,
        limit,
      },
      entries: expenses.map((item) => transform(ExpenseDto, item)),
    };
  }

  async getExpenseById(id: string, request: Request) {
    const token = getHeaderAuthToken(request);
    const { id: user_id } = this.jwtService.decode(token);

    const expense = await this.prisma.expense
      .findUniqueOrThrow({
        where: {
          user_id,
          id,
        },
      })
      .catch((error) => handlePrismaError(error, id));

    return transform(ExpenseDto, expense);
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
      .catch((error) => handlePrismaError(error, id));

    return transform(ExpenseDto, updatedExpense);
  }

  async deleteExpense(id: string, request: Request) {
    const token = getHeaderAuthToken(request);

    const { id: user_id } = this.jwtService.decode(token);

    const deletedExpense = await this.prisma.expense
      .delete({
        where: { id, user_id },
      })
      .catch((error) => handlePrismaError(error, id));

    return transform(ExpenseDto, deletedExpense);
  }
}

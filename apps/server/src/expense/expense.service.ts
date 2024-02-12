import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.servise';
import { CUExpenseParams, ExpenseDto } from './dto/expense.dto';
import { Request } from 'express';
import { getHeaderAuthToken, transform } from '../utils';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { ExpenseQueryParamsDto } from './dto/expense-query-params.dto';
import { getStartOfMonthISO } from '../utils/get-start-of-month-iso';
import { LIMIT, OFFSET } from '../constants';

export type ApiListMeta = {
  total: number;
  limit: number;
  offset: number;
};

export type ApiEntryList<Entry> = {
  metadata: ApiListMeta;
  entries: Entry[];
};

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

    const requestedOffsetTooBig = offset >= total;

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

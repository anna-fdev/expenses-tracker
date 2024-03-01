import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from '../guards/auth.guard';

import { ExpenseService } from './expense.service';
import { CUExpenseParams, ExpenseDto } from './dto/expense.dto';
import { ExpenseQueryParamsDto } from './dto/expense-query-params.dto';
import { ExpenseResponse } from './dto/expenses-response.dto';

@ApiTags('expense')
@Controller('expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Get Expense response model',
    type: ExpenseResponse,
  })
  async getExpenses(
    @Body() params: ExpenseQueryParamsDto,
    @Req() request: Request
  ) {
    return await this.expenseService.getExpenses(params, request);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Get Expense by id response model',
    type: ExpenseDto,
  })
  async getExpenseById(@Param('id') id: string, @Req() request: Request) {
    return await this.expenseService.getExpenseById(id, request);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Create Expense response model',
    type: ExpenseDto,
  })
  async createExpense(
    @Body() params: CUExpenseParams,
    @Req() request: Request
  ) {
    return await this.expenseService.createExpense(params, request);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Update Expense response model',
    type: ExpenseDto,
  })
  async updateExpense(
    @Param('id') id: string,
    @Body() data: CUExpenseParams,
    @Req() request: Request
  ) {
    return await this.expenseService.updateExpense(id, data, request);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Delete Expense response model',
    type: ExpenseDto,
  })
  async deleteExpense(@Param('id') id: string, @Req() request: Request) {
    return await this.expenseService.deleteExpense(id, request);
  }
}

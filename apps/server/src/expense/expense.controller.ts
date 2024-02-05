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
import { ExpenseService } from './expense.service';
import { CUExpenseParams, ExpenseDto } from './dto/expense.dto';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Get Expense response model',
    type: [ExpenseDto],
  })
  async getExpense(@Req() request: Request) {
    return await this.expenseService.getExpense(request);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Create Expense response model',
    type: ExpenseDto,
  })
  async createExpense(@Body() data: CUExpenseParams, @Req() request: Request) {
    return await this.expenseService.createExpense(data, request);
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

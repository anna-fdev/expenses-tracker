import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseParams, ExpenseDto } from './dto/expense.dto';

@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get Expense response model',
    type: ExpenseDto,
  })
  async getExpense(): Promise<ExpenseDto[]> {
    return await this.expenseService.getExpense();
  }

  @Post()
  @ApiOkResponse({
    description: 'Create Expense response model',
    type: ExpenseDto,
  })
  async createExpense(@Body() data: CreateExpenseParams) {
    return await this.expenseService.createExpense(data);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update Expense response model',
    type: ExpenseDto,
  })
  async updateExpense(
    @Param('id') id: number,
    @Body() data: CreateExpenseParams
  ) {
    return await this.expenseService.updateExpense(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete Expense response model',
    type: ExpenseDto,
  })
  async deleteExpense(@Param('id') id: number) {
    return await this.expenseService.deleteExpense(id);
  }
}

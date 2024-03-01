import { Expose, Transform, Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiExpense } from '@expenses-tracker/api-models';

import { DecimalNumber } from '../../utils';

export class CUExpenseParams {
  @ApiProperty()
  @Expose()
  amount: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  name?: string;

  @IsString()
  @ApiProperty()
  @Expose()
  category: string;

  @IsDateString()
  @ApiProperty()
  @Expose()
  expense_date: Date;
}

type ExpenseType = Pick<ApiExpense, 'id' | 'name' | 'category'> & {
  amount: DecimalNumber;
  expense_date: Date;
};

export class ExpenseDto implements ExpenseType {
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: string;

  @Type(() => DecimalNumber)
  @ApiProperty({
    type: Number,
  })
  @Expose()
  @Transform(({ obj, key }) => Number(obj[key]))
  amount: DecimalNumber;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  name?: string;

  @IsString()
  @ApiProperty()
  @Expose()
  category: string;

  @IsDateString()
  @ApiProperty()
  @Expose()
  expense_date: Date;

  created_at: string;
  updated_at: string;
}

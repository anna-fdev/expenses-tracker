import { Expose, Transform, Type } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DecimalNumber } from '../../utils';

export class CUExpenseParams {
  @ApiProperty()
  @Expose()
  amount: number;

  @IsString()
  @ApiProperty()
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

export class ExpenseDto {
  @IsNumber()
  @Expose()
  id: number;

  @Type(() => DecimalNumber)
  @ApiProperty()
  @Expose()
  @Transform(({ obj, key }) => Number(obj[key]))
  amount: DecimalNumber;

  @IsString()
  @ApiProperty()
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

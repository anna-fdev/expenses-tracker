import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseParams {
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
}

export class ExpenseDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsNumber()
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

  createdAt: string;
  updatedAt: string;
}

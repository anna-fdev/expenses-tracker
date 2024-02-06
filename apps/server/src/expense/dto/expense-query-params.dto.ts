import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';
import { EntitiesListQueryParamsDto } from '../../common';

export class ExpenseQueryParamsDto extends EntitiesListQueryParamsDto {
  @ApiPropertyOptional({
    description: 'Start date of the range for expenses list',
  })
  @IsOptional()
  @IsISO8601()
  start_date?: string;

  @ApiPropertyOptional({
    description: 'End date of the range for expenses list',
  })
  @IsISO8601()
  end_date?: string;
}

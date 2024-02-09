import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { EntitiesListQueryParamsDto } from '../../common';

export class ExpenseQueryParamsDto extends EntitiesListQueryParamsDto {
  @ApiPropertyOptional({
    description: 'Start date of the range for expenses list',
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({
    description: 'End date of the range for expenses list',
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;
}

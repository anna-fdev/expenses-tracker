import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class EntitiesListQueryParamsDto {
  @ApiPropertyOptional({
    description: 'Skip a certain amount of records. Min value is 0 (default)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    description:
      'Select certain amount of records. Min value is 1, Max value is 100 (default)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}

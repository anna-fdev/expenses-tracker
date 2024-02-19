import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiUser } from '@expenses-tracker/api-models';

export class UserDto implements ApiUser {
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;

  @IsString()
  @ApiProperty()
  @Expose()
  name?: string;

  password: string;

  @IsString()
  @ApiProperty()
  @Expose()
  email: string;

  @IsString()
  @ApiProperty()
  @Expose()
  role: string;

  createdAt: string;
  updatedAt: string;
}

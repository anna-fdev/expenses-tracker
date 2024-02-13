import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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

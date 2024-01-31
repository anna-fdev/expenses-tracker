import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user-dto';
import { TokenDto } from '../../user/dto/token-dto';

export class AuthParamsDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}

export class SignUpResponseDto extends TokenDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
}

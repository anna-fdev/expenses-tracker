import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiAuthParams, ApiSignUpResponse } from '@expenses-tracker/api-models';

import { UserDto } from '../../user/dto/user-dto';
import { TokenDto } from '../../user/dto/token-dto';

export class AuthParamsDto implements ApiAuthParams {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}

export class SignUpResponseDto extends TokenDto implements ApiSignUpResponse {
  @ApiProperty({ type: UserDto })
  user: UserDto;
}

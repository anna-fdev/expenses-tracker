import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TokenDto } from '../user/dto/token-dto';

import { AuthService } from './auth.service';
import { AuthParamsDto, SignUpResponseDto } from './dto/auth-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @ApiOkResponse({
    description: 'Sign Up response model',
    type: SignUpResponseDto,
  })
  async signUp(@Body() params: AuthParamsDto) {
    return await this.authService.signUp(params);
  }

  @Post('sign-in')
  @ApiOkResponse({
    description: 'Sign In response model',
    type: TokenDto,
  })
  async signIn(@Body() params: AuthParamsDto) {
    return await this.authService.signIn(params);
  }
}

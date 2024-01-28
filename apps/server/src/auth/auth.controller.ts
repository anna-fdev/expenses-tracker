import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';
import { TokenDto } from '../user/dto/token-dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() params: AuthDto) {
    return await this.authService.signUp(params);
  }

  @Post('sign-in')
  @ApiOkResponse({
    description: 'Sign In response model',
    type: TokenDto,
  })
  async signIn(@Body() params: AuthDto): Promise<TokenDto> {
    return await this.authService.signIn(params);
  }
}

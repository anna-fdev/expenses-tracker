import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() params: AuthDto) {
    return await this.authService.signUp(params);
  }

  @Post('sign-in')
  async signIn(@Body() params: AuthDto) {
    return await this.authService.signIn(params);
  }
}

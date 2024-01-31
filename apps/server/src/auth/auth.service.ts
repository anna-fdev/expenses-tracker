import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthParamsDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(params: AuthParamsDto) {
    return await this.userService.signUp(params);
  }

  async signIn(params: AuthParamsDto) {
    return await this.userService.signIn(params);
  }
}

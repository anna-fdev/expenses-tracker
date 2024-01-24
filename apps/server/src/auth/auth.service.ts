import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(params: AuthDto) {
    return await this.userService.signUp(params);
  }

  async signIn(params: AuthDto) {
    return await this.userService.signIn(params);
  }
}

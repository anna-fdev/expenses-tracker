import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';
import { UserDto } from './dto/user-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async userProfile(@Req() req: Request): Promise<UserDto> {
    return await this.userService.getUserMe(req);
  }
}

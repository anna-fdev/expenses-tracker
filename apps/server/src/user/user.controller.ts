import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';

import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'User me response model',
    type: UserDto,
  })
  async userProfile(@Req() req: Request): Promise<UserDto> {
    return await this.userService.getUserMe(req);
  }
}

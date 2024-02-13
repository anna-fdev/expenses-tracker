import { Module } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.servise';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}

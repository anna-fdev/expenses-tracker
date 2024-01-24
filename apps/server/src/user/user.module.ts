import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.servise';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class UserModule {}

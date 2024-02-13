import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.servise';

import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, PrismaService],
})
export class ExpenseModule {}

import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { PrismaService } from '../prisma/prisma.servise';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, PrismaService],
})
export class ExpenseModule {}

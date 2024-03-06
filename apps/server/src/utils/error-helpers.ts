import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundException } from '@nestjs/common';

export const handlePrismaError = (
  error: unknown,
  id: string | number
): never => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025' || error.code === 'P2016') {
      throw new NotFoundException(`Can't find a record with id ${id}`);
    }
  }

  throw error as Error;
};

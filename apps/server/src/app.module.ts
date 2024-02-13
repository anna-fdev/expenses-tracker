import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as process from 'process';
import { ExpenseModule } from './expense/expense.module';

const { JWT_SECRET } = process.env;

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    AuthModule,
    UserModule,
    ExpenseModule,
  ],
})
export class AppModule {}

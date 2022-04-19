import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { UserController } from './user.controller';
import { ExpenseModule } from './expense/expense.module';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CategoryModule,
    ExpenseModule,
    AccountModule,
    IncomeModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class UserModule {}

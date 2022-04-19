import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { AccountService } from '../account/account.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Expense } from '../entities/expense.entity';
import { Account } from '../entities/account.entity';
import { ExpenseService } from './expense.service';

describe('ExpenseController', () => {
  let controller: ExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        ExpenseService,
        AccountService,
        { provide: getRepositoryToken(Expense), useValue: {} },
        { provide: getRepositoryToken(Account), useValue: {} },
      ],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

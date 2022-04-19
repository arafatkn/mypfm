import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { AccountService } from '../account/account.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Expense } from '../entities/expense.entity';
import { Account } from '../entities/account.entity';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        AccountService,
        { provide: getRepositoryToken(Expense), useValue: {} },
        { provide: getRepositoryToken(Account), useValue: {} },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

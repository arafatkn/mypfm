import { Test, TestingModule } from '@nestjs/testing';
import { IncomeService } from './income.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Income } from '../entities/income.entity';
import { Account } from '../entities/account.entity';
import { AccountService } from '../account/account.service';

describe('IncomeService', () => {
  let service: IncomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomeService,
        AccountService,
        { provide: getRepositoryToken(Income), useValue: {} },
        { provide: getRepositoryToken(Account), useValue: {} },
      ],
    }).compile();

    service = module.get<IncomeService>(IncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

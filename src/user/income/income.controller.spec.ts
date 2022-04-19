import { Test, TestingModule } from '@nestjs/testing';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Income } from '../entities/income.entity';
import { AccountService } from '../account/account.service';
import { Account } from '../entities/account.entity';

describe('IncomeController', () => {
  let controller: IncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeController],
      providers: [
        IncomeService,
        AccountService,
        { provide: getRepositoryToken(Income), useValue: {} },
        { provide: getRepositoryToken(Account), useValue: {} },
      ],
    }).compile();

    controller = module.get<IncomeController>(IncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

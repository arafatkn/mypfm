import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from '../entities/income.entity';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';

@Injectable()
export class IncomeService {
  constructor(
    private accountService: AccountService,
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

  getAllOfUser(user_id: number) {
    return this.incomeRepository.find({
      where: { user_id },
    });
  }

  async findOrFail(id: any, user_id = 0) {
    const income = await this.incomeRepository.findOne(id, {
      relations: ['account', 'category'],
    });

    if (income && (user_id === 0 || income.user_id === user_id)) {
      return income;
    }

    throw new NotFoundException('Income Not Found');
  }

  async newIncome(user_id: number, incomeData: Record<string, any>) {
    let income = this.incomeRepository.create({ ...incomeData, user_id });
    income = await this.incomeRepository.save(income);

    await this.accountService.addBalance(income.account_id, income.amount);

    return income;
  }

  async updateIncome(income: Income, data: Record<string, any>) {
    if (data.hasOwnProperty('amount')) {
      await this.accountService.addBalance(
        income.account_id,
        data.amount - income.amount,
      );
    }
    Object.assign(income, data);
    return this.incomeRepository.save(income);
  }

  async deleteIncome(income: Income) {
    await this.accountService.subBalance(income.account_id, income.amount);
    return this.incomeRepository.delete(income.id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entities/expense.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class ExpenseService {
  constructor(
    private accountService: AccountService,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  getAllOfUser(user_id: number) {
    return this.expenseRepository.find({
      where: { user_id },
    });
  }

  async findOrFail(id: any, user_id = 0) {
    const expense = await this.expenseRepository.findOne(id);

    if (expense && (user_id === 0 || expense.user_id === user_id)) {
      return expense;
    }

    throw new NotFoundException('Expense Not Found');
  }

  async newExpense(user_id: number, expenseData: Record<string, any>) {
    let expense = this.expenseRepository.create({ ...expenseData, user_id });
    expense = await this.expenseRepository.save(expense);

    await this.accountService.subBalance(expense.account_id, expense.amount);

    return expense;
  }

  async updateExpense(expense: Expense, data: Record<string, any>) {
    if (data.hasOwnProperty('amount')) {
      await this.accountService.subBalance(
        expense.account_id,
        data.amount - expense.amount,
      );
    }
    Object.assign(expense, data);
    return this.expenseRepository.save(expense);
  }

  async deleteExpense(expense: Expense) {
    await this.accountService.addBalance(expense.account_id, expense.amount);
    return this.expenseRepository.delete(expense.id);
  }

  async getYearlyReport(user_id: number) {
    return this.expenseRepository
      .createQueryBuilder()
      .where('user_id = :uid', { uid: user_id })
      .groupBy('extract(year from expense_date)')
      .select([
        'extract(year from expense_date) as expense_year',
        'SUM(amount) as expense_amount',
      ])
      .getMany();
  }
}

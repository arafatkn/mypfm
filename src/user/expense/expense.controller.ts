import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entities/expense.entity';
import { Repository } from 'typeorm';
import { AuthUser } from '../user.decorator';
import { ExpenseService } from './expense.service';

@Controller('user/expenses')
export class ExpenseController {
  constructor(
    private expenseService: ExpenseService,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  @Get()
  getAll(@AuthUser('id') user_id: number) {
    return this.expenseService.getAllOfUser(user_id);
  }

  @Get(':id')
  async single(@Param('id') id: number, @AuthUser('id') user_id: number) {
    return await this.expenseService.findOrFail(id, user_id);
  }

  @Post()
  create(@Body() data, @AuthUser('id') user_id: number) {
    return this.expenseService.newExpense(user_id, data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data,
    @AuthUser('id') user_id: number,
  ) {
    const expense = await this.expenseService.findOrFail(id, user_id);
    return this.expenseService.updateExpense(expense, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @AuthUser('id') user_id: number) {
    const expense = await this.expenseService.findOrFail(id, user_id);
    return this.expenseService.deleteExpense(expense);
  }

  @Get('reports/yearly')
  async yearlyReport(@AuthUser('id') user_id: number) {
    return await this.expenseService.getYearlyReport(user_id);
  }
}

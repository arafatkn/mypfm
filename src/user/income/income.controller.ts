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
import { Income } from '../entities/income.entity';
import { Repository } from 'typeorm';
import { AuthUser } from '../user.decorator';
import { IncomeService } from './income.service';

@Controller('user/incomes')
export class IncomeController {
  constructor(
    private incomeService: IncomeService,
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

  @Get()
  getAll(@AuthUser('id') user_id: number) {
    return this.incomeService.getAllOfUser(user_id);
  }

  @Get(':id')
  async single(@Param('id') id: number, @AuthUser('id') user_id: number) {
    return await this.incomeService.findOrFail(id, user_id);
  }

  @Post()
  create(@Body() data, @AuthUser('id') user_id: number) {
    return this.incomeService.newIncome(user_id, data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data,
    @AuthUser('id') user_id: number,
  ) {
    const income = await this.incomeService.findOrFail(id, user_id);
    return this.incomeService.updateIncome(income, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @AuthUser('id') user_id: number) {
    const income = await this.incomeService.findOrFail(id, user_id);
    return this.incomeService.deleteIncome(income);
  }
}

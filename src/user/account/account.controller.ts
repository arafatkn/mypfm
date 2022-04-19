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
import { Account } from '../entities/Account.entity';
import { Repository } from 'typeorm';
import { AuthUser } from '../user.decorator';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('user/accounts')
export class AccountController {
  constructor(
    private accountService: AccountService,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  @Get()
  getAll(@AuthUser('id') user_id: number) {
    return this.accountService.getAllOfUser(user_id);
  }

  @Post()
  create(@Body() data: CreateAccountDto, @AuthUser('id') user_id: number) {
    const account = this.accountRepository.create({ ...data, user_id });
    return this.accountRepository.save(account);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateAccountDto,
    @AuthUser('id') user_id: number,
  ) {
    const account = await this.accountService.findOrFail(id, user_id);
    account.name = data.name;
    return this.accountRepository.save(account);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @AuthUser('id') user_id: number) {
    const account = await this.accountService.findOrFail(id, user_id);
    return await this.accountRepository.delete(account.id);
  }
}

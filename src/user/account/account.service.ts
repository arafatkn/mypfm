import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  getAllOfUser(user_id: number) {
    return this.accountRepository.find({
      where: { user_id },
    });
  }

  async findOrFail(id: any, user_id = 0) {
    const account = await this.accountRepository.findOne(id);

    if (account && (user_id === 0 || account.user_id === user_id)) {
      return account;
    }

    throw new NotFoundException('Account Not Found');
  }

  async addBalance(account_id, amount) {
    const account = await this.findOrFail(account_id);
    console.log('Old: ' + account.balance);
    console.log('Amount: ' + amount);
    account.balance = account.balance + amount;
    console.log('Updated: ' + account.balance);
    return this.accountRepository.save(account);
  }

  async subBalance(account_id, amount) {
    const account = await this.findOrFail(account_id);
    account.balance = account.balance - amount;
    return this.accountRepository.save(account);
  }
}

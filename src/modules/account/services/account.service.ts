import { Account } from './../entities/Account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repository: Repository<Account>,
  ) {}

  async getAccountByClient(clientId: string): Promise<Account> {
    return this.repository.findOneByOrFail({ clientId: clientId });
  }

  async patchLoan(accountId: string, amount: number): Promise<Account> {
    const account = await this.repository.findOneByOrFail({
      id: accountId,
    });
    await this.repository.decrement({ id: account.id }, 'credit', amount);
    await this.repository.increment({ id: account.id }, 'balance', amount);
    return await this.repository.findOneByOrFail({
      id: accountId,
    });
  }
}

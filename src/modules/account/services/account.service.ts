import { Account } from './../entities/Account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from '../../client/services/client.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repository: Repository<Account>,
    private readonly clientService: ClientService,
  ) {}

  async getAccountByClient(clientId: string): Promise<Account> {
    return this.repository.findOneByOrFail({ clientId: clientId });
  }

  async getAccountByClientPhoneEmail(phoneEmail: string): Promise<Account> {
    const client = await this.clientService.getClientByPhoneEmail(phoneEmail);
    return this.repository.findOneByOrFail({ clientId: client.id });
  }

  async patchLoan(accountId: string, amount: number): Promise<Account> {
    const account = await this.repository.findOneByOrFail({
      id: accountId,
    });
    await this.repository.decrement({ id: account.id }, 'credit', amount);
    await this.repository.increment({ id: account.id }, 'balance', amount);
    return await this.repository.findOneByOrFail({
      id: account.id,
    });
  }

  async patchPayment(
    incomeId: string,
    outcomeId: string,
    amount: number,
  ): Promise<Account> {
    const incomeAccount = await this.repository.findOneByOrFail({
      id: incomeId,
    });
    const outcomeAccount = await this.repository.findOneByOrFail({
      id: outcomeId,
    });

    await this.repository.increment(
      { id: incomeAccount.id },
      'balance',
      amount,
    );
    await this.repository.decrement(
      { id: outcomeAccount.id },
      'balance',
      amount,
    );

    return await this.repository.findOneByOrFail({
      id: outcomeAccount.id,
    });
  }
}

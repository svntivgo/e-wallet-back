import { Account } from './../entities/Account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/client/entities/Client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repository: Repository<Account>,
  ) {}

  async getAccountByClient(client: Client): Promise<Account> {
    return new Account();
  }

  async patchAccount(account: Account): Promise<Account> {
    return new Account();
  }
}

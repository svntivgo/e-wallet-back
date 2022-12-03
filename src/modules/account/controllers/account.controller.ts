import { Body, Controller, Get, Patch } from '@nestjs/common';
import { Account } from '../entities/Account.entity';
import { Client } from '../../client/entities/Client.entity';
import { AccountService } from '../services/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get()
  async getAccountByClient(@Body() client: Client): Promise<Account> {
    return this.service.getAccountByClient(client);
  }
}

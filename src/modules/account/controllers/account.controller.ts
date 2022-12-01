import { Body, Controller, Get, Patch } from '@nestjs/common';
import { Account } from '../entities/Account.entity';
import { Client } from '../../client/entities/Client.entity';

@Controller('account')
export class AccountController {
  @Get()
  getAccountByClient(@Body() client: Client): Account {
    return new Account();
  }

  @Patch()
  patchAccount(@Body() account: Account): Account {
    return new Account();
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { Account } from '../entities/Account.entity';
import { AccountService } from '../services/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get('/:clientId')
  async getAccountByClient(
    @Param('clientId') clientId: string,
  ): Promise<Account> {
    return this.service.getAccountByClient(clientId);
  }

  @Get('phone-email/:phoneEmail')
  async getAccountByClientPhoneEmail(
    @Param('phoneEmail') phoneEmail: string,
  ): Promise<Account> {
    return this.service.getAccountByClientPhoneEmail(phoneEmail);
  }
}

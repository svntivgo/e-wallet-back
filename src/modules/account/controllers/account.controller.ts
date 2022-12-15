import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Account } from '../entities/Account.entity';
import { AccountService } from '../services/account.service';

@ApiBearerAuth('Token auth0')
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @ApiOperation({ summary: 'Get an Account by client ID' })
  @ApiResponse({
    status: 200,
    description:
      'OK. The response contain an account corresponding to the request.',
  })
  @Get('/:clientId')
  async getAccountByClient(
    @Param('clientId') clientId: string,
  ): Promise<Account> {
    return this.service.getAccountByClient(clientId);
  }

  @ApiOperation({ summary: 'Get an Account by phone or email' })
  @ApiResponse({
    status: 200,
    description:
      'OK. The response contain an account corresponding to the request.',
  })
  @Get('phone-email/:phoneEmail')
  async getAccountByClientPhoneEmail(
    @Param('phoneEmail') phoneEmail: string,
  ): Promise<Account> {
    return this.service.getAccountByClientPhoneEmail(phoneEmail);
  }
}

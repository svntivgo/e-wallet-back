import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { Client } from '../../client/entities/Client.entity';
import { Account } from '../entities/Account.entity';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAccountByClient should returned account by client', async () => {
    // Arrange
    const expected = new Account();
    const client = new Client();
    // Act
    const result = controller.getAccountByClient(client);
    // Assert
    expect(result).toMatchObject(expected);
  });

  it('patchAccount should returned account', async () => {
    // Arrange
    const expected = new Account();
    // Act
    const result = controller.patchAccount(new Account());
    // Assert
    expect(result).toMatchObject(expected);
  });
});

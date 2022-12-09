import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { Account } from '../entities/Account.entity';
import { AccountService } from '../services/account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            getAccountByClient: jest.fn().mockResolvedValue(new Account()),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAccountByClient should call service getAccountByClient', async () => {
    // Arrange
    const clientId = '1';
    // Act
    await controller.getAccountByClient(clientId);
    // Assert
    expect(service.getAccountByClient).toBeCalled();
  });

  it('getAccountByClient should call service getAccountByClient', async () => {
    // Arrange
    const clientId = '1';
    // Act
    const result = await controller.getAccountByClient(clientId);
    // Assert
    expect(result).toBeInstanceOf(Account);
  });
});

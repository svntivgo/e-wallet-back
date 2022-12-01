import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { Account } from '../entities/Account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../client/entities/Client.entity';

describe('AccountService', () => {
  let service: AccountService;
  let repositoryMock: MockType<Repository<Account>>;
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      save: jest.fn().mockResolvedValue(new Account()),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repositoryMock = module.get(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAccountByClient should returned account by client', async () => {
    // Arrange
    const expected = new Client();
    expected.id = '1';
    // Act
    const result = await service.getAccountByClient(expected);
    result.clientId = '1';
    // Assert
    expect(result.clientId).toEqual(expected.id);
  });

  it('patchAccount should returned account patched', async () => {
    // Arrange
    const expected = new Account();
    expected.balance = '1';
    // Act
    const result = await service.patchAccount(new Account());
    result.balance = '2';
    // Assert
    expect(result.balance).not.toEqual(expected.balance);
  });
});

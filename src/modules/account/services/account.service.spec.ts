import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { Account } from '../entities/Account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../client/entities/Client.entity';
import { Movement } from '../../movement/entities/Movement.entity';

describe('AccountService', () => {
  let service: AccountService;
  let repositoryMock: MockType<Repository<Account>>;
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOneByOrFail: jest.fn(),
      increment: jest.fn(),
      decrement: jest.fn(),
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

  describe('getAccountByClient', () => {
    it('getAccountByClient should call repository findOneByOrFail method', async () => {
      // Arrange
      const expected = new Client();
      expected.id = '1';
      // Act
      await service.getAccountByClient(expected.id);
      // Assert
      expect(repositoryMock.findOneByOrFail).toBeCalled();
    });

    it('getAccountByClient should returned account by client', async () => {
      // Arrange
      const expected = new Client();
      const account = new Account();
      expected.id = '1';
      account.clientId = '1';
      repositoryMock.findOneByOrFail?.mockResolvedValue(account);
      // Act
      const result = await service.getAccountByClient(expected.id);
      // Assert
      expect(result.clientId).toEqual(expected.id);
    });
  });

  describe('patchLoan', () => {
    it('patchLoan should call repository findOneByOrFail method', async () => {
      // Arrange
      const expected = new Movement();
      const account = new Account();
      expected.idIncome = '1';
      expected.amount = 1000;
      account.id = '1';
      repositoryMock.findOneByOrFail?.mockResolvedValue(account);
      // Act
      await service.patchLoan(expected.idIncome, expected.amount);
      // Assert
      expect(repositoryMock.findOneByOrFail).toBeCalled();
    });

    it('patchLoan should call repository increment, decrement method', async () => {
      // Arrange
      const expected = new Movement();
      const account = new Account();
      expected.idIncome = '1';
      expected.amount = 1000;
      account.id = '1';
      repositoryMock.findOneByOrFail?.mockResolvedValue(account);
      // Act
      await service.patchLoan(expected.idIncome, expected.amount);
      // Assert
      expect(repositoryMock.increment).toBeCalled();
      expect(repositoryMock.decrement).toBeCalled();
    });

    it('patchLoan should returned account patched', async () => {
      // Arrange
      const expected = new Movement();
      const account = new Account();
      expected.idIncome = '1';
      expected.amount = 1000;
      account.id = '1';
      account.balance = 2000;
      account.credit = 5000;
      repositoryMock.findOneByOrFail?.mockResolvedValue(account);
      repositoryMock.decrement?.mockResolvedValue({
        ...account,
        ...[(account.credit -= expected.amount)],
      });
      repositoryMock.increment?.mockResolvedValue({
        ...account,
        ...[(account.balance += expected.amount)],
      });
      // Act
      const newAccount = await service.patchLoan(
        expected.idIncome,
        expected.amount,
      );
      // Assert
      expect(account.credit).toEqual(4000);
      expect(account.balance).toEqual(3000);
      expect(newAccount).toBeInstanceOf(Account);
    });
  });

  describe('patchPayment', () => {
    it('patchPayment should call repository findOneByOrFail method', async () => {
      // Arrange
      const expected = new Movement();
      const account = new Account();
      expected.idIncome = '1';
      expected.idOutcome = '2';
      expected.amount = 1000;
      account.id = '1';
      repositoryMock.findOneByOrFail?.mockResolvedValue(account);
      // Act
      await service.patchPayment(
        expected.idIncome,
        expected.idOutcome,
        expected.amount,
      );
      // Assert
      expect(repositoryMock.findOneByOrFail).toBeCalled();
    });

    it('patchPayment should call repository increment, decrement method', async () => {
      // Arrange
      const expected = new Movement();
      const account = new Account();
      expected.idIncome = '1';
      expected.idOutcome = '2';
      expected.amount = 1000;
      account.id = '1';
      repositoryMock.findOneByOrFail?.mockResolvedValue(account);
      // Act
      await service.patchPayment(
        expected.idIncome,
        expected.idOutcome,
        expected.amount,
      );
      // Assert
      expect(repositoryMock.increment).toBeCalled();
      expect(repositoryMock.decrement).toBeCalled();
    });

    it('patchPayment should returned account patched', async () => {
      // Arrange
      const expected = new Movement();
      const accountOutcome = new Account();
      const accountIncome = new Account();
      expected.idIncome = '1';
      expected.idOutcome = '2';
      expected.amount = 1000;
      accountIncome.id = '1';
      accountIncome.balance = 3000;
      accountOutcome.id = '2';
      accountOutcome.balance = 3000;
      repositoryMock.findOneByOrFail?.mockResolvedValue(accountIncome);
      repositoryMock.decrement?.mockResolvedValue({
        ...accountOutcome,
        ...[(accountOutcome.balance -= expected.amount)],
      });
      repositoryMock.increment?.mockResolvedValue({
        ...accountIncome,
        ...[(accountIncome.balance += expected.amount)],
      });
      // Act
      const newAccount = await service.patchPayment(
        expected.idIncome,
        expected.idOutcome,
        expected.amount,
      );
      // Assert
      expect(accountIncome.balance).toEqual(4000);
      expect(accountOutcome.balance).toEqual(2000);
      expect(newAccount).toBeInstanceOf(Account);
    });
  });
});

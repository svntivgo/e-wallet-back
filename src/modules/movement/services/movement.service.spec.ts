import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from '../entities/Movement.entity';
import { MovementService } from './movement.service';
import { Account } from '../../account/entities/Account.entity';
import { AccountService } from '../../account/services/account.service';
import { createMovementDto } from '../dtos/createMovementDto';

describe('MovementService', () => {
  let service: MovementService;
  let accountService: AccountService;
  let repositoryMock: MockType<Repository<Movement>>;
  let accountRepositoryMock: MockType<Repository<Account>>;
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
  };

  const account = new Account();
  account.id = '1';
  account.balance = 2000;
  account.credit = 5000;

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      save: jest.fn(),
      findOneByOrFail: jest.fn().mockResolvedValue(account),
      decrement: jest.fn(),
      increment: jest.fn(),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementService,
        {
          provide: getRepositoryToken(Movement),
          useFactory: repositoryMockFactory,
        },
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<MovementService>(MovementService);
    accountService = module.get<AccountService>(AccountService);
    repositoryMock = module.get(getRepositoryToken(Movement));
    accountRepositoryMock = module.get(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createLoanMovement', () => {
    it('createLoanMovement should call repository save method', async () => {
      // Arrange
      const expected = new Movement();
      // Act
      await service.createLoanMovement(expected);
      // Assert
      expect(repositoryMock.save).toBeCalled();
    });

    it('createLoanMovement should returned new movement', async () => {
      // Arrange
      const expected = new createMovementDto();
      const movement = new Movement();
      repositoryMock.save?.mockResolvedValue(movement);
      // Act
      const result = await service.createLoanMovement(expected);
      // Assert
      expect(result).toBeInstanceOf(Movement);
    });
  });

  describe('createPaymentMovement', () => {
    it('createPaymentMovement should call repository save method', async () => {
      // Arrange
      const expected = new Movement();
      // Act
      await service.createPaymentMovement(expected);
      // Assert
      expect(repositoryMock.save).toBeCalled();
    });

    it('createPaymentMovement should returned new movement', async () => {
      // Arrange
      const expected = new createMovementDto();
      const movement = new Movement();
      repositoryMock.save?.mockResolvedValue(movement);
      // Act
      const result = await service.createPaymentMovement(expected);
      // Assert
      expect(result).toBeInstanceOf(Movement);
    });
  });
});

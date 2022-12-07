import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from '../entities/Movement.entity';
import { MovementService } from './movement.service';
import { Account } from '../../account/entities/Account.entity';

describe('MovementService', () => {
  let service: MovementService;
  let repositoryMock: MockType<Repository<Movement>>;
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      save: jest.fn(),
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
      ],
    }).compile();

    service = module.get<MovementService>(MovementService);
    repositoryMock = module.get(getRepositoryToken(Movement));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createMovement should call repository save method', async () => {
    // Arrange
    const expected = new Movement();
    // Act
    await service.createMovement(expected);
    // Assert
    expect(repositoryMock.save).toBeCalled();
  });
});

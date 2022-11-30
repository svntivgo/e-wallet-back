import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { createClientDto } from '../dtos/createClientDto.dto';
import { Repository } from 'typeorm';
import { Client } from '../entities/Client.entity';

describe('ClientService', () => {
  let service: ClientService;
  let repositoryMock: MockType<Repository<Client>>;
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      save: jest.fn().mockResolvedValue(new Client()),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: Repository<Client>,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repositoryMock = module.get(Repository<Client>);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createClient should returned new client', async () => {
    // Arrange
    const expected = new Client();
    // Act
    const result = await service.createClient(new createClientDto());
    // Assert
    expect(result).toEqual(expected);
  });

  it('getClients should returned array of clients', async () => {
    // Arrange
    const expected: Array<Client> = [];
    // Act
    const result = await service.getClients();
    // Assert
    expect(result).toEqual(expected);
  });

  it('getClientByEmailPhone should returned client by email', async () => {
    // Arrange
    const email = 'john.doe@email.com';
    const client = new Client();
    client.email = email;
    const expectedByEmail = client;
    // Act
    const result = await service.getClientByPhoneEmail(email);
    result.email = email;
    // Assert
    expect(result).toEqual(expectedByEmail);
  });

  it('getClientByEmailPhone should returned client by phone', async () => {
    // Arrange
    const phone = '3101234567';
    const client = new Client();
    client.phone = phone;
    const expectedByPhone = client;
    // Act
    const result = await service.getClientByPhoneEmail(phone);
    result.phone = phone;
    // Assert
    expect(result).toEqual(expectedByPhone);
  });
});

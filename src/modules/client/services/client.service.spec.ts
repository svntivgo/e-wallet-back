import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { createClientDto } from '../dtos/createClientDto.dto';
import { Repository } from 'typeorm';
import { Client } from '../entities/Client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../../account/entities/Account.entity';
import { Setting } from '../../setting/entities/Setting.entity';

describe('ClientService', () => {
  let service: ClientService;
  let repositoryMock: MockType<Repository<Client>>;
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      save: jest.fn().mockResolvedValue(new Client()),
      find: jest.fn(),
      findOneByOrFail: jest.fn(),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repositoryMock = module.get(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createClient', () => {
    const createDto = new createClientDto();
    createDto.fullName = 'John Doe';
    createDto.email = 'john@example.com';
    createDto.phone = '1234567890';
    createDto.photo = 'http://example.com/photo.jpg';
    createDto.password = 'password';

    it('createClient should call repositorys save method', async () => {
      // Arrange
      const dto = createDto;
      const repository = jest.spyOn(repositoryMock, 'save');
      // Act
      await service.createClient(dto);
      // Assert
      expect(repository).toBeCalled();
    });

    it('createClient should return repositorys response with a new client', async () => {
      // Arrange
      const dto = createDto;
      const newClient = new Client();
      newClient.fullName = dto.fullName;
      newClient.email = dto.email;
      newClient.phone = dto.phone;
      newClient.photo = dto.photo;
      newClient.password = dto.password;
      newClient.account = new Account();
      newClient.setting = new Setting();
      const repository = jest.spyOn(repositoryMock, 'save');
      repository.mockResolvedValue(newClient);
      // Act
      const result = await service.createClient(dto);
      // Assert
      expect(result).toBeInstanceOf(Client);
      expect(result.fullName).toEqual(newClient.fullName);
      expect(result.email).toEqual(newClient.email);
      expect(result.phone).toEqual(newClient.phone);
      expect(result.photo).toEqual(newClient.photo);
      expect(result.account).toBeInstanceOf(Account);
      expect(result.setting).toBeInstanceOf(Setting);
    });
  });

  describe('getClients', () => {
    it('getClients should call repositorys find method', async () => {
      // Arrange

      // Act
      await service.getClients();
      // Assert
      expect(repositoryMock.find).toBeCalled();
    });

    it('getClients should returned array of clients', async () => {
      // Arrange
      const expected = new Array<Client>();
      repositoryMock.find?.mockResolvedValue(new Array<Client>());
      // Act
      const result = await service.getClients();
      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('getClientByEmailPhone', () => {
    it('getClientByEmailPhone should call repositorys findOneByOrFail', async () => {
      // Arrange
      const email = 'john@example.com';
      // Act
      await service.getClientByPhoneEmail(email);
      // Assert
      expect(repositoryMock.findOneByOrFail).toBeCalled();
    });

    it('getClientByEmailPhone should return client by email given', async () => {
      // Arrange
      const email = 'john@example.com';
      const client = new Client();
      client.email = 'john@example.com';
      repositoryMock.findOneByOrFail?.mockResolvedValue(client);
      // Act
      const result = await service.getClientByPhoneEmail(email);
      // Assert
      expect(result.email).toEqual(email);
    });

    it('getClientByEmailPhone should return client by phone given', async () => {
      // Arrange
      const phone = '1234567890';
      const client = new Client();
      client.phone = '1234567890';
      repositoryMock.findOneByOrFail?.mockResolvedValue(client);
      // Act
      const result = await service.getClientByPhoneEmail(phone);
      // Assert
      expect(result.phone).toEqual(phone);
    });
  });
});

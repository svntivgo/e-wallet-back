import { Test, TestingModule } from '@nestjs/testing';
import { Client } from '../entities/Client.entity';
import { ClientController } from './client.controller';
import { createClientDto } from '../dtos/createClientDto.dto';
import { ClientService } from '../services/client.service';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            createClient: jest.fn().mockResolvedValue(new Client()),
            getClients: jest.fn().mockResolvedValue(new Array<Client>()),
            getClientByPhoneEmail: jest.fn().mockResolvedValue(new Client()),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createClient', () => {
    it('createClient should call clientService.createClient with createClientDto', async () => {
      // Arrange
      const dto = new createClientDto();
      dto.fullName = 'John Doe';
      dto.email = 'john@example.com';
      dto.phone = '1234567890';
      dto.photo = 'http://example.com/photo.jpg';
      dto.password = 'password';
      // Act
      await controller.createClient(dto);
      // Assert
      expect(service.createClient).toBeCalledWith(dto);
    });

    it('createClient should return new client', async () => {
      // Arrange
      const dto = new createClientDto();
      dto.fullName = 'John Doe';
      dto.email = 'john@example.com';
      dto.phone = '1234567890';
      dto.photo = 'http://example.com/photo.jpg';
      dto.password = 'password';
      // Act
      const result = await controller.createClient(dto);
      // Assert
      expect(result).toBeInstanceOf(Client);
    });
  });

  describe('getClients', () => {
    it('getClients should call service.getClients', async () => {
      // Arrange

      // Act
      await controller.getClients();
      // Assert
      expect(service.getClients).toBeCalled();
    });

    it('getClients should return an array of clients', async () => {
      // Arrange
      const expected = new Array<Client>();
      // Act
      const result = await controller.getClients();
      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('getClientByPhoneEmail', () => {
    it('getClients should call service.getClientByPhoneEmail', async () => {
      // Arrange
      const email = 'john@example.com';
      // Act
      await controller.getClientByPhoneEmail(email);
      // Assert
      expect(service.getClientByPhoneEmail).toBeCalled();
    });

    it('getClientByEmailPhone should returned client by email', async () => {
      // Arrange
      const email = 'john.doe@email.com';
      const client = await service.getClientByPhoneEmail(email);
      client.email = 'john@example.com';
      // Act
      const result = await controller.getClientByPhoneEmail(email);
      result.email = email;
      // Assert
      expect(result).toBeInstanceOf(Client);
      expect(result.email).toEqual(client.email);
    });

    it('getClientByEmailPhone should returned client by phone', async () => {
      // Arrange
      const phone = '1234567890';
      const client = await service.getClientByPhoneEmail(phone);
      client.phone = '1234567890';
      // Act
      const result = await controller.getClientByPhoneEmail(phone);
      result.phone = phone;
      // Assert
      expect(result).toBeInstanceOf(Client);
      expect(result.phone).toEqual(client.phone);
    });
  });
});

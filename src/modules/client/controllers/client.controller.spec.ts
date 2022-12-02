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
      expect(service.createClient).toHaveBeenCalledWith(dto);
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
      expect(service.getClients).toHaveBeenCalled();
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

  // it('getClientByEmailPhone should returned client by email', async () => {
  //   // Arrange
  //   const email = 'john.doe@email.com';
  //   const client = new Client();
  //   client.email = email;
  //   const expectedByEmail = client;
  //   // Act
  //   const result = controller.getClientByPhoneEmail(email);
  //   result.email = email;
  //   // Assert
  //   expect(result).toEqual(expectedByEmail);
  // });

  // it('getClientByEmailPhone should returned client by phone', async () => {
  //   // Arrange
  //   const phone = '3101234567';
  //   const client = new Client();
  //   client.phone = phone;
  //   const expectedByEmail = client;
  //   // Act
  //   const result = controller.getClientByPhoneEmail(phone);
  //   result.phone = phone;
  //   // Assert
  //   expect(result).toEqual(expectedByEmail);
  // });
});

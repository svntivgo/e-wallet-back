import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { Client } from '../entities/Client.entity';
import { ClientController } from './client.controller';
import { createClientDto } from '../dtos/createClientDto.dto';

describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createClient should returned new client', async () => {
    // Arrange
    const body = new createClientDto();
    const expected = new Client();
    // Act
    const result = controller.createClient(body);
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
    const result = controller.getClientByPhoneEmail(email);
    result.email = email;
    // Assert
    expect(result).toEqual(expectedByEmail);
  });

  it('getClientByEmailPhone should returned client by phone', async () => {
    // Arrange
    const phone = '3101234567';
    const client = new Client();
    client.phone = phone;
    const expectedByEmail = client;
    // Act
    const result = controller.getClientByPhoneEmail(phone);
    result.phone = phone;
    // Assert
    expect(result).toEqual(expectedByEmail);
  });
});

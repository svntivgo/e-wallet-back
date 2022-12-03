import { Test, TestingModule } from '@nestjs/testing';
import { SettingService } from './setting.service';
import { Setting } from '../entities/Setting.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../client/entities/Client.entity';
import { notDeepEqual } from 'assert';

describe('SettingService', () => {
  let service: SettingService;
  let repositoryMock: MockType<Repository<Setting>>;
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOneByOrFail: jest.fn(),
      save: jest.fn(),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingService,
        {
          provide: getRepositoryToken(Setting),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<SettingService>(SettingService);
    repositoryMock = module.get(getRepositoryToken(Setting));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSettingByClient', () => {
    it('getSettingByClient should call repositorys findOneByOrFail method', async () => {
      // Arrange
      const client = new Client();
      // Act
      await service.getSettingByClient(client);
      // Assert
      expect(repositoryMock.findOneByOrFail).toBeCalled();
    });

    it('getSettingByClient should return client setting', async () => {
      // Arrange
      const client = new Client();
      const setting = new Setting();
      client.id = '1';
      setting.clientId = '1';
      repositoryMock.findOneByOrFail?.mockResolvedValue(setting);
      // Act
      const result = await service.getSettingByClient(client);
      // Assert
      expect(result.clientId).toEqual(client.id);
    });
  });

  describe('patchSettingColor', () => {
    it('patchSettingColor should call repositorys find method', async () => {
      // Arrange
      const setting = new Setting();
      const settingActual = new Setting();
      setting.id = '1';
      setting.color = 'azul';
      settingActual.id = '1';
      settingActual.color = 'rojo';
      repositoryMock.findOneByOrFail?.mockResolvedValue(settingActual);
      repositoryMock.save?.mockResolvedValue(setting);
      setting.color = 'black';
      // Act
      await service.patchSettingColor(setting);
      // Assert
      expect(repositoryMock.findOneByOrFail).toBeCalled();
    });

    it('patchSettingColor should call repositorys save method', async () => {
      // Arrange
      const setting = new Setting();
      const settingActual = new Setting();
      setting.id = '1';
      setting.color = 'azul';
      settingActual.id = '1';
      settingActual.color = 'rojo';
      repositoryMock.findOneByOrFail?.mockResolvedValue(settingActual);
      repositoryMock.save?.mockResolvedValue(setting);
      setting.color = 'black';
      // Act
      await service.patchSettingColor(setting);
      // Assert
      expect(repositoryMock.save).toBeCalled();
    });

    it('patchSettingColor should return new setting', async () => {
      // Arrange
      const setting = new Setting();
      const settingActual = new Setting();
      setting.id = '1';
      setting.color = 'azul';
      settingActual.id = '1';
      settingActual.color = 'rojo';
      repositoryMock.findOneByOrFail?.mockResolvedValue(settingActual);
      repositoryMock.save?.mockResolvedValue(setting);
      // Act
      const result = await service.patchSettingColor(setting);
      // Assert
      expect(result.id).toEqual(setting.id);
      expect(result.color).toEqual(setting.color);
    });
  });
});

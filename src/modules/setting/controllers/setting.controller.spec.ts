import { Test, TestingModule } from '@nestjs/testing';
import { SettingController } from './setting.controller';
import { Setting } from '../entities/Setting.entity';
import { SettingService } from '../services/setting.service';
import { Client } from '../../client/entities/Client.entity';

describe('SettingController', () => {
  let controller: SettingController;
  let service: SettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingController],
      providers: [
        {
          provide: SettingService,
          useValue: {
            getSettingByClient: jest.fn().mockResolvedValue(new Setting()),
            patchSettingColor: jest.fn().mockResolvedValue(new Setting()),
          },
        },
      ],
    }).compile();

    controller = module.get<SettingController>(SettingController);
    service = module.get<SettingService>(SettingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSettingByClient', () => {
    it('getSettingByClient should call service.getSettingByclient', async () => {
      // Arrange
      const client = new Client();
      // Act
      await controller.getSettingByClient(client);
      // Assert
      expect(service.getSettingByClient).toBeCalled();
    });

    it('getSettingByClient should return setting', async () => {
      // Arrange
      const client = new Client();
      // Act
      const result = await controller.getSettingByClient(client);
      // Assert
      expect(result).toBeInstanceOf(Setting);
    });
  });

  describe('patchSettingColor', () => {
    it('patchSettingColor should call service.patchSettingColor', async () => {
      // Arrange
      const setting = new Setting();
      // Act
      await controller.patchSettingColor(setting);
      // Assert
      expect(service.patchSettingColor).toBeCalled();
    });

    it('patchSettingColor should return setting', async () => {
      // Arrange
      const setting = new Setting();
      // Act
      const result = await controller.patchSettingColor(setting);
      // Assert
      expect(result).toBeInstanceOf(Setting);
    });
  });
});

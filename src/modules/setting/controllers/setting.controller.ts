import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SettingService } from '../services/setting.service';
import { Setting } from '../entities/Setting.entity';
import { Client } from '../../client/entities/Client.entity';

@Controller('setting')
export class SettingController {
  constructor(private readonly service: SettingService) {}

  @Get()
  async getSettingByClient(@Body() client: Client): Promise<Setting> {
    return this.service.getSettingByClient(client);
  }

  @Patch()
  async patchSettingColor(@Body() setting: Setting): Promise<Setting> {
    return this.service.patchSettingColor(setting);
  }
}

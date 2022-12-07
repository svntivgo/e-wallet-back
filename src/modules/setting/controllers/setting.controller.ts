import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { SettingService } from '../services/setting.service';
import { Setting } from '../entities/Setting.entity';

@Controller('setting')
export class SettingController {
  constructor(private readonly service: SettingService) {}

  @Get('/:clientId')
  async getSettingByClient(
    @Param('clientId') clientId: string,
  ): Promise<Setting> {
    return this.service.getSettingByClient(clientId);
  }

  @Patch()
  async patchSettingColor(@Body() setting: Setting): Promise<Setting> {
    return this.service.patchSettingColor(setting);
  }
}

import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { SettingService } from '../services/setting.service';
import { Setting } from '../entities/Setting.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth('Token auth0')
@ApiTags('Setting')
@Controller('setting')
export class SettingController {
  constructor(private readonly service: SettingService) {}

  @ApiOperation({ summary: 'Get a Setting by client' })
  @ApiResponse({
    status: 200,
    description: 'OK. The response contains clients Setting.',
  })
  @Get('/:clientId')
  async getSettingByClient(
    @Param('clientId') clientId: string,
  ): Promise<Setting> {
    return this.service.getSettingByClient(clientId);
  }

  @ApiOperation({ summary: 'Patch a setting color' })
  @ApiResponse({
    status: 200,
    description: 'OK. The response contains modified setting.',
  })
  @Patch()
  async patchSettingColor(@Body() setting: Setting): Promise<Setting> {
    return this.service.patchSettingColor(setting);
  }
}

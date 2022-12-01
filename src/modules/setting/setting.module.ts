import { Module } from '@nestjs/common';
import { SettingService } from './services/setting.service';
import { SettingController } from './controllers/setting.controller';

@Module({
  providers: [SettingService],
  controllers: [SettingController]
})
export class SettingModule {}

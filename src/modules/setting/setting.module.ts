import { Module } from '@nestjs/common';
import { SettingService } from './services/setting.service';
import { SettingController } from './controllers/setting.controller';
import { Setting } from './entities/Setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  providers: [SettingService],
  controllers: [SettingController],
})
export class SettingModule {}

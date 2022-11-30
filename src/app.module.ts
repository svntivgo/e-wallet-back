import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { AccountModule } from './modules/account/account.module';
import { SettingModule } from './modules/setting/setting.module';
import { MovementModule } from './modules/movement/movement.module';

@Module({
  imports: [ClientModule, AccountModule, SettingModule, MovementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

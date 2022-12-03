import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/client/entities/Client.entity';
import { Repository } from 'typeorm';
import { Setting } from '../entities/Setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting) private repository: Repository<Setting>,
  ) {}

  async getSettingByClient(client: Client): Promise<Setting> {
    return await this.repository.findOneByOrFail({ clientId: client.id });
  }

  async patchSettingColor(setting: Setting): Promise<Setting> {
    const settingActual = await this.repository.findOneByOrFail({
      id: setting.id,
    });

    settingActual.color = setting.color;

    return await this.repository.save(settingActual);
  }
}

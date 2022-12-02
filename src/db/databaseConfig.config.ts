import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from 'src/modules/client/entities/Client.entity';
import { Account } from '../modules/account/entities/Account.entity';
import { Movement } from '../modules/movement/entities/Movement.entity';
import { Setting } from '../modules/setting/entities/Setting.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'e-wallet',
  synchronize: false,
  entities: [Client, Account, Movement, Setting],
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};

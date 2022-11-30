import { Column, Entity, Index, OneToOne } from 'typeorm';
import { Account } from '../../account/entities/Account.entity';
import { Setting } from '../../setting/entities/Setting.entity';

@Index('client_cli_email_Idx', ['email'], { unique: true })
@Index('pkclient', ['id'], { unique: true })
@Index('client_cli_phone_Idx', ['phone'], { unique: true })
@Entity('client', { schema: 'public' })
export class Client {
  @Column('uuid', { primary: true, name: 'cli_id' })
  id: string;

  @Column('character varying', { name: 'cli_full_name', length: 500 })
  fullName: string;

  @Column('character varying', { name: 'cli_email', length: 500 })
  email: string;

  @Column('character varying', { name: 'cli_phone', length: 500 })
  phone: string;

  @Column('character varying', { name: 'cli_photo', length: 36 })
  photo: string;

  @Column('character varying', { name: 'cli_password', length: 128 })
  password: string;

  @Column('integer', { name: 'cli_state', default: () => '1' })
  state: number;

  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToOne(() => Account, (account) => account.client)
  account: Account;

  @OneToOne(() => Setting, (setting) => setting.client)
  setting: Setting;
}

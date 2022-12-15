import { Field, Int, ObjectType } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { Account } from '../../account/entities/Account.entity';
import { Setting } from '../../setting/entities/Setting.entity';

@ObjectType()
@Index('client_cli_email_Idx', ['email'], { unique: true })
@Index('pkclient', ['id'], { unique: true })
@Index('client_cli_phone_Idx', ['phone'], { unique: true })
@Entity('client', { schema: 'public' })
export class Client {
  @Column('uuid', { primary: true, name: 'cli_id' })
  @Field(() => String)
  id: string = randomUUID();

  @Column('character varying', { name: 'cli_full_name', length: 500 })
  @Field(() => String)
  fullName: string;

  @Column('character varying', { name: 'cli_email', length: 500 })
  @Field(() => String)
  email: string;

  @Column('character varying', { name: 'cli_phone', length: 500 })
  @Field(() => String)
  phone: string;

  @Column('character varying', { name: 'cli_photo', length: 36 })
  @Field(() => String)
  photo: string;

  @Column('character varying', { name: 'cli_password', length: 128 })
  @Field(() => String)
  password: string;

  @Column('integer', { name: 'cli_state', default: () => '1' })
  @Field(() => Int)
  state: number;

  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  @Field(() => String)
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  deletedAt: Date | null;

  @OneToOne(() => Account, (account) => account.client, {
    cascade: ['insert', 'update'],
  })
  account: Account;

  @OneToOne(() => Setting, (setting) => setting.client, {
    cascade: ['insert', 'update'],
  })
  setting: Setting;
}

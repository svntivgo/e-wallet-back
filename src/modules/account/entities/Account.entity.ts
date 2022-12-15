import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Client } from '../../client/entities/Client.entity';
import { Movement } from '../../movement/entities/Movement.entity';
import { randomUUID } from 'crypto';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('pkaccount', ['id'], { unique: true })
@Index('account_cli_id_Idx', ['id'], { unique: true })
@Entity('account', { schema: 'public' })
export class Account {
  @Column('uuid', { primary: true, name: 'acc_id' })
  @Field(() => String)
  id: string = randomUUID();

  @Column('uuid', { name: 'cli_id' })
  @Field(() => String)
  clientId: string;

  @Column('bigint', { name: 'acc_balance', default: () => '0' })
  @Field(() => Int)
  balance: number;

  @Column('bigint', { name: 'acc_credit', default: () => '50000000' })
  @Field(() => Int)
  credit: number;

  @Column('integer', { name: 'acc_state', default: () => '1' })
  @Field(() => Int)
  state: number;

  @Column('timestamp without time zone', {
    name: 'acc_created_at',
    default: () => 'now()',
  })
  @Field(() => String)
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'acc_updated_at',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'acc_deleted_at',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  deletedAt: Date | null;

  @OneToOne(() => Client, (client) => client.account, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  @Field(() => Client, { description: 'Client' })
  client: Client;

  @OneToMany(() => Movement, (movement) => movement.accountIncome)
  @Field(() => Movement, { description: 'Movement Income.' })
  movementsIncome: Movement[];

  @OneToMany(() => Movement, (movement) => movement.accountOutcome)
  @Field(() => Movement, { description: 'Movement Outcome' })
  movementsOutcome: Movement[];
}

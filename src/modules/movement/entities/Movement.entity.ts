import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from '../../account/entities/Account.entity';
import { randomUUID } from 'crypto';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index(
  'movement_acc_id_income_acc_id_outcome_Idx',
  ['idIncome', 'idOutcome'],
  {},
)
@Index('pkmovement', ['id'], { unique: true })
@Entity('movement', { schema: 'public' })
export class Movement {
  @Column('uuid', { primary: true, name: 'mov_id' })
  @Field(() => String)
  id: string = randomUUID();

  @Column('uuid', { name: 'acc_id_income' })
  @Field(() => String)
  idIncome: string;

  @Column('uuid', { name: 'acc_id_outcome' })
  @Field(() => String)
  idOutcome: string;

  @Column('character varying', { name: 'mov_reason', length: 500 })
  @Field(() => String)
  reason: string;

  @Column('bigint', { name: 'mov_amount' })
  @Field(() => Int)
  amount: number;

  @Column('integer', { name: 'mov_fees', default: () => '1' })
  @Field(() => Int)
  fees: number;

  @Column('timestamp without time zone', {
    name: 'mov_datetime',
    default: () => 'now()',
  })
  @Field(() => String)
  datetime: Date;

  @ManyToOne(() => Account, (account) => account.movementsIncome, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_income', referencedColumnName: 'id' }])
  @Field(() => Account, { description: 'Account Income' })
  accountIncome: Account;

  @ManyToOne(() => Account, (account) => account.movementsOutcome, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_outcome', referencedColumnName: 'id' }])
  @Field(() => Account, { description: 'Account Outcome' })
  accountOutcome: Account;
}

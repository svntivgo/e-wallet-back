import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from '../../account/entities/Account.entity';

@Index(
  'movement_acc_id_income_acc_id_outcome_Idx',
  ['idIncome', 'idOutcome'],
  {},
)
@Index('pkmovement', ['id'], { unique: true })
@Entity('movement', { schema: 'public' })
export class Movement {
  @Column('uuid', { primary: true, name: 'mov_id' })
  id: string;

  @Column('uuid', { name: 'acc_id_income' })
  idIncome: string;

  @Column('uuid', { name: 'acc_id_outcome' })
  idOutcome: string;

  @Column('character varying', { name: 'mov_reason', length: 500 })
  reason: string;

  @Column('bigint', { name: 'mov_amount' })
  amount: string;

  @Column('integer', { name: 'mov_fees', default: () => '1' })
  fees: number;

  @Column('timestamp without time zone', {
    name: 'mov_datetime',
    default: () => 'now()',
  })
  datetime: Date;

  @ManyToOne(() => Account, (account) => account.movements, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_income', referencedColumnName: 'id' }])
  idIncome2: Account;

  @ManyToOne(() => Account, (account) => account.movements2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_outcome', referencedColumnName: 'id' }])
  idOutcome2: Account;
}

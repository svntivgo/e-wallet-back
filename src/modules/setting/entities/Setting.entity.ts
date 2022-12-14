import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Client } from '../../client/entities/Client.entity';
import { randomUUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('pkapp', ['id'], { unique: true })
@Index('app_cli_id_Idx', ['id'], { unique: true })
@Entity('app', { schema: 'public' })
export class Setting {
  @Column('uuid', { primary: true, name: 'app_id' })
  @ApiProperty({ example: 'UUID', description: 'Setting ID' })
  @Field(() => String)
  id: string = randomUUID();

  @ApiProperty({ example: 'UUID', description: 'Client ID' })
  @Column('uuid', { name: 'cli_id' })
  @Field(() => String)
  clientId: string;

  @ApiProperty({ example: '#77dd1a', description: 'Hexadecimal color' })
  @Column('character varying', {
    name: 'app_color',
    length: 30,
    default: () => "'default'",
  })
  @Field(() => String)
  color: string;

  @ApiProperty({ example: 'Date', description: 'Date' })
  @Column('timestamp without time zone', {
    name: 'app_created_at',
    default: () => 'now()',
  })
  @Field(() => String)
  createdAt: Date;

  @ApiProperty({ example: 'Date', description: 'Date' })
  @Column('timestamp without time zone', {
    name: 'app_updated_at',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  updatedAt: Date | null;

  @ApiProperty({ example: 'Date', description: 'Date' })
  @Column('timestamp without time zone', {
    name: 'app_deleted_at',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  deletedAt: Date | null;

  @OneToOne(() => Client, (client) => client.setting, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  @Field(() => Client, { description: 'Client' })
  client: Client;
}

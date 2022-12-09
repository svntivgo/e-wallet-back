import { Module } from '@nestjs/common';
import { MovementController } from './controllers/movement.controller';
import { MovementService } from './services/movement.service';
import { AccountService } from '../account/services/account.service';
import { AccountModule } from '../account/account.module';
import { Movement } from './entities/Movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movement]), AccountModule],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}

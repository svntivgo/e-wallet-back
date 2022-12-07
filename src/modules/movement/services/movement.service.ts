import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/client/entities/Client.entity';
import { Repository } from 'typeorm';
import { Movement } from '../entities/Movement.entity';
import { createMovementDto } from '../dtos/createMovementDto';
import { AccountService } from '../../account/services/account.service';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement) private repository: Repository<Client>,
    private accountService: AccountService,
  ) {}

  async createMovement(
    createMovementDto: createMovementDto,
  ): Promise<Movement> {
    const movement = new Movement();
    movement.idIncome = createMovementDto.idIncome;
    movement.idOutcome = createMovementDto.idOutcome;
    movement.reason = createMovementDto.reason;
    movement.amount = createMovementDto.amount;

    return this.repository.save(movement);
  }
}

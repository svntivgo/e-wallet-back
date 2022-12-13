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
    private readonly accountService: AccountService,
  ) {}

  async createLoanMovement(
    createMovementDto: createMovementDto,
  ): Promise<Movement> {
    const movement = new Movement();
    movement.idIncome = createMovementDto.idIncome;
    movement.idOutcome = createMovementDto.idOutcome;
    movement.reason = createMovementDto.reason;
    movement.amount = Number(createMovementDto.amount);
    this.accountService.patchLoan(movement.idIncome, movement.amount);

    return this.repository.save(movement);
  }

  async createPaymentMovement(
    createMovementDto: createMovementDto,
  ): Promise<Movement> {
    const movement = new Movement();
    movement.idIncome = createMovementDto.idIncome;
    movement.idOutcome = createMovementDto.idOutcome;
    movement.reason = createMovementDto.reason;
    movement.amount = Number(createMovementDto.amount);
    this.accountService.patchPayment(
      movement.idIncome,
      movement.idOutcome,
      movement.amount,
    );

    return this.repository.save(movement);
  }
}

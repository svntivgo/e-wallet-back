import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/client/entities/Client.entity';
import { Repository } from 'typeorm';
import { Movement } from '../entities/Movement.entity';
import { createMovementDto } from '../dtos/createMovementDto';
import { AccountService } from '../../account/services/account.service';
import { lastMovementDto } from '../dtos/lastMovementDto';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement) private repository: Repository<Movement>,
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

  async getLastMovements(accountId: string): Promise<lastMovementDto[]> {
    const movements = await this.repository
      .createQueryBuilder()
      .where({ idIncome: accountId })
      .orWhere({ idOutcome: accountId })
      .orderBy('mov_datetime', 'DESC')
      .limit(10)
      .getMany()
      .then((movements) =>
        movements.map(async (movement) => {
          const lastMovement = new lastMovementDto();
          lastMovement.amount = movement.amount;
          lastMovement.idIncome = movement.idIncome;
          lastMovement.idOutcome = movement.idOutcome;
          lastMovement.reason = movement.reason;
          lastMovement.datetime = movement.datetime;
          lastMovement.photo =
            await this.accountService.getClientPhotoByAccount(
              accountId == movement.idIncome
                ? movement.idOutcome
                : movement.idIncome,
            );
          return lastMovement;
        }),
      );
    return await Promise.all(movements);
  }
}

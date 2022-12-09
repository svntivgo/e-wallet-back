import { Body, Controller, Patch } from '@nestjs/common';
import { createMovementDto } from '../dtos/createMovementDto';
import { Movement } from '../entities/Movement.entity';
import { MovementService } from '../services/movement.service';

@Controller('movement')
export class MovementController {
  constructor(private readonly service: MovementService) {}

  @Patch('loan')
  async patchLoan(@Body() dto: createMovementDto): Promise<Movement> {
    return await this.service.createLoanMovement(dto);
  }

  @Patch('payment')
  async patchPayment(@Body() dto: createMovementDto): Promise<Movement> {
    return await this.service.createPaymentMovement(dto);
  }
}

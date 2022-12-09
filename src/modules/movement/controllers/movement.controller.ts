import { Body, Controller, Patch } from '@nestjs/common';
import { createMovementDto } from '../dtos/createMovementDto';
import { Movement } from '../entities/Movement.entity';
import { MovementService } from '../services/movement.service';

@Controller('movement')
export class MovementController {
  constructor(private readonly service: MovementService) {}

  @Patch()
  async patchLoan(@Body() dto: createMovementDto): Promise<Movement> {
    return await this.service.createMovement(dto);
  }
}

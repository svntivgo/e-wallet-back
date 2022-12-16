import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createMovementDto } from '../dtos/createMovementDto';
import { Movement } from '../entities/Movement.entity';
import { MovementService } from '../services/movement.service';
import { lastMovementDto } from '../dtos/lastMovementDto';

@ApiBearerAuth('Token auth0')
@ApiTags('Movement')
@Controller('movement')
export class MovementController {
  constructor(private readonly service: MovementService) {}

  @ApiOperation({ summary: 'Creates a Loan Movement' })
  @ApiResponse({
    status: 201,
    description: 'Created. New Loan Movement has been created.',
  })
  @Patch('loan')
  async patchLoan(@Body() dto: createMovementDto): Promise<Movement> {
    return await this.service.createLoanMovement(dto);
  }

  @ApiOperation({ summary: 'Creates a Payment Movement' })
  @ApiResponse({
    status: 201,
    description: 'Created. New Payment Movement has been created.',
  })
  @Patch('payment')
  async patchPayment(@Body() dto: createMovementDto): Promise<Movement> {
    return await this.service.createPaymentMovement(dto);
  }

  @ApiOperation({ summary: 'Get last 10 movements' })
  @ApiResponse({
    status: 200,
    description: 'OK. Return an array of last 10 movements.',
  })
  @Get('/:accountId')
  async getLastMovements(
    @Param('accountId') accountId: string,
  ): Promise<lastMovementDto[]> {
    return await this.service.getLastMovements(accountId);
  }
}

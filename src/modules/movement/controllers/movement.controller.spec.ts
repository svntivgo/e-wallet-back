import { Test, TestingModule } from '@nestjs/testing';
import { MovementController } from './movement.controller';
import { MovementService } from '../services/movement.service';
import { Movement } from '../entities/Movement.entity';
import { createMovementDto } from '../dtos/createMovementDto';

describe('MovementController', () => {
  let controller: MovementController;
  let service: MovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementController],
      providers: [
        {
          provide: MovementService,
          useValue: {
            createLoanMovement: jest.fn().mockResolvedValue(new Movement()),
            createPaymentMovement: jest.fn().mockResolvedValue(new Movement()),
          },
        },
      ],
    }).compile();

    controller = module.get<MovementController>(MovementController);
    service = module.get<MovementService>(MovementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('patchLoan', () => {
    it('patchLoan should call service patchLoan', async () => {
      // Arrange
      const movement = new createMovementDto();
      // Act
      await controller.patchLoan(movement);
      // Assert
      expect(service.createLoanMovement).toBeCalled();
    });

    it('patchLoan should call service patchLoan', async () => {
      // Arrange
      const movement = new createMovementDto();
      // Act
      const result = await controller.patchLoan(movement);
      // Assert
      expect(result).toBeInstanceOf(Movement);
    });
  });

  describe('patchPayment', () => {
    it('patchPayment should call service patchPayment', async () => {
      // Arrange
      const movement = new createMovementDto();
      // Act
      await controller.patchPayment(movement);
      // Assert
      expect(service.createPaymentMovement).toBeCalled();
    });

    it('patchPayment should call service patchPayment', async () => {
      // Arrange
      const movement = new createMovementDto();
      // Act
      const result = await controller.patchPayment(movement);
      // Assert
      expect(result).toBeInstanceOf(Movement);
    });
  });
});

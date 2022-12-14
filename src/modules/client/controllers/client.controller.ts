import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createClientDto } from '../dtos/createClientDto.dto';
import { Client } from '../entities/Client.entity';
import { ClientService } from '../services/client.service';

@ApiBearerAuth('Token auth0')
@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private service: ClientService) {}

  @ApiOperation({ summary: 'Create a client' })
  @ApiResponse({
    status: 201,
    description: 'Created. New Client has been created.',
  })
  @Post()
  async createClient(@Body() client: createClientDto): Promise<Client> {
    return await this.service.createClient(client);
  }

  @ApiOperation({ summary: 'Patch Clients password and phone' })
  @ApiResponse({
    status: 200,
    description: 'OK. The response contains client patched.',
  })
  @Patch()
  async patchClient(@Body() client: Client): Promise<Client> {
    return await this.service.patchClient(client);
  }

  @ApiOperation({ summary: 'Get all Clients' })
  @ApiResponse({
    status: 200,
    description: 'OK. The response contains all Clients.',
  })
  @Get()
  async getClients(): Promise<Client[]> {
    return await this.service.getClients();
  }

  @ApiOperation({ summary: 'Get a Client by phone or email' })
  @ApiResponse({
    status: 200,
    description:
      'OK. The response contain a client corresponding to the request.',
  })
  @Get('phone-email/:phoneEmail')
  async getClientByPhoneEmail(
    @Param('phoneEmail') phoneEmail: string,
  ): Promise<Client> {
    return await this.service.getClientByPhoneEmail(phoneEmail);
  }
}

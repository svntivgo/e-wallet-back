import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createClientDto } from '../dtos/createClientDto.dto';
import { Client } from '../entities/Client.entity';
import { ClientService } from '../services/client.service';

@Controller('client')
export class ClientController {
  constructor(private service: ClientService) {}

  @Post()
  async createClient(@Body() client: createClientDto): Promise<Client> {
    return await this.service.createClient(client);
  }

  @Get()
  async getClients(): Promise<Client[]> {
    return await this.service.getClients();
  }

  @Get('phone-email/:phoneEmail')
  async getClientByPhoneEmail(
    @Param('phoneEmail') phoneEmail: string,
  ): Promise<Client> {
    return await this.service.getClientByPhoneEmail(phoneEmail);
  }
}

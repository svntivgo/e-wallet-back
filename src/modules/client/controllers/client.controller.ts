import { Body, Controller, Get, Post } from '@nestjs/common';
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
  getClients(): Client[] {
    const clients: Array<Client> = [];
    return clients;
  }

  @Get()
  getClientByPhoneEmail(@Body() phoneEmail: string): Client {
    return new Client();
  }
}

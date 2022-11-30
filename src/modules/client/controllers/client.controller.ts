import { Body, Controller, Get, Post } from '@nestjs/common';
import { createClientDto } from '../dtos/createClientDto.dto';
import { Client } from '../entities/Client.entity';

@Controller('client')
export class ClientController {
  @Post()
  createClient(@Body() client: createClientDto): Client {
    return new Client();
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

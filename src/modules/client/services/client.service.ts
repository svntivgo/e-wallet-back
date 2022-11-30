import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createClientDto } from '../dtos/createClientDto.dto';
import { Client } from '../entities/Client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private repository: Repository<Client>,
  ) {}

  async createClient(client: createClientDto): Promise<Client> {
    return new Client();
  }

  async getClients(): Promise<Client[]> {
    const clients: Client[] = [];
    return clients;
  }

  async getClientByPhoneEmail(phoneEmail: string): Promise<Client> {
    return new Client();
  }
}

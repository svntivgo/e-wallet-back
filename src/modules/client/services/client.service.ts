import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../account/entities/Account.entity';
import { Repository } from 'typeorm';
import { createClientDto } from '../dtos/createClientDto.dto';
import { Client } from '../entities/Client.entity';
import { Setting } from '../../setting/entities/Setting.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private repository: Repository<Client>,
  ) {}

  async createClient(client: createClientDto): Promise<Client> {
    const newClient = new Client();
    newClient.fullName = client.fullName;
    newClient.email = client.email;
    newClient.phone = client.phone;
    newClient.photo = client.photo;
    newClient.password = '';
    newClient.account = new Account();
    newClient.account.movements = [];
    newClient.setting = new Setting();

    return await this.repository.save(newClient);
  }

  async getClients(): Promise<Client[]> {
    return await this.repository.find();
  }

  async getClientByPhoneEmail(phoneEmail: string): Promise<Client> {
    return new Client();
  }
}

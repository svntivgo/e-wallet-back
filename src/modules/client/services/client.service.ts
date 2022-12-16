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
    console.log('ESTE ES EL ID', newClient.id);
    newClient.fullName = client.fullName;
    newClient.email = client.email;
    newClient.phone = client.phone;
    newClient.photo = client.photo;
    newClient.password = '';
    newClient.account = new Account();
    newClient.setting = new Setting();

    return await this.repository.save(newClient);
  }

  async patchClient(client: Client): Promise<Client> {
    const oldClient = await this.repository.findOneByOrFail({
      email: client.email,
    });
    oldClient.phone = client.phone;
    oldClient.password = client.password;
    return await this.repository.save(oldClient);
  }

  async getClients(): Promise<Client[]> {
    return await this.repository.find();
  }

  async getClientPhoto(clientId: string): Promise<string> {
    const client = await this.repository.findOneByOrFail({ id: clientId });
    return client.photo;
  }

  async getClientByPhoneEmail(phoneEmail: string): Promise<Client> {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    const phoneRegex = /[0-9]{10}/g;

    if (emailRegex.test(phoneEmail))
      return await this.repository.findOneByOrFail({ email: phoneEmail });

    if (phoneRegex.test(phoneEmail))
      return await this.repository.findOneByOrFail({ phone: phoneEmail });

    throw new Error('No se encontró ningún usuario');
  }
}

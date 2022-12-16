import { Query, Resolver } from '@nestjs/graphql';
import { Setting } from '../modules/setting/entities/Setting.entity';

@Resolver()
export class ClientResolver {
  @Query(() => String, { name: 'ElQueYoQuiero' })
  holaMundo1(): string {
    return 'Hola Mundo desde GraphQL - 1';
  }
}

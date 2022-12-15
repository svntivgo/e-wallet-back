import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ClientResolver {
  @Query(() => String, { name: 'ElQueYoQuiero' })
  holaMundo1(): string {
    return 'Hola Mundo desde GraphQL - 1';
  }
}

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TelephoneType {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field()
  area_code: string;
}
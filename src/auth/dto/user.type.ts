import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TelephoneType } from './telephone.type';

@ObjectType() 
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;


  @Field(() => [TelephoneType], { nullable: true })
  telephones?: TelephoneType[];

  @Field()
  createdAt: Date;
}
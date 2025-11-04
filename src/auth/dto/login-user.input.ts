import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInputClass {
  @Field()
  email: string;

  @Field()
  password: string;
}
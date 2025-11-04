import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TelephoneInput {
  @Field()
  number: string;

  @Field()
  area_code: string;
}

@InputType()
export class CreateUserInputClass {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

   @Field(() => [TelephoneInput])
  telephones: TelephoneInput[];
}
import { Resolver, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { LoginService } from '../services/login.service';
import { LoginSchema } from '../schemas/login.schema';
import { LoginInputClass } from '../dto/login-user.input';
import { AppError } from 'src/common/errors/app-error';

@ObjectType()
class TelephoneReturn {
  @Field()
  number: string;

  @Field()
  area_code: string;
}

@ObjectType()
class UserReturn {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [TelephoneReturn], { nullable: true })
  telephones?: TelephoneReturn[];
}

@ObjectType()
class LoginResponse {
  @Field()
  token: string;

  @Field(() => UserReturn)
  user: UserReturn;
}

@Resolver()
export class LoginResolver {
  constructor(private loginService: LoginService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('data') data: LoginInputClass,
  ): Promise<LoginResponse> {
    const parsed = LoginSchema.safeParse(data);

    if (!parsed.success) {
      const message = parsed.error.issues[0].message;
      throw new AppError(message, 400);
    }
    return this.loginService.login(parsed.data.email, parsed.data.password);
  }
}

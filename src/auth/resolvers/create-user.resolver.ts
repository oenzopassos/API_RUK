import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { RegisterService } from '../services/register.service';
import { CreateUserSchema } from '../schemas/create-user.schema';
import { User } from '../dto/user.type';
import { CreateUserInputClass } from '../dto/create-user.input';
import { AppError } from 'src/common/errors/app-error';

@Resolver(() => User)
export class CreateUserResolver {
    constructor(private readonly registerService: RegisterService) { }

    @Mutation(() => User)
    async register(@Args('data') data: CreateUserInputClass): Promise<User> {
        const result = CreateUserSchema.safeParse(data);

        if (!result.success) {
            const message = result.error.issues[0].message;
            throw new AppError(message, 400);
        }

        return this.registerService.register(result.data);

    }

}
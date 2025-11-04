import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../auth/dto/user.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth-guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(AuthGuard)
  users() {
    return this.usersService.findAll();
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../database/prisma/prisma.service";
import { CreateUserInputClass } from '../dto/create-user.input';
import * as bcrypt from 'bcryptjs';
import { AppError } from 'src/common/errors/app-error';

@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}

  async register(input: CreateUserInputClass) {
    
    const existingUser = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existingUser) throw new AppError('Email já está em uso');

    
    const hashedPassword = await bcrypt.hash(input.password, 10);

    
    const user = await this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        telephones: {
          create: input.telephones?.map((t) => ({
            number: t.number,
            area_code: t.area_code,
          })),
        },
      },
      include: { telephones: true },
    });

    return user;
  }
}

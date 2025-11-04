import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../database/prisma/prisma.service"
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AppError } from 'src/common/errors/app-error';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { telephones: true }
    });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new AppError('Senha inválida');


    const token = this.jwtService.sign({ sub: user.id, email: user.email }, {expiresIn: '7d'});
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        telephones: user.telephones.map(t => ({
          number: t.number,
          area_code: t.area_code
        }))
      }
    };
  }
}
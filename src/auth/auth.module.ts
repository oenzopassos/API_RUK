import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from "../database/prisma/prisma.service"
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { CreateUserResolver } from './resolvers/create-user.resolver';
import { LoginResolver } from './resolvers/login.resolver';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'default_secret',
                signOptions: { expiresIn: '1d' },
            }),
        }),
    ],
    providers: [
        PrismaService,
        RegisterService,
        LoginService,
        CreateUserResolver,
        LoginResolver,
    ],
})
export class AuthModule { }
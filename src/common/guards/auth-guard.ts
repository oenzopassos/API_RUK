import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AppError } from "../errors/app-error";
import { verify } from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const {req} = ctx.getContext();


        const authHeader = req.headers.authorization;
        if(!authHeader) {
            throw new AppError('Token não fornecido', 401);
        }

        const token = authHeader.replace('Bearer ', '');


        try{
            const decoded = verify(token, process.env.JWT_SECRET || 'default_secret');
            req.user = decoded;
            return true;
        } catch{
            throw new AppError('Token inválido', 401);
        }
    }
}
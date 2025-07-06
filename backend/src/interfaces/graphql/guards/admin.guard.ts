import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'SECRET_KEY';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authHeader = ctx.req?.headers?.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, SECRET_KEY) as any;
      return payload && payload.role === 'admin';
    } catch {
      return false;
    }
  }
}

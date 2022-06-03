import { buildError } from './../utils/error';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorators/public';
import { HttpError } from 'src/utils/error';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  private verifyToken(token?: string) {
    if (!token) {
      throw new HttpError('missing token', 403);
    }
    try {
      this.jwtService.verify(token);
    } catch (error) {
      buildError(error);
    }
  }

  async getAuthenticateOptions(context): Promise<any> {
    const token = context
      .getRequest()
      .headers?.authorization?.split('Bearer ')?.[1];
    this.verifyToken(token);
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (request) {
      if (isPublic) {
        return true;
      }
      return super.canActivate(context);
    }
    if (!isPublic) {
      const ctx = GqlExecutionContext.create(context).getContext();
      const token = ctx.req.headers?.authorization?.split('Bearer ')?.[1];

      this.verifyToken(token);
    }

    return true;
  }
}

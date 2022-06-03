import { validateEmail, validatePassword } from './auth.validator';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthValidatorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    validateEmail(email);
    validatePassword(password);
    next();
  }
}

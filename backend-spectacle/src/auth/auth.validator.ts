import { isString, minLength, isEmail } from 'class-validator';
import { HttpError } from 'src/utils/error';

export const validatePassword = (password: any) => {
  if (password === undefined || password === null)
    throw new HttpError('password is missing', 401, 'invalid-password');

  if (!isString(password))
    throw new HttpError('password must be a string', 401, 'invalid-password');

  if (!minLength(password, 6))
    throw new HttpError(
      'Password contains at least 6 characters',
      401,
      'invalid-password',
    );
};

export const validateEmail = (email: any) => {
  if (email === null || email === undefined)
    throw new HttpError('email is missing', 401, 'invalid-email');

  if (!isEmail(email))
    throw new HttpError(
      'The value provided for the email user property is invalid. Must be a string email address.',
      401,
      'invalid-email',
    );
};

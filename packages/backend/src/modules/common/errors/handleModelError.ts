import { Response } from 'express';
import { ValidationError } from 'objection';
import transformValidationError from './transformValidationError';

export default function handleModelError(e: Error, res: Response): Response {
  const isValidationError = e instanceof ValidationError;

  res.status(isValidationError ? 400 : 500);

  return res.send({
    message: isValidationError ? 'BadRequest' : 'InternalServerError',
    errors: isValidationError ? transformValidationError(e as ValidationError) : {},
  });
}

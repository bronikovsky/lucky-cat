import { ErrorHash, ValidationError } from 'objection';

type ValidationErrorMap = {
  [key: string]: {
    message: string;
    error: string;
  }[];
}

export default function transformValidationError(e: ValidationError): ValidationErrorMap {
  if (!e.data) {
    return {};
  }

  return Object.keys(e.data).reduce((all: ValidationErrorMap, k) => ({
    ...all, [k]: e.data[k].map((err: ErrorHash) => ({ message: err.message, error: err.keyword })),
  }), {});
}

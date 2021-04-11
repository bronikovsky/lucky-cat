import { NextFunction, Request, Response } from 'express';

export default function setApplicationJsonResponseHeader() {
  return (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader('Content-Type', 'application/json');

    return next();
  };
}

import { AppError } from '../shared/AppError';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ZodType, ZodError } from 'zod';

export const validate = <
  TBody = unknown,
  TParams extends ParamsDictionary = ParamsDictionary,
  TResBody = unknown
>(
  schema: ZodType
) => {
  return (req: Request<TParams, TResBody, TBody>, _res: Response<TResBody>, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppError(error.issues[0].message, 400);
      }
      throw error;
    }
  };
};

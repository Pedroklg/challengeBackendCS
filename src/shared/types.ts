import { ParamsDictionary } from 'express-serve-static-core';

export type NoParams = Record<string, never>;

export interface IdParams extends ParamsDictionary {
  id: string;
}

export interface CompanyIdParams extends ParamsDictionary {
  companyId: string;
}

export enum ActivityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

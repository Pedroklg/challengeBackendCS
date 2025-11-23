import { CompanyDocument } from '../../../db/models/CompanyModel';

export type CompanyDBCreateDTO = Pick<
  CompanyDocument,
  'name' | 'sector' | 'cnpj' | 'address' | 'phone'
>;

export type CompanyDBUpdateDTO = Partial<CompanyDBCreateDTO>;

export type CompanyDBOutDTO = CompanyDocument;

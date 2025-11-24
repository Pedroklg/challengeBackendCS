import { Address } from '../../db/models/AddressModel';
import { CreateEmployeeRequest } from '../employee/types';

export type CompanyAddress = Address;

export interface CreateCompanyRequest {
  name: string;
  sector: string;
  cnpj: string;
  address: CompanyAddress;
  phone?: string;
  firstEmployee?: Omit<CreateEmployeeRequest, 'companyId'>;
}

export type UpdateCompanyRequest = Partial<CreateCompanyRequest>;

export interface CompanyResponse extends CreateCompanyRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

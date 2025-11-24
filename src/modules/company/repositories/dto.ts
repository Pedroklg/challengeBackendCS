import { Address } from '../../../db/models/AddressModel';

export type CompanyDBCreateDTO = {
  name: string;
  sector: string;
  cnpj: string;
  address: Address;
  phone?: string;
};

export type CompanyDBUpdateDTO = Partial<CompanyDBCreateDTO>;

export type CompanyDBOutDTO = {
  id: string;
  name: string;
  sector: string;
  cnpj: string;
  address: Address;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};

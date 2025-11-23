import { Address } from 'db/models/AddressModel';

export type CompanyAddress = Address;

export interface CreateCompanyDTO {
  name: string;
  sector: string;
  cnpj: string;
  address: CompanyAddress;
  phone?: string;
}

export type UpdateCompanyDTO = Partial<CreateCompanyDTO>;

export interface CompanyResponseDTO extends CreateCompanyDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

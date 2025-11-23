import { CompanyDocument } from "db/models/CompanyModel";

export interface CompanyRepository {
  create(company: CompanyDocument): Promise;
  findById(id: string): Promise;
  findByCnpj(cnpj: string): Promise;
  findAll(): Promise;
  update(id: string, data: Partial): Promise;
  delete(id: string): Promise;
}
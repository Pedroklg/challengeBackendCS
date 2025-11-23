import { CompanyDBCreateDTO, CompanyDBUpdateDTO, CompanyDBOutDTO } from './dto';

export interface CompanyRepository {
  create(company: CompanyDBCreateDTO): Promise<CompanyDBOutDTO>;

  findById(id: string): Promise<CompanyDBOutDTO | null>;

  findByCnpj(cnpj: string): Promise<CompanyDBOutDTO | null>;

  findAll(): Promise<CompanyDBOutDTO[]>;

  update(id: string, data: CompanyDBUpdateDTO): Promise<CompanyDBOutDTO | null>;

  delete(id: string): Promise<boolean>;
}

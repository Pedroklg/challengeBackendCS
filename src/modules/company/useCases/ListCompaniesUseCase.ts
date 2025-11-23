import { CompanyRepository } from '../repositories/CompanyRepository';
import { CompanyDBOutDTO } from '../repositories/dto';

export class ListCompaniesUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyDBOutDTO[]> {
    return this.companyRepository.findAll();
  }
}

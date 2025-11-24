import { CompanyRepository } from '../repositories/CompanyRepository';
import { CompanyResponse } from '../types';

export class ListCompaniesUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyResponse[]> {
    const companies = await this.companyRepository.findAll();

    return companies;
  }
}

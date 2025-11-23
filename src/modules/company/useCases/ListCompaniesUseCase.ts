import { CompanyRepository } from "../repositories/CompanyRepository";

export class ListCompaniesUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(): Promise {
    return this.companyRepository.findAll();
  }
}
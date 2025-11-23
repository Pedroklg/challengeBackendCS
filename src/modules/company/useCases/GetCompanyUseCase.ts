import { AppError } from "@shared/AppError";
import { CompanyRepository } from "../repositories/CompanyRepository";

export class GetCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string): Promise {
    const company = await this.companyRepository.findById(id);
    
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    return company;
  }
}
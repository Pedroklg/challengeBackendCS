import { AppError } from "@shared/AppError";
import { CompanyRepository } from "../repositories/CompanyRepository";

export class UpdateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string, data: UpdateCompanyDTO): Promise {
    const company = await this.companyRepository.findById(id);
    
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    if (data.cnpj && data.cnpj !== company.cnpj) {
      const existingCompany = await this.companyRepository.findByCnpj(data.cnpj);
      if (existingCompany) {
        throw new AppError('Company with this CNPJ already exists', 409);
      }
    }

    const updatedCompany = await this.companyRepository.update(id, data);
    
    if (!updatedCompany) {
      throw new AppError('Failed to update company', 500);
    }

    return updatedCompany;
  }
}
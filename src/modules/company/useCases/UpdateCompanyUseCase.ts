import { AppError } from '../../../shared/AppError';
import { CompanyRepository } from '../repositories/CompanyRepository';
import { UpdateCompanyRequest } from '../types';
import { CompanyDBOutDTO } from '../repositories/dto';
import { normalizeCNPJ } from '../../../shared/utils/normalizeCNPJ';

export class UpdateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string, data: UpdateCompanyRequest): Promise<CompanyDBOutDTO> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    if (data.cnpj) {
      const newCnpj = normalizeCNPJ(data.cnpj);

      if (newCnpj !== company.cnpj) {
        const existingCompany = await this.companyRepository.findByCnpj(newCnpj);

        if (existingCompany) {
          throw new AppError('Company with this CNPJ already exists', 409);
        }
      }
    }

    const updatedCompany = await this.companyRepository.update(id, data);

    if (!updatedCompany) {
      throw new AppError('Failed to update company', 500);
    }

    return updatedCompany;
  }
}

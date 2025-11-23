import { AppError } from '../../../shared/AppError';
import { CompanyRepository } from '../repositories/CompanyRepository';
import { CreateCompanyDTO } from '../types';
import { CompanyDBOutDTO } from '../repositories/dto';

export class CreateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(data: CreateCompanyDTO): Promise<CompanyDBOutDTO> {
    const existingCompany = await this.companyRepository.findByCnpj(data.cnpj);

    if (existingCompany) {
      throw new AppError('Company with this CNPJ already exists', 409);
    }

    return this.companyRepository.create(data);
  }
}

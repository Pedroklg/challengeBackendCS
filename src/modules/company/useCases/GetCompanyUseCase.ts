import { AppError } from '../../../shared/AppError';
import { CompanyRepository } from '../repositories/CompanyRepository';
import { CompanyDBOutDTO } from '../repositories/dto';

export class GetCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<CompanyDBOutDTO> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    return company;
  }
}

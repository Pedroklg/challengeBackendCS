import { CompanyRepository } from 'modules/company/repositories/CompanyRepository';
import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { AppError } from '../../../shared/AppError';
import { EmployeeDBOutDTO } from '../repositories/dto';

export class ListEmployeesByCompanyUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private companyRepository: CompanyRepository
  ) {}

  async execute(companyId: string): Promise<EmployeeDBOutDTO[]> {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    return this.employeeRepository.findByCompanyId(companyId);
  }
}

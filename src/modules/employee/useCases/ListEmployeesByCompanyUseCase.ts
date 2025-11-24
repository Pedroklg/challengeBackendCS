import { CompanyRepository } from 'modules/company/repositories/CompanyRepository';
import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { AppError } from '../../../shared/AppError';
import { EmployeeResponse } from '../types';

export class ListEmployeesByCompanyUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private companyRepository: CompanyRepository
  ) {}

  async execute(companyId: string): Promise<EmployeeResponse[]> {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    const employees = await this.employeeRepository.findByCompanyId(companyId);

    return employees;
  }
}

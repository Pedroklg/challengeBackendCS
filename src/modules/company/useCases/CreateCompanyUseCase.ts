import { AppError } from '../../../shared/AppError';
import { CompanyRepository } from '../repositories/CompanyRepository';
import { EmployeeRepository } from 'modules/employee/repositories/EmployeeRepository';
import { CreateCompanyRequest, CompanyResponse } from '../types';
import { CreateEmployeeUseCase } from '../../employee/useCases/CreateEmployeeUseCase';
import { CreateEmployeeRequest } from '../../employee/types';

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private employeeRepository?: EmployeeRepository
  ) {}

  async execute(data: CreateCompanyRequest): Promise<CompanyResponse> {
    const existingCompany = await this.companyRepository.findByCnpj(data.cnpj);

    if (existingCompany) {
      throw new AppError('Company with this CNPJ already exists', 409);
    }

    const { firstEmployee, ...companyData } = data;

    const created = await this.companyRepository.create(companyData);

    if (firstEmployee) {
      if (!this.employeeRepository) {
        throw new AppError('Employee repository not provided', 500);
      }

      const employeeUseCase = new CreateEmployeeUseCase(
        this.employeeRepository,
        this.companyRepository
      );

      const employeeData: CreateEmployeeRequest = {
        companyId: created.id,
        ...firstEmployee,
      };

      await employeeUseCase.execute(employeeData);
    }

    return created;
  }
}

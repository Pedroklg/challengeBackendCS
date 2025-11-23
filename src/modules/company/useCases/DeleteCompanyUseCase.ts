import { EmployeeRepository } from "modules/employee/repositories/EmployeeRepository";
import { CompanyRepository } from "../repositories/CompanyRepository";
import { AppError } from "@shared/AppError";

export class DeleteCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private employeeRepository: EmployeeRepository
  ) {}

  async execute(id: string): Promise {
    const company = await this.companyRepository.findById(id);
    
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    const employees = await this.employeeRepository.findByCompanyId(id);
    
    if (employees.length > 0) {
      throw new AppError('Cannot delete company with active employees', 400);
    }

    const deleted = await this.companyRepository.delete(id);
    
    if (!deleted) {
      throw new AppError('Failed to delete company', 500);
    }
  }
}
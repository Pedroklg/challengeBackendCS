import { CompanyRepository } from "modules/company/repositories/CompanyRepository";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { AppError } from "@shared/AppError";
import { hashPassword } from "@shared/utils/hashPassword";

export class CreateEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private companyRepository: CompanyRepository
  ) {}

  async execute(data: CreateEmployeeDTO): Promise {
    const company = await this.companyRepository.findById(data.companyId);
    
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    const existingEmployee = await this.employeeRepository.findByEmail(data.email);
    
    if (existingEmployee) {
      throw new AppError('Employee with this email already exists', 409);
    }

    const hashedPassword = await hashPassword(data.password);

    return this.employeeRepository.create({...data, password: hashedPassword});
  }
}
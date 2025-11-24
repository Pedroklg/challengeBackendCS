import { AppError } from '../../../shared/AppError';
import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { EmployeeResponse } from '../types';

export class GetEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(id: string): Promise<EmployeeResponse> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new AppError('Employee not found', 404);
    }

    return employee;
  }
}

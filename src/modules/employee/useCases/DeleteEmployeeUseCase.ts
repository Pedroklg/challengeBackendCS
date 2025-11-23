import { AppError } from '../../../shared/AppError';
import { EmployeeRepository } from '../repositories/EmployeeRepository';

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(id: string): Promise<void> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new AppError('Employee not found', 404);
    }

    const deleted = await this.employeeRepository.delete(id);

    if (!deleted) {
      throw new AppError('Failed to delete employee', 500);
    }
  }
}

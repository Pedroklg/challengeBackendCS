import { AppError } from '../../../shared/AppError';
import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { hashPassword } from '../../../shared/utils/hashPassword';
import { UpdateEmployeeRequest } from '../types';
import { EmployeeDBOutDTO, EmployeeDBUpdateDTO } from '../repositories/dto';

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(id: string, data: UpdateEmployeeRequest): Promise<EmployeeDBOutDTO> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new AppError('Employee not found', 404);
    }

    if (data.email && data.email !== employee.email) {
      const existingEmployee = await this.employeeRepository.findByEmail(data.email);
      if (existingEmployee) {
        throw new AppError('Employee with this email already exists', 409);
      }
    }

    const updateData: EmployeeDBUpdateDTO = { ...data };

    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }

    const updatedEmployee = await this.employeeRepository.update(id, updateData);

    if (!updatedEmployee) {
      throw new AppError('Failed to update employee', 500);
    }

    return updatedEmployee;
  }
}

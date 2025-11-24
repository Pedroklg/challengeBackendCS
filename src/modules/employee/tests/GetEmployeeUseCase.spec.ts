import { InMemoryEmployeeRepository } from '../repositories/InMemoryEmployeeRepository';
import { GetEmployeeUseCase } from '../useCases/GetEmployeeUseCase';
import { InMemoryCompanyRepository } from '../../company/repositories/InMemoryCompanyRepository';
import { AppError } from '../../../shared/AppError';
import { insertCompany, insertEmployee } from './utils';

describe('GetEmployeeUseCase', () => {
  it('should return an employee when found', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new GetEmployeeUseCase(employeeRepo);

    await insertCompany(companyRepo);
    const created = await insertEmployee(employeeRepo, companyRepo);

    const employee = await useCase.execute(created.id);

    expect(employee).toBeTruthy();
    expect(employee.id).toBe(created.id);
  });

  it('should throw when employee not found', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const useCase = new GetEmployeeUseCase(employeeRepo);

    await expect(useCase.execute('non-existing')).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute('non-existing')).rejects.toThrow('Employee not found');
  });
});

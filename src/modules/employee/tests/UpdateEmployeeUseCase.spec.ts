import { InMemoryEmployeeRepository } from '../repositories/InMemoryEmployeeRepository';
import { UpdateEmployeeUseCase } from '../useCases/UpdateEmployeeUseCase';
import { InMemoryCompanyRepository } from '../../company/repositories/InMemoryCompanyRepository';
import { AppError } from '../../../shared/AppError';
import { insertCompany, insertEmployee } from './utils';

describe('UpdateEmployeeUseCase', () => {
  it('should update an employee successfully', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new UpdateEmployeeUseCase(employeeRepo);

    await insertCompany(companyRepo);
    const created = await insertEmployee(employeeRepo, companyRepo);

    const updated = await useCase.execute(created.id, { name: 'New Name' });

    expect(updated).toBeTruthy();
    expect(updated.name).toBe('New Name');
  });

  it('should throw when employee not found', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const useCase = new UpdateEmployeeUseCase(employeeRepo);

    await expect(useCase.execute('non-existing', { name: 'x' })).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute('non-existing', { name: 'x' })).rejects.toThrow(
      'Employee not found'
    );
  });

  it('should throw on email conflict', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new UpdateEmployeeUseCase(employeeRepo);

    await insertCompany(companyRepo);
    const emplyee1 = await insertEmployee(employeeRepo, companyRepo);
    const emplyee2 = await insertEmployee(employeeRepo, companyRepo);

    await expect(useCase.execute(emplyee2.id, { email: emplyee1.email })).rejects.toBeInstanceOf(
      AppError
    );
    await expect(useCase.execute(emplyee2.id, { email: emplyee1.email })).rejects.toThrow(
      'Employee with this email already exists'
    );
  });
});

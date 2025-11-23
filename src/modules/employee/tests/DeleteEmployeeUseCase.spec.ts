import { InMemoryEmployeeRepository } from '../repositories/InMemoryEmployeeRepository';
import { DeleteEmployeeUseCase } from '../useCases/DeleteEmployeeUseCase';
import { InMemoryCompanyRepository } from '../../company/repositories/InMemoryCompanyRepository';
import { AppError } from '../../../shared/AppError';
import { insertCompany, insertEmployee } from './utils';

describe('DeleteEmployeeUseCase', () => {
  it('should delete an employee successfully', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new DeleteEmployeeUseCase(employeeRepo);

    await insertCompany(companyRepo);
    const created = await insertEmployee(employeeRepo, companyRepo);

    await expect(useCase.execute(created._id.toString())).resolves.toBeUndefined();
    const found = await employeeRepo.findById(created._id.toString());
    expect(found).toBeNull();
  });

  it('should throw when employee not found', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const useCase = new DeleteEmployeeUseCase(employeeRepo);

    await expect(useCase.execute('non-existing')).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute('non-existing')).rejects.toThrow('Employee not found');
  });
});

import { InMemoryCompanyRepository } from '../repositories/InMemoryCompanyRepository';
import { InMemoryEmployeeRepository } from '../../employee/repositories/InMemoryEmployeeRepository';
import { DeleteCompanyUseCase } from '../useCases/DeleteCompanyUseCase';
import { AppError } from '../../../shared/AppError';
import { insertCompany, makeFakeCompanyData } from './utils';
import { insertEmployee } from '../../employee/tests/utils';

describe('DeleteCompanyUseCase', () => {
  it('should delete a company successfully when no employees', async () => {
    const companyRepo = new InMemoryCompanyRepository();
    const employeeRepo = new InMemoryEmployeeRepository();
    const useCase = new DeleteCompanyUseCase(companyRepo, employeeRepo);

    const company = await companyRepo.create(makeFakeCompanyData());

    await expect(useCase.execute(company._id.toString())).resolves.toBeUndefined();
    const found = await companyRepo.findById(company._id.toString());
    expect(found).toBeNull();
  });

  it('should throw when company not found', async () => {
    const companyRepo = new InMemoryCompanyRepository();
    const employeeRepo = new InMemoryEmployeeRepository();
    const useCase = new DeleteCompanyUseCase(companyRepo, employeeRepo);

    await expect(useCase.execute('nonexisting')).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute('nonexisting')).rejects.toThrow('Company not found');
  });

  it('should not delete company with employees', async () => {
    const companyRepo = new InMemoryCompanyRepository();
    const employeeRepo = new InMemoryEmployeeRepository();
    const useCase = new DeleteCompanyUseCase(companyRepo, employeeRepo);

    const company = await insertCompany(companyRepo);
    await insertEmployee(employeeRepo, companyRepo, {
      companyId: company._id.toString(),
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Dev',
      password: 'Password123!',
    });

    await expect(useCase.execute(company._id.toString())).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute(company._id.toString())).rejects.toThrow(
      'Cannot delete company with active employees'
    );
  });
});

import { InMemoryEmployeeRepository } from '../repositories/InMemoryEmployeeRepository';
import { InMemoryCompanyRepository } from '../../company/repositories/InMemoryCompanyRepository';
import { ListEmployeesByCompanyUseCase } from '../useCases/ListEmployeesByCompanyUseCase';
import { insertCompany, insertEmployee } from './utils';

describe('ListEmployeesByCompanyUseCase', () => {
  it('should list employees by company', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new ListEmployeesByCompanyUseCase(employeeRepo, companyRepo);

    const company = await insertCompany(companyRepo);
    await insertEmployee(employeeRepo, companyRepo, { companyId: company._id.toString() });
    await insertEmployee(employeeRepo, companyRepo, { companyId: company._id.toString() });

    const employees = await useCase.execute(company._id.toString());

    expect(employees.length).toBe(2);
  });

  it('should throw when company not found', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new ListEmployeesByCompanyUseCase(employeeRepo, companyRepo);

    await expect(useCase.execute('non-existing')).rejects.toThrow('Company not found');
  });
});

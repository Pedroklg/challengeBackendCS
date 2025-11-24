import { InMemoryCompanyRepository } from '../repositories/InMemoryCompanyRepository';
import { InMemoryEmployeeRepository } from '../../employee/repositories/InMemoryEmployeeRepository';
import { CreateCompanyUseCase } from '../useCases/CreateCompanyUseCase';
import { AppError } from '../../../shared/AppError';
import { makeFakeCompanyData } from './utils';
import { ActivityStatus } from '../../../shared/types';

describe('CreateCompanyUseCase', () => {
  it('should create a company successfully', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new CreateCompanyUseCase(repo);

    const dto = makeFakeCompanyData();
    const created = await useCase.execute(dto);

    expect(created).toHaveProperty('id');
    expect(created.name).toBe(dto.name);
    expect(created.cnpj).toBe(dto.cnpj);
  });

  it('should throw when company with same CNPJ exists', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new CreateCompanyUseCase(repo);
    const dto = makeFakeCompanyData();

    await repo.create(dto);

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute(dto)).rejects.toThrow('Company with this CNPJ already exists');
  });

  it('should create a first employee when firstEmployee is provided', async () => {
    const companyRepo = new InMemoryCompanyRepository();
    const employeeRepo = new InMemoryEmployeeRepository();
    const useCase = new CreateCompanyUseCase(companyRepo, employeeRepo);

    const fakeCompany = makeFakeCompanyData({
      firstEmployee: {
        name: 'John Doe',
        email: `john.doe.${Date.now()}@example.com`,
        position: 'Engineer',
        password: 'Password123!',
        status: ActivityStatus.ACTIVE,
      },
    });

    const createdCompany = await useCase.execute(fakeCompany);

    expect(createdCompany).toHaveProperty('id');

    const employees = await employeeRepo.findByCompanyId(createdCompany.id);

    expect(employees.length).toBe(1);
    expect(employees[0].email).toBe(fakeCompany.firstEmployee?.email);
  });
});

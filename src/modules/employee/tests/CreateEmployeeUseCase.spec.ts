import { InMemoryEmployeeRepository } from '../repositories/InMemoryEmployeeRepository';
import { InMemoryCompanyRepository } from '../../company/repositories/InMemoryCompanyRepository';
import { CreateEmployeeUseCase } from '../useCases/CreateEmployeeUseCase';
import { AppError } from '../../../shared/AppError';
import { EmployeeDBCreateDTO } from '../repositories/dto';
import { insertCompany } from '../../company/tests/utils';
import { makeFakeEmployeeData } from './utils';

describe('CreateEmployeeUseCase', () => {
  it('should create an employee successfully when company exists', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new CreateEmployeeUseCase(employeeRepo, companyRepo);

    const company = await insertCompany(companyRepo);
    const dto = makeFakeEmployeeData(company._id.toString());
    const created = await useCase.execute(dto);

    expect(created).toHaveProperty('_id');
    expect(created.email).toBe(dto.email);
    expect(created.password).not.toBe(dto.password);
  });

  it('should throw when company is not found', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new CreateEmployeeUseCase(employeeRepo, companyRepo);

    const dto = makeFakeEmployeeData('nonexistent');

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute(dto)).rejects.toThrow('Company not found');
  });

  it('should throw when email already exists', async () => {
    const employeeRepo = new InMemoryEmployeeRepository();
    const companyRepo = new InMemoryCompanyRepository();
    const useCase = new CreateEmployeeUseCase(employeeRepo, companyRepo);

    const company = await insertCompany(companyRepo);
    const dto = makeFakeEmployeeData(company._id.toString());

    const existing: EmployeeDBCreateDTO = { ...dto, password: 'otherPassword' };
    await employeeRepo.create(existing);

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute(dto)).rejects.toThrow('Employee with this email already exists');
  });
});

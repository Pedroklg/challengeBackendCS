import { InMemoryCompanyRepository } from '../repositories/InMemoryCompanyRepository';
import { CreateCompanyUseCase } from '../useCases/CreateCompanyUseCase';
import { AppError } from '../../../shared/AppError';
import { makeFakeCompanyData } from './utils';

describe('CreateCompanyUseCase', () => {
  it('should create a company successfully', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new CreateCompanyUseCase(repo);

    const dto = makeFakeCompanyData();
    const created = await useCase.execute(dto);

    expect(created).toHaveProperty('_id');
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
});

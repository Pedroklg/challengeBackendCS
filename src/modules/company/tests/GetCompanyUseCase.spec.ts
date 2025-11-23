import { InMemoryCompanyRepository } from '../repositories/InMemoryCompanyRepository';
import { GetCompanyUseCase } from '../useCases/GetCompanyUseCase';
import { AppError } from '../../../shared/AppError';
import { makeFakeCompanyData } from './utils';

describe('GetCompanyUseCase', () => {
  it('should return a company when found', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new GetCompanyUseCase(repo);

    const created = await repo.create(makeFakeCompanyData());

    const company = await useCase.execute(created._id.toString());

    expect(company).toBeTruthy();
    expect(company._id).toBe(created._id);
  });

  it('should throw when company is not found', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new GetCompanyUseCase(repo);

    await expect(useCase.execute('nonexisting')).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute('nonexisting')).rejects.toThrow('Company not found');
  });
});

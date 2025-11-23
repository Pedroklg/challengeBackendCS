import { InMemoryCompanyRepository } from '../repositories/InMemoryCompanyRepository';
import { ListCompaniesUseCase } from '../useCases/ListCompaniesUseCase';
import { makeFakeCompanyData } from './utils';

describe('ListCompaniesUseCase', () => {
  it('should list all companies', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new ListCompaniesUseCase(repo);

    await repo.create(makeFakeCompanyData());
    await repo.create(makeFakeCompanyData());

    const companies = await useCase.execute();

    expect(companies.length).toBe(2);
  });
});

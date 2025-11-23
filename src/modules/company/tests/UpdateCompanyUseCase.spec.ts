import { InMemoryCompanyRepository } from '../repositories/InMemoryCompanyRepository';
import { UpdateCompanyUseCase } from '../useCases/UpdateCompanyUseCase';
import { AppError } from '../../../shared/AppError';
import { makeFakeCompanyData } from './utils';

describe('UpdateCompanyUseCase', () => {
  it('should update a company successfully', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new UpdateCompanyUseCase(repo);
    const created = await repo.create(makeFakeCompanyData());

    const updated = await useCase.execute(created._id.toString(), { name: 'Updated Name' });

    expect(updated).toBeTruthy();
    expect(updated.name).toBe('Updated Name');
  });

  it('should throw when company not found', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new UpdateCompanyUseCase(repo);

    await expect(useCase.execute('nonexisting', { name: 'x' })).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute('nonexisting', { name: 'x' })).rejects.toThrow(
      'Company not found'
    );
  });

  it('should throw when updating cnpj to one already in use', async () => {
    const repo = new InMemoryCompanyRepository();
    const useCase = new UpdateCompanyUseCase(repo);
    const c1 = await repo.create(makeFakeCompanyData());
    const c2 = await repo.create(makeFakeCompanyData());

    await expect(useCase.execute(c2._id.toString(), { cnpj: c1.cnpj })).rejects.toBeInstanceOf(
      AppError
    );
    await expect(useCase.execute(c2._id.toString(), { cnpj: c1.cnpj })).rejects.toThrow(
      'Company with this CNPJ already exists'
    );
  });
});

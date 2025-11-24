import { CompanyRepository } from './CompanyRepository';
import { CompanyDBCreateDTO, CompanyDBUpdateDTO, CompanyDBOutDTO } from './dto';
import { faker } from '@faker-js/faker';
import { normalizeCNPJ } from '../../../shared/utils/normalizeCNPJ';

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: CompanyDBOutDTO[] = [];

  async create(company: CompanyDBCreateDTO): Promise<CompanyDBOutDTO> {
    const now = new Date();

    const created = {
      id: faker.string.uuid(),
      ...company,
      phone: company.phone ?? undefined,
      cnpj: normalizeCNPJ(company.cnpj),
      createdAt: now,
      updatedAt: now,
    };

    this.companies.push(created);

    return created;
  }

  async findById(id: string): Promise<CompanyDBOutDTO | null> {
    const company = this.companies.find((company) => company.id === id);

    return company ?? null;
  }

  async findByCnpj(cnpj: string): Promise<CompanyDBOutDTO | null> {
    const normalized = normalizeCNPJ(cnpj);
    const company = this.companies.find((company) => company.cnpj === normalized);

    return company ?? null;
  }

  async findAll(): Promise<CompanyDBOutDTO[]> {
    return [...this.companies];
  }

  async update(id: string, data: CompanyDBUpdateDTO): Promise<CompanyDBOutDTO | null> {
    const index = this.companies.findIndex((company) => company.id === id);

    if (index === -1) return null;

    if (data.cnpj) {
      data.cnpj = normalizeCNPJ(data.cnpj);
    }

    const updated = {
      ...this.companies[index],
      ...data,
      updatedAt: new Date(),
    };

    this.companies[index] = updated;

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.companies.findIndex((company) => company.id === id);

    if (index === -1) return false;

    this.companies.splice(index, 1);

    return true;
  }
}

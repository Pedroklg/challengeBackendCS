import { CompanyRepository } from './CompanyRepository';
import { CompanyDBCreateDTO, CompanyDBUpdateDTO, CompanyDBOutDTO } from './dto';
import { faker } from '@faker-js/faker';

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: CompanyDBOutDTO[] = [];

  async create(company: CompanyDBCreateDTO): Promise<CompanyDBOutDTO> {
    const now = new Date();

    const created = {
      ...company,
      _id: faker.string.uuid(),
      createdAt: now,
      updatedAt: now,
    } as unknown as CompanyDBOutDTO;

    this.companies.push(created);

    return created;
  }

  async findById(id: string): Promise<CompanyDBOutDTO | null> {
    const company = this.companies.find((company) => company._id.toString() === id);

    return company ? (company as CompanyDBOutDTO) : null;
  }

  async findByCnpj(cnpj: string): Promise<CompanyDBOutDTO | null> {
    const company = this.companies.find((company) => company.cnpj === cnpj);

    return company ? (company as CompanyDBOutDTO) : null;
  }

  async findAll(): Promise<CompanyDBOutDTO[]> {
    return [...this.companies];
  }

  async update(id: string, data: CompanyDBUpdateDTO): Promise<CompanyDBOutDTO | null> {
    const index = this.companies.findIndex((company) => company._id.toString() === id);

    if (index === -1) return null;

    const updated = {
      ...this.companies[index],
      ...data,
      updatedAt: new Date(),
    } as unknown as CompanyDBOutDTO;

    this.companies[index] = updated;

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.companies.findIndex((company) => company._id.toString() === id);

    if (index === -1) return false;

    this.companies.splice(index, 1);

    return true;
  }
}

import { CompanyModel } from '../../../db/models/CompanyModel';
import { CompanyRepository } from './CompanyRepository';
import { CompanyDBCreateDTO, CompanyDBUpdateDTO, CompanyDBOutDTO } from './dto';

export class MongoCompanyRepository implements CompanyRepository {
  async create(company: CompanyDBCreateDTO): Promise<CompanyDBOutDTO> {
    const createdCompany = await CompanyModel.create(company);
    return createdCompany;
  }

  async findById(id: string): Promise<CompanyDBOutDTO | null> {
    const company = await CompanyModel.findById(id);
    return company ? company : null;
  }

  async findByCnpj(cnpj: string): Promise<CompanyDBOutDTO | null> {
    const company = await CompanyModel.findOne({ cnpj });
    return company ? company : null;
  }

  async findAll(): Promise<CompanyDBOutDTO[]> {
    const companies = await CompanyModel.find();
    return companies;
  }

  async update(id: string, data: CompanyDBUpdateDTO): Promise<CompanyDBOutDTO | null> {
    const company = await CompanyModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    return company ? company : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await CompanyModel.findByIdAndDelete(id);
    return !!result;
  }
}

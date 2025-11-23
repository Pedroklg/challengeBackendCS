import { CompanyDocument, CompanyModel } from 'db/models/CompanyModel';
import { CompanyRepository } from './CompanyRepository';

export class MongoCompanyRepository implements CompanyRepository {
  async create(company: CompanyDocument): Promise {
    const createdCompany = await CompanyModel.create(company);
    return createdCompany;
  }

  async findById(id: string): Promise {
    const company = await CompanyModel.findById(id);
    return company ? company : null;
  }

  async findByCnpj(cnpj: string): Promise {
    const company = await CompanyModel.findOne({ cnpj });
    return company ? company : null;
  }

  async findAll(): Promise {
    const companies = await CompanyModel.find();
    return companies;
  }

  async update(id: string, data: Partial): Promise {
    const company = await CompanyModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    return company ? company : null;
  }

  async delete(id: string): Promise {
    const result = await CompanyModel.findByIdAndDelete(id);
    return !!result;
  }
}
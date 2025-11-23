import { CompanyModel } from '../../../db/models/CompanyModel';
import { CompanyRepository } from './CompanyRepository';
import { CompanyDBCreateDTO, CompanyDBUpdateDTO, CompanyDBOutDTO } from './dto';
import { normalizeCNPJ } from '../../../shared/utils/normalizeCNPJ';

export class MongoCompanyRepository implements CompanyRepository {
  async create(company: CompanyDBCreateDTO): Promise<CompanyDBOutDTO> {
    const normalizedCnpj = normalizeCNPJ(company.cnpj) ?? company.cnpj;
    const createdCompany = await CompanyModel.create({ ...company, cnpj: normalizedCnpj });

    return createdCompany;
  }

  async findById(id: string): Promise<CompanyDBOutDTO | null> {
    const company = await CompanyModel.findById(id);

    return company ? company : null;
  }

  async findByCnpj(cnpj: string): Promise<CompanyDBOutDTO | null> {
    const normalized = normalizeCNPJ(cnpj) ?? cnpj;
    const company = await CompanyModel.findOne({ cnpj: normalized });

    return company ? company : null;
  }

  async findAll(): Promise<CompanyDBOutDTO[]> {
    const companies = await CompanyModel.find();

    return companies;
  }

  async update(id: string, data: CompanyDBUpdateDTO): Promise<CompanyDBOutDTO | null> {
    const updatedData = { ...data };
    if (updatedData.cnpj) {
      updatedData.cnpj = normalizeCNPJ(updatedData.cnpj) ?? updatedData.cnpj;
    }

    const company = await CompanyModel.findByIdAndUpdate(
      id,
      { ...updatedData, updatedAt: new Date() },
      { new: true }
    );

    return company ? company : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await CompanyModel.findByIdAndDelete(id);
    return !!result;
  }
}

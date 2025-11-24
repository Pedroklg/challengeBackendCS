import { CompanyModel } from '../../../db/models/CompanyModel';
import { CompanyRepository } from './CompanyRepository';
import { CompanyDBCreateDTO, CompanyDBUpdateDTO, CompanyDBOutDTO } from './dto';
import { normalizeCNPJ } from '../../../shared/utils/normalizeCNPJ';
import { CompanyDocument } from '../../../db/models/CompanyModel';

export class MongoCompanyRepository implements CompanyRepository {
  private format = (doc: CompanyDocument): CompanyDBOutDTO => {
    return {
      id: doc._id.toString(),
      name: doc.name,
      sector: doc.sector,
      cnpj: doc.cnpj,
      address: doc.address,
      phone: doc.phone ?? undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  };

  async create(company: CompanyDBCreateDTO): Promise<CompanyDBOutDTO> {
    const normalizedCnpj = normalizeCNPJ(company.cnpj);
    const createdCompany = await CompanyModel.create({ ...company, cnpj: normalizedCnpj });

    return this.format(createdCompany);
  }

  async findById(id: string): Promise<CompanyDBOutDTO | null> {
    const company = await CompanyModel.findById(id);

    return company ? this.format(company) : null;
  }

  async findByCnpj(cnpj: string): Promise<CompanyDBOutDTO | null> {
    const normalized = normalizeCNPJ(cnpj);
    const company = await CompanyModel.findOne({ cnpj: normalized });

    return company ? this.format(company) : null;
  }

  async findAll(): Promise<CompanyDBOutDTO[]> {
    const companies = await CompanyModel.find();

    return companies.map((company) => this.format(company));
  }

  async update(id: string, data: CompanyDBUpdateDTO): Promise<CompanyDBOutDTO | null> {
    const updatedData = { ...data };
    if (updatedData.cnpj) {
      updatedData.cnpj = normalizeCNPJ(updatedData.cnpj);
    }

    const company = await CompanyModel.findByIdAndUpdate(
      id,
      { ...updatedData, updatedAt: new Date() },
      { new: true }
    );

    return company ? this.format(company) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await CompanyModel.findByIdAndDelete(id);
    return !!result;
  }
}

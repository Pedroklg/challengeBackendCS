import { Request, Response } from 'express';
import { CreateCompanyUseCase } from './useCases/CreateCompanyUseCase';
import { GetCompanyUseCase } from './useCases/GetCompanyUseCase';
import { UpdateCompanyUseCase } from './useCases/UpdateCompanyUseCase';
import { DeleteCompanyUseCase } from './useCases/DeleteCompanyUseCase';
import { ListCompaniesUseCase } from './useCases/ListCompaniesUseCase';
import { MongoCompanyRepository } from './repositories/MongoCompanyRepository';
import { MongoEmployeeRepository } from '../employee/repositories/MongoEmployeeRepository';
import { CreateCompanyDTO, UpdateCompanyDTO, CompanyResponseDTO } from './types';
import { IdParams } from '../../shared/types';

export class CompanyController {
  async create(
    req: Request<Record<string, never>, CompanyResponseDTO, CreateCompanyDTO>,
    res: Response
  ): Promise<Response> {
    const repository = new MongoCompanyRepository();
    const useCase = new CreateCompanyUseCase(repository);

    const company = await useCase.execute(req.body);
    const companyResponse: CompanyResponseDTO = {
      ...company,
      id: company._id.toString(),
      phone: company.phone ?? undefined,
    };

    return res.status(201).json(companyResponse);
  }

  async getById(req: Request<IdParams, CompanyResponseDTO>, res: Response): Promise<Response> {
    const repository = new MongoCompanyRepository();
    const useCase = new GetCompanyUseCase(repository);

    const company = await useCase.execute(req.params.id);
    const companyResponse: CompanyResponseDTO = {
      ...company,
      id: company._id.toString(),
      phone: company.phone ?? undefined,
    };

    return res.status(200).json(companyResponse);
  }

  async list(
    req: Request<Record<string, never>, CompanyResponseDTO[]>,
    res: Response
  ): Promise<Response> {
    const repository = new MongoCompanyRepository();
    const useCase = new ListCompaniesUseCase(repository);

    const companies = await useCase.execute();
    const companyResponses: CompanyResponseDTO[] = companies.map((company) => ({
      ...company,
      id: company._id.toString(),
      phone: company.phone ?? undefined,
    }));

    return res.status(200).json(companyResponses);
  }

  async update(
    req: Request<IdParams, CompanyResponseDTO, UpdateCompanyDTO>,
    res: Response
  ): Promise<Response> {
    const repository = new MongoCompanyRepository();
    const useCase = new UpdateCompanyUseCase(repository);

    const company = await useCase.execute(req.params.id, req.body);
    const companyResponse: CompanyResponseDTO = {
      ...company,
      id: company._id.toString(),
      phone: company.phone ?? undefined,
    };

    return res.status(200).json(companyResponse);
  }

  async delete(req: Request<IdParams>, res: Response): Promise<Response> {
    const companyRepository = new MongoCompanyRepository();
    const employeeRepository = new MongoEmployeeRepository();
    const useCase = new DeleteCompanyUseCase(companyRepository, employeeRepository);

    await useCase.execute(req.params.id);

    return res.status(204).send();
  }
}
